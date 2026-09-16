
/* ===== COMPLETE DSM INSIGHTS ENGINE ===== */
function ciNum(v,d=2){return (Number(v)||0).toLocaleString('en-IN',{minimumFractionDigits:d,maximumFractionDigits:d})}
function ciRs(v){return '₹ '+Math.abs(Number(v)||0).toLocaleString('en-IN',{maximumFractionDigits:0})}
function ciDate(v){
  if(!v)return '';
  const s=String(v),m=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m?`${m[3]}-${m[2]}-${m[1]}`:s;
}
function ciAllBlocks(week){
  const out=[];
  (week?.days||[]).forEach(d=>(d.blocks||[]).forEach(b=>{
    let r;
    try{ r=computeBlock(b.s,b.a,b.f,b.r); }catch(e){ r={dev:(Number(b.a)||0)-(Number(b.s)||0),devPct:0,charge:0,devType:'Unknown'}; }
    out.push({date:d.date,block:Number(b.idx)||0,time:b.t||'',s:Number(b.s)||0,a:Number(b.a)||0,f:Number(b.f)||0,rate:Number(b.r)||0,
      dev:Number(r.dev)||0,devPct:Number(r.devPct)||0,charge:Number(r.charge)||0,type:r.devType||((Number(r.dev)||0)<0?'Under':'Over')});
  }));
  return out;
}
function ciWeek(){
  try{return weekObj()}catch(e){return {days:[]}}
}
function ciAggregate(blocks){
  const s=blocks.reduce((x,b)=>x+b.s,0), a=blocks.reduce((x,b)=>x+b.a,0);
  const d=a-s, charge=blocks.reduce((x,b)=>x+b.charge,0);
  const over=blocks.filter(b=>b.dev>0), under=blocks.filter(b=>b.dev<0);
  return {s,a,d,charge,over,under,avg:blocks.length?d/blocks.length:0};
}
function ciRisk(pct){
  const a=Math.abs(Number(pct)||0);
  return a<=2?['GREEN','pill-green']:a<=10?['AMBER','pill-amber']:['RED','pill-red'];
}
function ciRenderHeatmap(blocks){
  const days=[...new Set(blocks.map(b=>b.date))];
  let h='<div class="heatmap"><div></div>'+Array.from({length:24},(_,i)=>`<div class="heat-head">${String(i).padStart(2,'0')}</div>`).join('');
  days.forEach(day=>{
    h+=`<div class="heat-label">${ciDate(day)}</div>`;
    for(let hour=0;hour<24;hour++){
      const bs=blocks.filter(b=>b.date===day && Math.floor((b.block-1)/4)===hour);
      const max=bs.reduce((m,b)=>Math.max(m,Math.abs(b.devPct)),0);
      const cls=max>10?'background:#C1403A':max>2?'background:#E7A62A':max>0?'background:#2F72D0':'background:#DCE8F3';
      h+=`<div class="heat-cell" title="${ciDate(day)} ${String(hour).padStart(2,'0')}:00 | max deviation ${ciNum(max,2)}%" style="${cls}" onclick="ciOpenDate('${day}')"></div>`;
    }
  });
  return h+'</div><div class="ins-sub" style="margin-top:6px">🔵 within 2% &nbsp; 🟠 2–10% &nbsp; 🔴 beyond 10% · Click an hour to inspect the day.</div>';
}
function ciOpenDate(date){
  const week=ciWeek(), d=(week.days||[]).find(x=>x.date===date);
  if(!d)return;
  state.currentDayDate=date;
  if(typeof renderDayDetail==='function')renderDayDetail(d);
  else if(typeof renderAll==='function')renderAll();
}
function renderCompleteInsights(){
  const el=document.getElementById('insightContent'); if(!el)return;
  const week=ciWeek(), blocks=ciAllBlocks(week), a=ciAggregate(blocks);
  if(!blocks.length){el.innerHTML='<div class="ins-card"><div class="ins-empty">Import/load Week 1 data to generate insights.</div></div>';return;}

  const maxBlock=blocks.slice().sort((x,y)=>Math.abs(y.dev)-Math.abs(x.dev))[0];
  const maxPctBlock=blocks.slice().sort((x,y)=>Math.abs(y.devPct)-Math.abs(x.devPct))[0];
  const grossDebit=blocks.filter(b=>b.charge>0).reduce((x,b)=>x+b.charge,0);
  const grossCredit=blocks.filter(b=>b.charge<0).reduce((x,b)=>x+Math.abs(b.charge),0);
  const concentration=blocks.length?blocks.slice().sort((x,y)=>Math.abs(y.charge)-Math.abs(x.charge)).slice(0,10).reduce((x,b)=>x+Math.abs(b.charge),0)/(blocks.reduce((x,b)=>x+Math.abs(b.charge),0)||1)*100:0;
  const limitCross=blocks.filter(b=>Math.abs(b.devPct)>10).length;
  const maxPct=Math.max(...blocks.map(b=>Math.abs(b.devPct)));
  const [risk,riskCls]=ciRisk(maxPct);
  const days=(week.days||[]).map(d=>{
    const bs=blocks.filter(b=>b.date===d.date),g=ciAggregate(bs);
    return {...d,g,bs};
  }).sort((x,y)=>Math.abs(y.g.charge)-Math.abs(x.g.charge));
  const worstDay=days[0], bestDay=days[days.length-1];
  const revs=state.revisions||[];
  const latestRev=revs.slice().sort((x,y)=>String(y.date+' '+(y.time||'')).localeCompare(String(x.date+' '+(x.time||''))))[0];

  // Automated management narrative.
  const driver=worstDay?.g?.charge>0?'under-injection / debit exposure':'net credit from over-injection';
  const narrative=`<b>WEEKLY MANAGEMENT INSIGHT:</b> The week recorded <b>${a.d>=0?'+':''}${ciNum(a.d,3)} MWh</b> net deviation with <b>${blocks.filter(b=>b.dev>0).length}</b> over-injection and <b>${blocks.filter(b=>b.dev<0).length}</b> under-injection blocks. The largest financial driver was <b>${ciDate(worstDay?.date)}</b>, primarily due to <b>${driver}</b>. The highest absolute block deviation was <b>${ciDate(maxBlock.date)} · Block ${maxBlock.block}</b> at <b>${maxBlock.dev>=0?'+':''}${ciNum(maxBlock.dev,3)} MWh</b>.`;

  const top=blocks.slice().sort((x,y)=>Math.abs(y.charge)-Math.abs(x.charge)).slice(0,10);
  const topRows=top.map((b,i)=>`<tr><td>${i+1}</td><td>${ciDate(b.date)}</td><td>${b.block}</td><td>${b.time}</td><td class="mono">${b.dev>=0?'+':''}${ciNum(b.dev,3)}</td><td class="mono">${ciNum(b.devPct,2)}%</td><td class="mono">${ciRs(b.charge)}</td><td><span class="ins-pill ${b.dev<0?'pill-red':'pill-blue'}">${b.dev<0?'Under':'Over'}</span></td></tr>`).join('');

  const dayRows=days.map(d=>`<li><span><b>${ciDate(d.date)}</b><br><span class="ins-sub">${d.g.over.length} over · ${d.g.under.length} under</span></span><span class="mono">${d.g.charge>=0?ciRs(d.g.charge):'-'+ciRs(d.g.charge)}</span></li>`).join('');

  el.innerHTML=`
  <div class="insight-summary">${narrative}</div>
  <div class="insight-grid" style="margin-top:10px">
    <div class="ins-card"><div class="ins-title">DSM Cost Concentration</div><div class="ins-big red">${ciNum(concentration,1)}%</div><div class="ins-sub">Top 10 blocks' share of gross DSM impact</div><div class="ins-bar"><i style="width:${Math.min(100,concentration)}%"></i></div></div>
    <div class="ins-card"><div class="ins-title">Volume-Limit Exposure</div><div class="ins-big ${limitCross?'red':'green'}">${limitCross}</div><div class="ins-sub">Blocks beyond 10% deviation threshold</div><div class="ins-mini"><span>Maximum: ${ciNum(maxPct,2)}%</span><span class="ins-pill ${riskCls}">${risk}</span></div></div>
    <div class="ins-card"><div class="ins-title">Worst Block</div><div class="ins-big red">${maxBlock.dev>=0?'+':''}${ciNum(maxBlock.dev,3)} MWh</div><div class="ins-sub">${ciDate(maxBlock.date)} · Block ${maxBlock.block} · ${maxBlock.time}</div><div class="ins-mini"><span>DSM ${ciRs(maxBlock.charge)}</span><span>${ciNum(maxBlock.devPct,2)}%</span></div></div>
    <div class="ins-card"><div class="ins-title">Revision Status</div><div class="ins-big blue">${latestRev?latestRev.id:'R0'}</div><div class="ins-sub">${latestRev?'Latest stored UPSLDC revision':'No UPSLDC revision loaded'}</div><div class="ins-mini"><span>${latestRev?ciDate(latestRev.date):'Base schedule'}</span><span>${revs.length} revision(s)</span></div></div>

    <div class="ins-card wide"><div class="ins-title">Gross Debit vs Gross Credit</div>
      <div class="impact-row"><b>Debit / Payable</b><div class="impact-track"><i style="width:${Math.min(100,grossDebit/(Math.max(grossDebit,grossCredit)||1)*100)}%;background:#C1403A"></i></div><b>${ciRs(grossDebit)}</b></div>
      <div class="impact-row"><b>Credit / Receivable</b><div class="impact-track"><i style="width:${Math.min(100,grossCredit/(Math.max(grossDebit,grossCredit)||1)*100)}%;background:#0F8A5F"></i></div><b>${ciRs(grossCredit)}</b></div>
      <div class="ins-sub">Net impact: <b>${a.charge>=0?ciRs(a.charge):'-'+ciRs(a.charge)}</b></div>
    </div>
    <div class="ins-card wide"><div class="ins-title">Daily Financial Ranking</div><ul class="ins-list">${dayRows}</ul></div>

    <div class="ins-card full"><div class="ins-title">96-Block Deviation Heatmap</div>${ciRenderHeatmap(blocks)}</div>

    <div class="ins-card full"><div class="ins-title">Top 10 DSM Impact Blocks</div><div class="ins-table-wrap"><table class="ins-table"><thead><tr><th>#</th><th>Date</th><th>Block</th><th>Time</th><th>Deviation MWh</th><th>Dev %</th><th>DSM Impact</th><th>Type</th></tr></thead><tbody>${topRows}</tbody></table></div></div>

    <div class="ins-card wide"><div class="ins-title">Over vs Under Injection — Financial View</div>
      <div class="impact-row"><b>Over (${a.over.length} blocks)</b><div class="impact-track"><i style="width:${a.over.length/blocks.length*100}%;background:#175DB8"></i></div><b>${ciRs(a.over.reduce((x,b)=>x+b.charge,0))}</b></div>
      <div class="impact-row"><b>Under (${a.under.length} blocks)</b><div class="impact-track"><i style="width:${a.under.length/blocks.length*100}%;background:#C1403A"></i></div><b>${ciRs(a.under.reduce((x,b)=>x+b.charge,0))}</b></div>
    </div>
    <div class="ins-card wide"><div class="ins-title">Frequency / Deviation Signal</div>
      <div class="ins-big blue">${ciNum(maxPctBlock.devPct,2)}%</div>
      <div class="ins-sub">Highest absolute deviation %: ${ciDate(maxPctBlock.date)} · Block ${maxPctBlock.block} · Frequency ${ciNum(maxPctBlock.f,2)} Hz</div>
      <div class="ins-mini"><span>Blocks analysed: ${blocks.length}</span><span>Avg deviation: ${ciNum(a.avg,3)} MWh/block</span></div>
    </div>

    <div class="ins-card full"><div class="ins-title">“Why did DSM increase?” — Automated Explanation</div>
      <div class="ins-sub" style="font-size:9px;color:#172B3E">
        ${a.charge>0
          ? `The current period is net debit. The largest daily contributor is <b>${ciDate(worstDay?.date)}</b> (${ciRs(worstDay?.charge)}). ${limitCross} blocks crossed the 10% deviation threshold. The highest-impact block is <b>${ciDate(maxBlock.date)} Block ${maxBlock.block}</b>.`
          : `The current period is net credit. Credit from over-injection exceeds debit exposure in the selected period. The largest absolute financial contributor is <b>${ciDate(worstDay?.date)}</b>.`}
      </div>
    </div>
  </div>`;
}
window.addEventListener('load',()=>setTimeout(renderCompleteInsights,900));
