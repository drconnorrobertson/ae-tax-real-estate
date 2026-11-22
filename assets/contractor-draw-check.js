(function () {
  'use strict';
  function cents(raw) {
    raw = String(raw).trim();
    if (raw === '') return null;
    if (!/^\d+(?:\.\d{0,2})?$/.test(raw)) throw new Error('Use nonnegative dollar amounts with at most two decimal places.');
    const parts = raw.split('.');
    const value = Number(parts[0]) * 100 + Number((parts[1] || '').padEnd(2, '0'));
    if (!Number.isSafeInteger(value) || value > 1000000000000) throw new Error('Amount is outside the supported range.');
    return value;
  }
  function analyze(cumulativeInputs, paymentInputs) {
    if (cumulativeInputs.length !== 3 || paymentInputs.length !== 3) throw new Error('Three draw records are required.');
    let cumulative, payments;
    try {
      cumulative = cumulativeInputs.map(cents);
      payments = paymentInputs.map(cents);
    } catch (error) {
      return {state: 'invalid', message: error.message};
    }
    if (cumulative.some(value => value === null)) return {state: 'incomplete'};
    const increments = cumulative.map((value, index) => value - (index ? cumulative[index - 1] : 0));
    const summedSnapshots = cumulative.reduce((sum, value) => sum + value, 0);
    const billed = cumulative[2];
    const paid = payments.some(value => value === null) ? null : payments.reduce((sum, value) => sum + value, 0);
    let runningPaid = 0, known = true;
    const balances = payments.map((value, index) => {
      if (value === null) known = false;
      else runningPaid += value;
      return known ? cumulative[index] - runningPaid : null;
    });
    return {state: 'ready', cumulative, payments, increments, summedSnapshots, billed, paid, balances, difference: paid === null ? null : billed - paid, reduction: increments.some(value => value < 0)};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {cents, analyze};
  if (typeof document === 'undefined') return;
  const form = document.querySelector('[data-draw-check]');
  if (!form) return;
  const cumulativeFields = Array.from(form.querySelectorAll('[data-draw-cumulative]'));
  const paymentFields = Array.from(form.querySelectorAll('[data-draw-payment]'));
  const status = form.querySelector('[data-draw-status]');
  const result = form.querySelector('[data-draw-result]');
  const body = form.querySelector('[data-draw-rows]');
  const summary = form.querySelector('[data-draw-summary]');
  const exportButton = form.querySelector('[data-draw-export]');
  const money = value => value === null ? 'Unknown' : new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value / 100);
  function update() {
    const model = analyze(cumulativeFields.map(field => field.value), paymentFields.map(field => field.value));
    body.replaceChildren();
    summary.textContent = '';
    result.hidden = model.state !== 'ready';
    exportButton.disabled = model.state !== 'ready';
    if (model.state !== 'ready') {
      status.textContent = model.state === 'invalid' ? model.message + ' Prior results have been cleared.' : 'Enter all three cumulative billed amounts. Blank payment fields remain unknown.';
      return model;
    }
    model.cumulative.forEach((value, index) => {
      const row = document.createElement('tr');
      ['Draw ' + (index + 1), money(value), money(model.increments[index]), money(model.payments[index]), money(model.balances[index])].forEach((text, column) => {
        const cell = document.createElement(column ? 'td' : 'th');
        if (!column) cell.scope = 'row';
        cell.textContent = text;
        row.appendChild(cell);
      });
      body.appendChild(row);
    });
    summary.textContent = 'Latest cumulative billed: ' + money(model.billed) + '. Sum of cumulative snapshots: ' + money(model.summedSnapshots) + '. Summing snapshots instead of the new amounts adds ' + money(model.summedSnapshots - model.billed) + ' in this sequence. ' + (model.paid === null ? 'Payment total and final difference are unknown until every payment field is supplied.' : 'Recorded payments: ' + money(model.paid) + '. Billed minus recorded payments: ' + money(model.difference) + '.');
    status.textContent = model.reduction ? 'A cumulative amount fell. Review the related credit or correction before interpreting the negative new amount.' : 'Arithmetic checked from your entries. This does not verify invoices, approval, completion or tax treatment.';
    return model;
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', update);
  form.querySelector('[data-draw-example]').addEventListener('click', () => {
    ['12000', '28000', '45000'].forEach((value, index) => {cumulativeFields[index].value = value;});
    ['12000', '15000', '18000'].forEach((value, index) => {paymentFields[index].value = value;});
    update();
  });
  form.querySelector('[data-draw-clear]').addEventListener('click', () => {
    [...cumulativeFields, ...paymentFields].forEach(field => {field.value = '';});
    update();
  });
  exportButton.addEventListener('click', () => {
    const model = update();
    if (model.state !== 'ready') return;
    const number = value => value === null ? '' : (value / 100).toFixed(2);
    const rows = [['Draw', 'Cumulative billed USD', 'New billed USD', 'Recorded payment USD', 'Billed minus payments to date USD'], ...model.cumulative.map((value, index) => [index + 1, number(value), number(model.increments[index]), number(model.payments[index]), number(model.balances[index])])];
    const csv = rows.map(row => row.map(value => '"' + String(value).replace(/"/g, '""') + '"').join(',')).join('\n') + '\n';
    const url = URL.createObjectURL(new Blob([csv], {type: 'text/csv;charset=utf-8'}));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'contractor-draw-record.csv';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  update();
})();
