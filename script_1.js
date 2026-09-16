
/* ================= UPSLDC REVISION ENGINE =================
   Revisions are data, not formula overrides.
   Each revision contains a block-wise schedule and an effective date/time.
   The latest revision applicable to each block is selected automatically.
*/
state.revisions = state.revisions || [];
function loadRevisions(){
  try{ const x=localStorage.getItem('thdc-upslDC-revisions'); if(x) state.revisions=JSON.parse(x)||[]; }catch(e){state.revisions=[]}
}
function saveRevisions(){localStorage.setItem('thdc-dsm-v2:'+String(window.currentPlantContext||'Khurja Floating Solar').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+':revisions',JSON.stringify(state.revisions||[])); if(window.THDC_MANUAL_SAVE) THDC_MANUAL_SAVE();}
function revisionRank(id){
  const m=String(id||'R0').match(/^R(\d+)$/i); return m?Number(m[1]):0;
}
function revisionApplicable(date, blockIdx){
  const revs=(state.revisions||[]).filter(r=>r.active!==false && r.date<=date && r.blocks && r.blocks[String(blockIdx)]!=null);
  if(!revs.length) return null;
  revs.sort((a,b)=>{
    const da=String(a.date+' '+(a.time||'00:00'));
    const db=String(b.date+' '+(b.time||'00:00'));
    const dt=db.localeCompare(da);
    return dt || revisionRank(b.id)-revisionRank(a.id);
  });
  return revs[0];
}
function applicableSchedule(day, b){
  const rev=revisionApplicable(day.date,b.idx);
  return rev ? Number(rev.blocks[String(b.idx)]) : Number(b.s);
}
function revisionAwareBlock(day,b){
  const s=applicableSchedule(day,b);
  const x=computeBlock(s,b.a,b.f,b.r);
  return {...x,s,revision:revisionApplicable(day,b.idx)?.id||'R0'};
}
function openRevisionManager(){renderRevisionTable();document.getElementById('revisionModal').classList.add('show')}
function closeRevisionManager(){document.getElementById('revisionModal').classList.remove('show')}
function addRevisionRow(){
  const n=(state.revisions||[]).reduce((m,r)=>Math.max(m,revisionRank(r.id)),0)+1;
  const d=state.weeks[state.currentWeek]?.days?.[0]?.date||new Date().toISOString().slice(0,10);
  const blocks={}; for(let i=1;i<=96;i++) blocks[String(i)]=null;
  state.revisions.push({id:'R'+n,date:d,time:'00:00',issuedBy:'UPSLDC',reference:'',status:'Active',active:true,blocks});
  saveRevisions(); renderRevisionTable();
}
function renderRevisionTable(){
  const el=document.getElementById('revisionTableWrap'); if(!el)return;
  const rows=(state.revisions||[]).sort((a,b)=>revisionRank(a.id)-revisionRank(b.id)).map((r,i)=>`
    <tr>
      <td><b>${r.id}</b></td>
      <td>${formatDateDDMMYYYY(r.date)}</td>
      <td>${r.time||'00:00'}</td>
      <td>${r.issuedBy||'UPSLDC'}</td>
      <td>${r.reference||'—'}</td>
      <td><span class="rev-chip ${r.status==='Active'?'ok':'warn'}">${r.status||'Active'}</span></td>
      <td>${Object.values(r.blocks||{}).filter(v=>v!=null&&v!=='').length} / 96</td>
      <td><button class="rev-btn" onclick="editRevision(${i})">Edit</button> <button class="rev-btn" onclick="deleteRevision(${i})">Delete</button></td>
    </tr>`).join('');
  el.innerHTML=`<table class="rev-table"><thead><tr><th>Revision</th><th>Effective Date (DD-MM-YYYY)</th><th>Time</th><th>Issued By</th><th>UPSLDC Ref.</th><th>Status</th><th>Blocks</th><th>Action</th></tr></thead><tbody>${rows||'<tr><td colspan="8">No revisions loaded. Add R1 or import the UPSLDC revision file.</td></tr>'}</tbody></table>
  <div class="rev-note">For each 15-minute block, the app uses the <b>latest active revision applicable at that date/time</b>. R0 remains the base schedule where no revision exists.</div>`;
}
function editRevision(index){
  const r=state.revisions[index];
  const ref=prompt('Grid Authority Reference / revision number:',r.reference||'');
  if(ref!==null) r.reference=ref;
  const date=prompt('Effective date (DD-MM-YYYY):',formatDateDDMMYYYY(r.date)); if(date){const p=date.split('-'); if(p.length===3) r.date=`${p[2]}-${p[1]}-${p[0]}`;}
  const time=prompt('Effective time (HH:MM):',r.time||'00:00'); if(time)r.time=time;
  saveRevisions(); renderRevisionTable(); renderAll();
}
function deleteRevision(index){if(confirm('Delete '+state.revisions[index].id+'?')){state.revisions.splice(index,1);saveRevisions();renderRevisionTable();renderAll()}}
function clearRevisions(){if(confirm('Remove all stored grid/settlement revisions?')){state.revisions=[];saveRevisions();renderRevisionTable();renderAll()}}
function importRevisionExcel(){document.getElementById('revisionFileInput').click()}
document.addEventListener('change',async e=>{
  if(e.target.id!=='revisionFileInput')return;
  const f=e.target.files?.[0]; if(!f)return;
  const data=await f.arrayBuffer();
  const wb=XLSX.read(data,{type:'array',cellDates:true});
  const ws=wb.Sheets[wb.SheetNames[0]];
  const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:null});
  const header=(rows[0]||[]).map(x=>String(x||'').trim().toLowerCase());
  const find=(...names)=>{for(const n of names){const i=header.findIndex(h=>h===n||h.includes(n));if(i>=0)return i}return -1};
  const di=find('date'), ti=find('time','effective time'), ri=find('revision','rev'), bi=find('block'), si=find('schedule','sch'), refi=find('reference','ref','revision no');
  if(di<0||bi<0||si<0){alert('Revision file needs at least Date, Block and Schedule columns.');return}
  const map={};
  rows.slice(1).forEach(row=>{
    const date=excelDateToISO(row[di]); const block=Number(row[bi]); const sch=Number(row[si]);
    if(!date||!block||block<1||block>96||!Number.isFinite(sch))return;
    const id=ri>=0&&row[ri]?String(row[ri]).trim().toUpperCase():'R1';
    if(!map[id]) map[id]={id,date,time:ti>=0&&row[ti]?String(row[ti]):'00:00',issuedBy:'UPSLDC',reference:refi>=0&&row[refi]?String(row[refi]):'',status:'Active',active:true,blocks:{}};
    map[id].blocks[String(block)]=sch;
  });
  Object.values(map).forEach(nr=>{
    const ix=state.revisions.findIndex(r=>r.id===nr.id);
    if(ix>=0)state.revisions[ix]={...state.revisions[ix],...nr,blocks:{...state.revisions[ix].blocks,...nr.blocks}};
    else state.revisions.push(nr);
  });
  saveRevisions(); renderRevisionTable(); renderAll();
  alert(Object.keys(map).length+' UPSLDC revision(s) imported.');
  e.target.value='';
});
function exportRevisionRegister(){
  const rows=[['REVISION','EFFECTIVE DATE','TIME','ISSUED BY','UPSLDC REFERENCE','STATUS','BLOCK','REVISED SCHEDULE (MWh)']];
  (state.revisions||[]).forEach(r=>{for(let i=1;i<=96;i++)rows.push([r.id,r.date,r.time||'',r.issuedBy||'UPSLDC',r.reference||'',r.status||'Active',i,r.blocks?.[String(i)]??''])});
  const ws=XLSX.utils.aoa_to_sheet(rows), wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Revision Register'); XLSX.writeFile(wb,'UPSLDC_Schedule_Revisions.xlsx');
}
loadRevisions();
