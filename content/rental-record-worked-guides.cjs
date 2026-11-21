// Original educational examples for two existing pages; no client outcomes are represented.
const updated='2026-11-21';
const style='<style>.worked-ledger .table-scroll{max-width:100%;overflow-x:auto}.worked-ledger td{white-space:nowrap;overflow-wrap:normal}.worked-ledger th{overflow-wrap:normal}.worked-ledger caption{text-align:left;font-weight:600;margin-bottom:12px}.worked-ledger .table-scroll:focus-visible{outline:3px solid #c88622;outline-offset:3px}</style>';
module.exports={
 '/property-files/deep-dive/rental-portfolio-shared-expenses/property-level-posting-match/':{
  updated,
  description:'Reconcile a shared landscaping invoice to three rental property ledgers, separate personal costs and trace a later vendor credit without duplicate expenses.',
  sources:[['Publication 527: residential rental property','https://www.irs.gov/publications/p527'],['Business recordkeeping','https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping']],
  article:`${style}<article class="worked-ledger"><h2>One invoice, four locations, one control total</h2>
  <p>The check is whether the allocation approved in the working file actually reached the property books. A correct spreadsheet does not repair duplicate ledger entries by itself. Start with an invoice identifier and trace it through the allocation schedule, payment record and final property reports.</p>
  <p>In this fictional example, an owner pays a $1,200 landscaping invoice covering Rental A, Rental B, Rental C and a personal residence. The vendor's attached time log shows four, three, two and one hours respectively. Assume the same hourly charge applies at every location and the $1,200 is the entire bill. These invented facts support this exercise's allocation; they do not establish a universal tax allocation formula.</p>
  <div class="table-scroll" role="region" aria-label="Fictional invoice allocation" tabindex="0"><table><caption>Invoice LAND-014: ten documented hours, $1,200 total</caption><thead><tr><th scope="col">Location</th><th scope="col">Hours</th><th scope="col">Share</th><th scope="col">Allocated amount</th></tr></thead><tbody>
  <tr><th scope="row">Rental A</th><td>4</td><td>40%</td><td>$480</td></tr>
  <tr><th scope="row">Rental B</th><td>3</td><td>30%</td><td>$360</td></tr>
  <tr><th scope="row">Rental C</th><td>2</td><td>20%</td><td>$240</td></tr>
  <tr><th scope="row">Personal residence</th><td>1</td><td>10%</td><td>$120</td></tr>
  <tr><th scope="row">Control total</th><td>10</td><td>100%</td><td>$1,200</td></tr>
  </tbody></table></div>
  <p>The three rental allocations total $1,080; the personal portion is $120. Each row is the invoice total multiplied by its documented share. If work at one property uses different rates, materials or a separate scope, obtain the vendor breakdown rather than forcing the whole bill through an hours-only ratio.</p>
  <h2>Compare the allocation with what was posted</h2>
  <p>Suppose the owner accidentally entered the full $1,200 as an expense in each rental's report. The property reports now total $3,600 for one $1,200 invoice. The rental total is $2,520 above the supported $1,080 allocation. The issue is duplication and the personal portion, not an extra bill to pay.</p>
  <div class="table-scroll" role="region" aria-label="Fictional posting reconciliation" tabindex="0"><table><caption>Required difference between the mistaken rental reports and the allocation</caption><thead><tr><th scope="col">Property</th><th scope="col">Mistaken amount</th><th scope="col">Supported allocation</th><th scope="col">Difference</th></tr></thead><tbody>
  <tr><th scope="row">Rental A</th><td>$1,200</td><td>$480</td><td>−$720</td></tr>
  <tr><th scope="row">Rental B</th><td>$1,200</td><td>$360</td><td>−$840</td></tr>
  <tr><th scope="row">Rental C</th><td>$1,200</td><td>$240</td><td>−$960</td></tr>
  <tr><th scope="row">Rental total</th><td>$3,600</td><td>$1,080</td><td>−$2,520</td></tr>
  </tbody></table></div>
  <p>These differences are reconciliation targets, not complete journal-entry instructions. Give the bookkeeper the original transaction IDs, account names, property tags and allocation support. Ask for the appropriate correction in the actual accounting system. If accounts payable already recorded the invoice, recording its bank payment as another expense could duplicate it again. Retain the correction reference and re-run the property reports.</p>
  <h2>Trace a credit to the property it actually concerns</h2>
  <p>Assume the vendor later refunds $100 for work not completed at Rental B, supported by a credit memo naming that location. The revised B allocation is $260. A and C remain $480 and $240; the personal amount stays $120. Revised rental allocations total $980, and $980 plus $120 equals the net $1,100 bill after the credit. Do not distribute this property-specific credit using the original portfolio percentages merely because the original bill was shared.</p>
  <p>The bank trail is a $1,200 payment and a $100 refund. Match both to LAND-014 and its credit memo. The allocation schedule should show gross, credit and net values so a reviewer can see why the original invoice still says $1,200. If the vendor instead applies a credit to a future bill, preserve that application record and do not invent a cash refund.</p>
  <h2>Evidence needed before closing this check</h2>
  <ul><li>The complete invoice and vendor scope or time log identify all four locations.</li><li>The allocation schedule names the method, preparer, period and personal portion.</li><li>Corrected property reports match the approved allocation and retain transaction references.</li><li>The credit memo and bank or payable record reconcile the later adjustment.</li><li>The reviewer records any remaining classification or reporting question.</li></ul>
  <p><a href="https://www.irs.gov/publications/p527">IRS Publication 527</a> discusses rental expenses and separation of rental and personal use. It does not prescribe the fictional ten-hour landscaping split above. Correct arithmetic and matching books support a review; they do not alone establish deductibility, the proper tax year or the treatment of a particular expenditure.</p>
  <p>Use <a href="/property-files/deep-dive/rental-portfolio-shared-expenses/total-invoice-reconciliation/">total invoice reconciliation</a> to check the control amount and <a href="/property-files/deep-dive/rental-portfolio-shared-expenses/reimbursement-and-refund-trail/">the reimbursement and refund trail</a> for later changes. Return to the <a href="/property-files/deep-dive/rental-portfolio-shared-expenses/">shared-expense guide</a> if the allocation method itself is still unresolved.</p></article>`
 },
 '/property-files/deep-dive/rental-insurance-claim-restoration/':{
  updated,
  description:'Build a rental property damage file that separates insurer receipts, contractor invoices, outstanding cash needs and casualty or basis questions for professional review.',
  sources:[['Publication 547: casualties, disasters and thefts','https://www.irs.gov/publications/p547'],['Publication 527: residential rental property','https://www.irs.gov/publications/p527'],['Tangible property final regulations','https://www.irs.gov/businesses/small-businesses-self-employed/tangible-property-final-regulations']],
  article:`${style}<article class="worked-ledger"><h2>Keep the claim ledger separate from the restoration ledger</h2>
  <p>A storm-damage file can contain an insurer's estimate, several payments, contractor bills and unrelated improvements. Those documents describe different events. Organize them before trying to infer a tax result from the amount left in the bank.</p>
  <p>Consider a fictional duplex with $50,000 of contractor invoices: $8,000 for emergency mitigation, $32,000 for roof restoration and $10,000 for an elective upgrade outside the storm scope. The labels describe the assumed work, not its final tax classification. The insurer pays an $18,000 advance and later a $12,000 final payment. No lost-rent payment, lender holdback or additional recovery is assumed in this example.</p>
  <div class="table-scroll" role="region" aria-label="Fictional restoration cash timeline" tabindex="0"><table><caption>Illustrative cash paid and received, not a tax-loss calculation</caption><thead><tr><th scope="col">Event</th><th scope="col">Insurer cash received</th><th scope="col">Contractor cash paid</th></tr></thead><tbody>
  <tr><th scope="row">Emergency work paid</th><td>$0</td><td>$8,000</td></tr>
  <tr><th scope="row">Claim advance received</th><td>$18,000</td><td>$0</td></tr>
  <tr><th scope="row">Progress payment made</th><td>$0</td><td>$16,000</td></tr>
  <tr><th scope="row">Final insurer payment received</th><td>$12,000</td><td>$0</td></tr>
  <tr><th scope="row">Contractor balance paid</th><td>$0</td><td>$26,000</td></tr>
  <tr><th scope="row">Completed cash totals</th><td>$30,000</td><td>$50,000</td></tr>
  </tbody></table></div>
  <h2>Reconcile the interim funding need</h2>
  <p>After the $16,000 progress payment but before the final insurer payment, the owner has paid $24,000 and received $18,000: $6,000 of net cash outflow. Another $26,000 is due to the contractor. If the remaining $12,000 insurance payment arrives as assumed, the additional net funding requirement is $14,000. Together, the interim $6,000 and later $14,000 produce $20,000 of total net cash outflow.</p>
  <p>The completed bridge is $50,000 paid minus $30,000 received equals $20,000. The $10,000 upgrade is already inside the $50,000, so adding it again would overstate the funding gap. An insurer's estimate or promised payment is not a bank receipt. If the final payment remains disputed or is released only after a condition is met, label it as expected and update the funding scenario instead of marking it collected.</p>
  <h2>Do not label the $20,000 a casualty deduction</h2>
  <p>Cash outflow is not the same calculation as a casualty loss, gain or adjusted basis. <a href="https://www.irs.gov/publications/p547">IRS Publication 547</a> explains casualty calculations and the effect of insurance reimbursements. This example supplies no pre-event adjusted basis or complete tax facts and computes neither a deductible loss nor a taxable gain. A policy deductible shown on a claim statement is also not automatically a separate bank payment to subtract again.</p>
  <p><a href="https://www.irs.gov/publications/p527">IRS Publication 527</a> and the <a href="https://www.irs.gov/businesses/small-businesses-self-employed/tangible-property-final-regulations">tangible property regulations overview</a> address rental expenses and improvement questions. The fact that a contractor calls something a repair, or that insurance funded it, does not settle its treatment. Give the preparer the actual damaged components, restoration scope, elective changes and prior asset records for review.</p>
  <h2>Build three connected records</h2>
  <ol><li><strong>Event and asset file:</strong> dated photographs, incident description, property identifier, pre-event asset schedules and the items retained or removed. Identify which duplex unit and building component each document concerns.</li><li><strong>Claim and receipts file:</strong> the policy, claim determination, adjustments, payment dates and bank evidence. Separate an advance, final settlement, disputed amount and any category such as lost rents instead of merging them into one unexplained deposit.</li><li><strong>Work and payments file:</strong> contracts, itemized invoices, change orders, proof of payment and completion records. Keep mitigation, restoration, demolition and elective upgrades distinguishable even if one contractor bills them together.</li></ol>
  <p>Link these files using claim and invoice references rather than sensitive account identifiers. Reconcile invoice totals to amounts paid and still payable. If a lender holds insurance funds, distinguish the insurer's payment from cash actually released for use and retain the escrow statements; that complication is outside the fictional cash table.</p>
  <h2>Ask for the tax and basis handoff explicitly</h2>
  <p>Provide the chronology and reconciliations to the qualified reviewer, including year-end unpaid bills, uncertain reimbursements, removed assets and the existing depreciation schedule. Ask which facts control reporting, what further evidence is needed and what changes belong in the post-restoration asset records. Retain the written conclusion and implementation reference. Do not close the file solely because the contractor finished or the insurance claim portal says settled.</p>
  <p>The nine checks below separate those questions into smaller evidence tasks. Start with the missing record in your own file; completing the checklist is not proof of eligibility or savings.</p></article>`
 }
};
