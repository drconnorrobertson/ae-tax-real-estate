'use strict';
const rentalOperatingCalculators={
 rent_steps(v){
  if(!Number.isInteger(v.years)||v.years<1||v.years>50)throw Error('Use a whole number of years from 1 to 50.');
  if(v.rate>100)throw Error('Use an annual increase from 0% to 100%.');
  let monthly=v.rent,total=0;for(let year=0;year<v.years;year++){total+=monthly*12;if(year<v.years-1)monthly*=1+v.rate/100;}
  return [['Monthly rent in final year',monthly,'money'],['Scheduled rent over all modeled years',total,'money'],['Increase compared with unchanged starting rent',total-v.rent*12*v.years,'money']];
 },
 leasing_fee(v){
  if(!Number.isInteger(v.months)||v.months<1||v.months>1200)throw Error('Use a whole number of lease months from 1 to 1200.');
  if(v.rate>100)throw Error('Use a percentage from 0% to 100%.');
  const rent=v.rent*v.months,variable=rent*v.rate/100,total=variable+v.flat;
  return [['Scheduled rent used as the fee base',rent,'money'],['Percentage-based fee',variable,'money'],['Total modeled fee including flat charge',total,'money'],['Fee spread over modeled lease months',total/v.months,'money']];
 },
 turnover_hours(v){
  if(!Number.isInteger(v.units)||v.units<0)throw Error('Use a whole number of units.');
  if(v.available<=0)throw Error('Enter positive combined person-hours available per week.');
  const hours=v.units*v.perUnit+v.travel;
  return [['Total person-hours required',hours,'number'],['Workload divided by weekly capacity',hours/v.available,'number'],['Minimum whole weeks at entered capacity',Math.ceil(hours/v.available),'number']];
 },
 project_allowance(v){
  if(v.rate>100)throw Error('Use a contingency percentage from 0% to 100%.');
  const subtotal=v.base+v.alternates+v.allowances,reserve=subtotal*v.rate/100;
  return [['Base, selected alternates and allowances',subtotal,'money'],['Contingency applied to that subtotal',reserve,'money'],['Combined planning amount',subtotal+reserve,'money']];
 },
 unpaid_bills(v){
  const available=v.opening+v.newBills;
  if(v.credits+v.paid>available)throw Error('Credits and payments exceed the unpaid bills included in this model. Reconcile the periods and records.');
  return [['Opening unpaid bills plus new bills',available,'money'],['Credits and payments applied',v.credits+v.paid,'money'],['Closing unpaid balance',available-v.credits-v.paid,'money']];
 },
 milestone_cash(v){
  const a=v.opening+v.receipt1-v.cost1,b=a+v.receipt2-v.cost2,c=b+v.receipt3-v.cost3,low=Math.min(v.opening,a,b,c);
  return [['Ending balance after period 1',a,'money'],['Ending balance after period 2',b,'money'],['Ending balance after period 3',c,'money'],['Lowest modeled opening or period-end balance',low,'money'],['Extra opening cash to keep those balances nonnegative',Math.max(0,-low),'money']];
 }
};
if(typeof module!=='undefined')module.exports=rentalOperatingCalculators;
if(typeof document!=='undefined')document.querySelectorAll('[data-operating-calculator]').forEach(form=>{
 const output=form.querySelector('[data-results]');
 const numbers=new Intl.NumberFormat('en-US',{maximumFractionDigits:2});
 const dollars=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
 function calculate(){
  output.replaceChildren();delete output.dataset.stale;if(!form.reportValidity())return;
  try{
   const values={};form.querySelectorAll('input[name]').forEach(input=>{const n=Number(input.value);if(!Number.isFinite(n)||n<0)throw Error('Use a finite nonnegative number in every field.');values[input.name]=n;});
   const rows=rentalOperatingCalculators[form.dataset.operatingCalculator](values);
   const list=document.createElement('dl');for(const [label,value,kind] of rows){if(!Number.isFinite(value))throw Error('This input combination is too large to calculate.');const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');dd.textContent=kind==='money'?dollars.format(value):numbers.format(value);list.append(dt,dd);}output.append(list);
  }catch(error){const message=document.createElement('p');message.textContent=error.message;output.append(message);}
 }
 form.addEventListener('input',()=>{if(output.dataset.stale==='true')return;output.dataset.stale='true';output.replaceChildren();const message=document.createElement('p');message.textContent='Inputs changed. Select Calculate scenario to update the results.';output.append(message);});
 form.addEventListener('submit',event=>{event.preventDefault();calculate();});form.querySelector('button[type=submit]').disabled=false;calculate();
});
