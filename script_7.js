
/* ===== THDC vs UPSLDC RECONCILIATION ===== */
window.thdcUpsldcData=window.thdcUpsldcData||null;
function loadUpsldcStatement(){document.getElementById('upsldcStatementInput').click()}
function clearUpsldcStatement(){window.thdcUpsldcData=null;renderTHDCUPSLDCReconciliation()}
function reconDate(v){
 if(!v)return '';
 if(typeof v==='number' && window.XLSX && XLSX.SSF){try{return XLSX.SSF.format('yyyy-mm-dd',v)}catch(e){}}
 const s=String(v).trim(),m=s.match(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/);
 return m?`${m[3]}-${m[2]}-${m[1]}`:s.slice(0,10);
}
function reconMoney(v){return '₹ '+Math.round(Number(v)||0).toLocaleString('en-IN')}
function renderTHDCUPSLDCReconciliation(){
 const el=document.getElementById('reconContent');if(!el)return;
 const w=weekObj(), bs=[];
 (w.days||[]).forEach(d=>(d.blocks||[]).forEach(b=>{
   const r=computeBlock(b.s,b.a,b.f,b.r);
   bs.push({date:d.date,block:Number(b.idx)||0,time:b.t||'',sch:Number(b.s)||0,act:Number(b.a)||0,dev:Number(r.dev)||0,charge:Number(r.charge)||0});
 }));
 if(!window.thdcUpsldcData){
  el.innerHTML=`<div class="recon-note"><b>THDC calculation is active.</b> Upload the UPSLDC DSM statement/Excel to populate the comparison. The UPSLDC figures will remain a separate calculation track and will not overwrite THDC values.</div>`;
  return;
 }
 const u=window.thdcUpsldcData;
 const totals=u.totals||{};
 const th={sch:bs.reduce((s,b)=>s+b.sch,0),act:bs.reduce((s,b)=>s+b.act,0),dev:bs.reduce((s,b)=>s+b.dev,0),charge:bs.reduce((s,b)=>s+b.charge,0)};
 const diff={sch:th.sch-(Number(totals.sch)||0),act:th.act-(Number(totals.act)||0),dev:th.dev-(Number(totals.dev)||0),charge:th.charge-(Number(totals.charge)||0)};
 const rows=u.rows||[];
 const map=new Map(rows.map(x=>[x.date+'|'+x.block,x]));
 let matched=0,schedDiff=0,devDiff=0,chargeDiff=0;
 const details=bs.map(b=>{
   const x=map.get(b.date+'|'+b.block);
   if(!x)return {...b,status:'Missing UPSLDC'};
   const sd=Math.abs(b.sch-(Number(x.sch)||0)), dd=Math.abs(b.dev-(Number(x.dev)||0)), cd=Math.abs(b.charge-(Number(x.charge)||0));
   if(sd<.001&&dd<.001&&cd<.5)matched++; else {if(sd>=.001)schedDiff++;if(dd>=.001)devDiff++;if(cd>=.5)chargeDiff++}
   return {...b,uSch:Number(x.sch)||0,uDev:Number(x.dev)||0,uCharge:Number(x.charge)||0,status:(sd<.001&&dd<.001&&cd<.5)?'Matched':'Difference'};
 });
 const variance=Math.abs(diff.charge);
 const status=variance<1?'MATCHED':variance<100?'MINOR VARIANCE':'VARIANCE';
 const cls=status==='MATCHED'?'good':'bad';
 const top=details.filter(x=>x.status==='Difference').sort((a,b)=>Math.abs(b.charge-(b.uCharge||0))-Math.abs(a.charge-(a.uCharge||0))).slice(0,20);
 el.innerHTML=`
 <div class="recon-kpis">
  <div class="recon-kpi"><span>THDC DSM</span><b>${reconMoney(th.charge)}</b></div>
  <div class="recon-kpi"><span>UPSLDC DSM</span><b>${reconMoney(totals.charge)}</b></div>
  <div class="recon-kpi ${cls}"><span>VARIANCE</span><b>${reconMoney(diff.charge)}</b></div>
  <div class="recon-kpi"><span>MATCHED BLOCKS</span><b>${matched}</b></div>
  <div class="recon-kpi ${variance>=100?'bad':'good'}"><span>STATUS</span><b>${status}</b></div>
 </div>
 <table class="recon-table"><thead><tr><th>Parameter</th><th>THDC</th><th>UPSLDC</th><th>Difference</th><th>Status</th></tr></thead>
 <tbody>
 <tr><td>Scheduled Energy (MWh)</td><td>${th.sch.toFixed(3)}</td><td>${Number(totals.sch||0).toFixed(3)}</td><td>${diff.sch.toFixed(3)}</td><td class="${Math.abs(diff.sch)<.001?'recon-match':'recon-diff'}">${Math.abs(diff.sch)<.001?'MATCHED':'DIFFERENCE'}</td></tr>
 <tr><td>Actual Energy (MWh)</td><td>${th.act.toFixed(3)}</td><td>${Number(totals.act||0).toFixed(3)}</td><td>${diff.act.toFixed(3)}</td><td class="${Math.abs(diff.act)<.001?'recon-match':'recon-diff'}">${Math.abs(diff.act)<.001?'MATCHED':'DIFFERENCE'}</td></tr>
 <tr><td>Deviation (MWh)</td><td>${th.dev.toFixed(3)}</td><td>${Number(totals.dev||0).toFixed(3)}</td><td>${diff.dev.toFixed(3)}</td><td class="${Math.abs(diff.dev)<.001?'recon-match':'recon-diff'}">${Math.abs(diff.dev)<.001?'MATCHED':'DIFFERENCE'}</td></tr>
 <tr><td>DSM Charge (₹)</td><td>${reconMoney(th.charge)}</td><td>${reconMoney(totals.charge)}</td><td>${reconMoney(diff.charge)}</td><td class="${variance<1?'recon-match':'recon-diff'}">${variance<1?'MATCHED':'DIFFERENCE'}</td></tr>
 </tbody></table>
 <div class="recon-note"><b>Variance diagnosis:</b> Schedule differences: ${schedDiff} blocks · Deviation differences: ${devDiff} blocks · DSM charge differences: ${chargeDiff} blocks · Missing UPSLDC blocks: ${bs.length-(matched+schedDiff+devDiff+chargeDiff)}. Use the block table below to identify exact exceptions.</div>
 <div style="overflow:auto;max-height:330px"><table class="recon-table"><thead><tr><th>Date</th><th>Block</th><th>THDC Sch</th><th>UPSLDC Sch</th><th>THDC Dev</th><th>UPSLDC Dev</th><th>THDC DSM</th><th>UPSLDC DSM</th><th>Status</th></tr></thead>
 <tbody>${top.map(x=>`<tr><td>${formatDateDDMMYYYY(x.date)}</td><td>#${x.block}</td><td>${x.sch.toFixed(3)}</td><td>${(x.uSch||0).toFixed(3)}</td><td>${x.dev.toFixed(3)}</td><td>${(x.uDev||0).toFixed(3)}</td><td>${reconMoney(x.charge)}</td><td>${reconMoney(x.uCharge)}</td><td class="recon-diff">${x.status}</td></tr>`).join('')||'<tr><td colspan="9">No block-level differences found.</td></tr>'}</tbody></table></div>`;
}
document.getElementById('upsldcStatementInput')?.addEventListener('change',async e=>{
 const f=e.target.files?.[0];if(!f)return;
 const buf=await f.arrayBuffer(),wb=XLSX.read(buf,{type:'array',cellDates:true}),ws=wb.Sheets[wb.SheetNames[0]];
 const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:null});
 const h=(rows[0]||[]).map(x=>String(x||'').trim().toLowerCase());
 const find=(...a)=>{for(const n of a){const i=h.findIndex(x=>x===n||x.includes(n));if(i>=0)return i}return -1};
 const di=find('date'),bi=find('block','blk'),si=find('schedule','sch'),ai=find('actual','act'),dvi=find('deviation','dev'),ci=find('dsm','charge','amount');
 if(di<0||bi<0){alert('UPSLDC file must contain Date and Block columns.');return}
 const parsed=[];rows.slice(1).forEach(r=>{
   const date=reconDate(r[di]),block=Number(r[bi]);if(!date||!block)return;
   parsed.push({date,block,sch:si>=0?Number(r[si])||0:0,act:ai>=0?Number(r[ai])||0:0,dev:dvi>=0?Number(r[dvi])||0:0,charge:ci>=0?Number(r[ci])||0:0});
 });
 window.thdcUpsldcData={rows:parsed,totals:{
   sch:parsed.reduce((s,x)=>s+x.sch,0),act:parsed.reduce((s,x)=>s+x.act,0),dev:parsed.reduce((s,x)=>s+x.dev,0),charge:parsed.reduce((s,x)=>s+x.charge,0)
 }};
 renderTHDCUPSLDCReconciliation();e.target.value='';
 alert('UPSLDC statement loaded: '+parsed.length+' block records.');
});
function exportReconciliation(){
 const el=document.getElementById('reconContent');if(!el){return}
 const tables=el.querySelectorAll('table');if(!tables.length){alert('Upload UPSLDC statement first.');return}
 const wb=XLSX.utils.book_new();
 tables.forEach((t,i)=>{
   const rows=[...t.rows].map(tr=>[...tr.cells].map(c=>c.innerText));
   XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(rows),i?'Block Reconciliation':'Summary');
 });
 XLSX.writeFile(wb,'THDC_vs_UPSLDC_Reconciliation.xlsx');
}
window.addEventListener('load',()=>setTimeout(renderTHDCUPSLDCReconciliation,1600));
