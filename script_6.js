
function renderFrequencyDaywise(){
 const el=document.getElementById('frequencyDaywiseContent'); if(!el)return;
 let week;
 try{week=weekObj()}catch(e){week={days:[]}}
 const days=week.days||[];
 if(!days.length){el.innerHTML='<div class="frday-sub">Load week data to display day-wise frequency response.</div>';return;}
 const low=49.97,high=50.03;
 let charts='';
 let summaryRows='';
 days.forEach((day,di)=>{
   const bs=(day.blocks||[]).map(b=>{
     const r=computeBlock(b.s,b.a,b.f,b.r);
     return {idx:Number(b.idx)||0,time:b.t||'',f:Number(b.f)||0,dev:Number(r.dev)||0,devPct:Number(r.devPct)||0};
   });
   const stress=bs.filter(b=>b.f<low&&b.dev<0);
   const support=bs.filter(b=>(b.f<low&&b.dev>0)||(b.f>high&&b.dev<0));
   const adverse=bs.filter(b=>b.f>high&&b.dev>0);
   const neutral=bs.filter(b=>b.f>=low&&b.f<=high);
   const minF=bs.length?Math.min(...bs.map(b=>b.f)):0,maxF=bs.length?Math.max(...bs.map(b=>b.f)):0;
   const avgF=bs.length?bs.reduce((s,b)=>s+b.f,0)/bs.length:0;
   const score=((support.length-adverse.length)/(bs.length||1))*100;
   let response=score>10?'SUPPORTIVE':score<-10?'ADVERSE':'MIXED';
   let responseClass=response==='SUPPORTIVE'?'frday-good':response==='ADVERSE'?'frday-bad':'frday-neutral';
   const id='frdayChart_'+di;
   charts+=`
   <div class="frday-card" style="margin-top:9px">
    <div class="frday-head"><div><div class="frday-title">${formatDateDDMMYYYY(day.date)}</div><div class="frday-sub">Frequency vs deviation · 96 blocks</div></div>
      <span class="${responseClass}" style="font-size:8px">${response}</span>
    </div>
    <div class="frday-kpis">
      <div class="frday-kpi"><span>AVG FREQ</span><b>${avgF.toFixed(3)} Hz</b></div>
      <div class="frday-kpi"><span>MIN FREQ</span><b>${minF.toFixed(3)} Hz</b></div>
      <div class="frday-kpi"><span>MAX FREQ</span><b>${maxF.toFixed(3)} Hz</b></div>
      <div class="frday-kpi bad"><span>GRID STRESS</span><b>${stress.length}</b></div>
      <div class="frday-kpi good"><span>FREQ SUPPORT</span><b>${support.length}</b></div>
      <div class="frday-kpi bad"><span>ADVERSE</span><b>${adverse.length}</b></div>
      <div class="frday-kpi"><span>NEUTRAL</span><b>${neutral.length}</b></div>
      <div class="frday-kpi"><span>RESPONSE SCORE</span><b>${score>=0?'+':''}${score.toFixed(1)}</b></div>
    </div>
    <div class="frday-chart"><canvas id="${id}"></canvas></div>
    <div class="frday-note">
      <b>${formatDateDDMMYYYY(day.date)}:</b>
      ${stress.length} low-frequency under-injection blocks were directionally adverse;
      ${bs.filter(b=>b.f<low&&b.dev>0).length} low-frequency over-injection blocks were directionally supportive.
      At high frequency, under-injection is treated as supportive and over-injection as adverse.
      <span style="color:#6B7D90">This is an observed directional relationship, not a causal grid-event claim.</span>
    </div>
    <div class="table-scroll" style="max-height:150px;margin-top:8px">
      <table class="frday-table"><thead><tr><th>Block</th><th>Time</th><th>Freq</th><th>Deviation</th><th>Response</th></tr></thead>
      <tbody>${bs.map(b=>{
        let lab,cl;
        if(b.f<low&&b.dev<0){lab='GRID STRESS';cl='frday-bad'}
        else if((b.f<low&&b.dev>0)||(b.f>high&&b.dev<0)){lab='FREQ SUPPORT';cl='frday-good'}
        else if(b.f>high&&b.dev>0){lab='ADVERSE';cl='frday-bad'}
        else {lab='NEUTRAL';cl='frday-neutral'}
        return `<tr><td>#${b.idx}</td><td>${b.time}</td><td>${b.f.toFixed(2)} Hz</td><td>${b.dev>=0?'+':''}${b.dev.toFixed(3)} MWh</td><td><span class="${cl}">${lab}</span></td></tr>`;
      }).join('')}</tbody></table>
    </div>
   </div>`;
   summaryRows+=`<tr><td>${formatDateDDMMYYYY(day.date)}</td><td>${avgF.toFixed(3)}</td><td>${minF.toFixed(3)}</td><td>${maxF.toFixed(3)}</td><td>${stress.length}</td><td>${support.length}</td><td>${adverse.length}</td><td>${neutral.length}</td><td><span class="${responseClass}">${response}</span></td></tr>`;
   setTimeout(()=>{
     const c=document.getElementById(id); if(!c||typeof Chart==='undefined')return;
     const ds=[
       {label:'Grid Stress',data:stress.map(b=>({x:b.idx,y:b.dev})),backgroundColor:'#C1403A',pointRadius:3},
       {label:'Frequency Support',data:support.map(b=>({x:b.idx,y:b.dev})),backgroundColor:'#0F8A5F',pointRadius:3},
       {label:'Adverse',data:adverse.map(b=>({x:b.idx,y:b.dev})),backgroundColor:'#E7A62A',pointRadius:3},
       {label:'Neutral',data:neutral.map(b=>({x:b.idx,y:b.dev})),backgroundColor:'#8A93A3',pointRadius:2}
     ];
     new Chart(c,{type:'scatter',data:{datasets:ds},options:{responsive:true,maintainAspectRatio:false,
       plugins:{legend:{position:'bottom',labels:{font:{size:7},boxWidth:8}}},
       scales:{x:{min:1,max:96,title:{display:true,text:'15-minute Block',font:{size:8}},ticks:{stepSize:8,font:{size:7}}},
               y:{title:{display:true,text:'Deviation (MWh)',font:{size:8}},ticks:{font:{size:7}}}}
     }});
   },200+di*60);
 });
 el.innerHTML=`
  <div class="frday-summary">
   <div class="frday-card" style="margin:0"><div class="frday-title">7-Day Frequency Response Summary</div>
    <div class="table-scroll"><table class="frday-table"><thead><tr><th>Date</th><th>Avg Hz</th><th>Min</th><th>Max</th><th>Grid Stress</th><th>Support</th><th>Adverse</th><th>Neutral</th><th>Overall</th></tr></thead><tbody>${summaryRows}</tbody></table></div>
   </div>
   <div class="frday-card" style="margin:0"><div class="frday-title">How to Read</div>
    <div class="frday-sub" style="font-size:9px;line-height:1.6;color:#172B3E">
      <b style="color:#C1403A">Low F + Under</b> = directionally adverse / grid stress.<br>
      <b style="color:#0F8A5F">Low F + Over</b> = directionally supportive / stabilization direction.<br>
      <b style="color:#0F8A5F">High F + Under</b> = directionally supportive.<br>
      <b style="color:#C1403A">High F + Over</b> = directionally adverse.<br>
      <span style="color:#6B7D90">The dashboard reports observed association only; it does not attribute the grid event solely to the plant.</span>
    </div>
   </div>
  </div>${charts}`;
}
window.addEventListener('load',()=>setTimeout(renderFrequencyDaywise,1400));
