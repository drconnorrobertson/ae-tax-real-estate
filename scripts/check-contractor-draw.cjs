const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {cents, analyze} = require('../assets/contractor-draw-check.js');

assert.equal(cents('0'), 0);
assert.equal(cents('0.29'), 29);
assert.equal(cents(''), null);
assert.throws(() => cents('1,000'));
assert.throws(() => cents('1.001'));
assert.throws(() => cents('1e5'));
assert.equal(analyze(['12000', '', '45000'], ['', '', '']).state, 'incomplete');
assert.equal(analyze(['1', '2', '3'], ['-1', '', '']).state, 'invalid');
assert.equal(analyze(['10000000000.01', '2', '3'], ['', '', '']).state, 'invalid');
const worked = analyze(['12000', '28000', '45000'], ['12000', '15000', '18000']);
assert.deepEqual(worked.increments, [1200000, 1600000, 1700000]);
assert.deepEqual(worked.balances, [0, 100000, 0]);
assert.equal(worked.summedSnapshots, 8500000);
assert.equal(worked.billed, 4500000);
assert.equal(worked.paid, 4500000);
assert.equal(worked.difference, 0);
const unknown = analyze(['12000', '28000', '45000'], ['12000', '', '18000']);
assert.equal(unknown.paid, null);
assert.deepEqual(unknown.balances, [0, null, null]);
assert.equal(analyze(['0', '0', '0'], ['0', '0', '0']).difference, 0);
const correction = analyze(['100', '90', '120'], ['100', '0', '20']);
assert.equal(correction.reduction, true);
assert.deepEqual(correction.increments, [10000, -1000, 3000]);

// Exercise the real browser handlers: invalid/partial input clears prior output,
// and an export retains unknown payments rather than replacing them with zero.
const fields = () => Array.from({length: 3}, () => ({value: ''}));
const cumulative = fields(), payments = fields(), handlers = new Map();
const node = () => ({textContent: '', disabled: false, children: [], addEventListener(event, callback) {this[event] = callback;}, appendChild(child) {this.children.push(child);}, replaceChildren() {this.children = [];}});
const nodes = new Map(['status', 'result', 'rows', 'summary', 'export', 'example', 'clear'].map(key => [key, node()]));
const form = {
  querySelectorAll(selector) {return selector.includes('cumulative') ? cumulative : payments;},
  querySelector(selector) {return nodes.get(selector.match(/data-draw-([^\]]+)/)[1]);},
  addEventListener(event, callback) {handlers.set(event, callback);},
};
let blob, anchor;
const document = {
  querySelector() {return form;},
  createElement(tag) {const value = node(); if (tag === 'a') {value.click = () => {}; anchor = value;} return value;},
};
vm.runInNewContext(fs.readFileSync(require.resolve('../assets/contractor-draw-check.js'), 'utf8'), {
  module: {exports: {}}, document, Blob,
  URL: {createObjectURL(value) {blob = value; return 'blob:draw-test';}, revokeObjectURL() {}},
  setTimeout(callback) {callback();},
});
assert.equal(nodes.get('export').disabled, true);
nodes.get('example').click();
assert.equal(nodes.get('rows').children.length, 3);
assert.equal(nodes.get('export').disabled, false);
assert.match(nodes.get('summary').textContent, /\$85,000\.00/);
payments[1].value = '';
handlers.get('input')();
assert.match(nodes.get('summary').textContent, /Payment total and final difference are unknown/);
nodes.get('export').click();
assert.equal(anchor.download, 'contractor-draw-record.csv');
blob.text().then(text => {
  assert(!text.includes('\\n'));
  const lines = text.trimEnd().split('\n');
  assert.equal(lines.length, 4);
  assert.match(lines[2], /"2","28000\.00","16000\.00","",""/);
  cumulative[1].value = 'invalid';
  handlers.get('input')();
  assert.equal(nodes.get('result').hidden, true);
  assert.equal(nodes.get('rows').children.length, 0);
  assert.equal(nodes.get('summary').textContent, '');
  assert.equal(nodes.get('export').disabled, true);
  nodes.get('clear').click();
  assert.equal(cumulative.every(field => field.value === ''), true);
  assert.equal(payments.every(field => field.value === ''), true);
  assert.match(nodes.get('status').textContent, /Enter all three/);
  console.log('PASS: cumulative-draw arithmetic, cents, credits, unknown payments, invalid/partial clearing and real CSV export handlers.');
}).catch(error => {console.error(error); process.exitCode = 1;});
