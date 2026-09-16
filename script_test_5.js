
function renderFrequencyResponseVisual(){
  const chartEl=document.getElementById('frequencyResponseTimelineChart');
  const kpiEl=document.getElementById('frequencyResponseKPIs');
  const exEl=document.getElementById('frequencyResponseExplanation');
  if(!chartEl)return;
  const blocks=ciAllBlocks(ciWeek());
  if(!blocks.length){
    if(kpiEl)kpiEl.innerHTML='<div class="frv-explain">Load 96-block data to display frequency response.</div>';
    return;
  }
  const low=49.97, high=50.03;
  const classify=b=>{
    if(b.f<low && b.dev<0)return ['GRID STRESS','frv-stress'];
    if(b.f<low && b.dev>0)return ['FREQUENCY SUPPORT','frv-support'];
    if(b.f>high && b.dev>0)return ['ADVERSE','frv-stress'];
    if(b.f>high && b.dev<0)return ['FREQUENCY SUPPORT','frv-support'];
    return ['NEUTRAL','frv-neutral'];
  };
  const stress=blocks.filter(b=>classify(b)[0]==='GRID STRESS');
  const support=blocks.filter(b=>classify(b)[0]==='FREQUENCY SUPPORT');
  const adverse=blocks.filter(b=>classify(b)[0]==='ADVERSE');
  const neutral=blocks.filter(b=>classify(b)[0]==='NEUTRAL');
  const lowUnder=blocks.filter(b=>b.f<low&&b.dev<0);
  const lowOver=blocks.filter(b=>b.f<low&&b.dev>0);
  const highUnder=blocks.filter(b=>b.f>high&&b.dev<0);
  const highOver=blocks.filter(b=>b.f>high&&b.dev>0);
  const avg=(a,k)=>a.length?a.reduce((s,b)=>s+b[k],0)/a.length:0;
  const minF=Math.min(...blocks.map(b=>b.f)), maxF=Math.max(...blocks.map(b=>b.f));
  const score=((support.length-adverse.length)/(blocks.length||1))*100;

  kpiEl.innerHTML=`
    <div class="frv-kpi bad"><span>GRID STRESS</span><b>${stress.length}</b><span>low F + under-injection</span></div>
    <div class="frv-kpi good"><span>FREQUENCY SUPPORT</span><b>${support.length}</b><span>directionally supportive</span></div>
    <div class="frv-kpi bad"><span>ADVERSE</span><b>${adverse.length}</b><span>high F + over-injection</span></div>
    <div class="frv-kpi"><span>NEUTRAL / DEADBAND</span><b>${neutral.length}</b><span>49.97–50.03 Hz</span></div>
    <div class="frv-kpi"><span>MIN FREQUENCY</span><b>${ciNum(minF,3)} Hz</b></div>
    <div class="frv-kpi"><span>MAX FREQUENCY</span><b>${ciNum(maxF,3)} Hz</b></div>
    <div class="frv-kpi bad"><span>UNDER @ LOW F</span><b>${lowUnder.length}</b><span>${ciNum(avg(lowUnder,'dev'),3)} MWh avg deviation</span></div>
    <div class="frv-kpi good"><span>OVER @ LOW F</span><b>${lowOver.length}</b><span>${ciNum(avg(lowOver,'dev'),3)} MWh avg deviation</span></div>`;

  exEl.innerHTML=`
    <div class="frv-explain">
      <b>How to read this:</b>
      When frequency is <b>below ${low.toFixed(2)} Hz</b>, under-injection is flagged <b style="color:#C1403A">GRID STRESS</b> because it is directionally opposite to the needed active-power response, while over-injection is flagged <b style="color:#0F8A5F">FREQUENCY SUPPORT</b>.
      When frequency is <b>above ${high.toFixed(2)} Hz</b>, the direction reverses.
      <br><b>Observed week:</b> ${lowUnder.length} low-frequency under-injection blocks vs ${lowOver.length} low-frequency over-injection blocks. Directional response score: <b>${score>=0?'+':''}${ciNum(score,1)}</b>.
      <br><span style="color:#6B7D90">This describes the observed relationship; it does not by itself establish that the plant caused or corrected the grid-frequency event.</span>
    </div>`;

  if(window._frequencyResponseTimeline)window._frequencyResponseTimeline.destroy();
  const datasets=[
    {label:'Grid Stress — Under @ Low F',data:stress.map(b=>({x:b.block+(new Date(b.date).getTime()%7)*96,y:b.dev})),backgroundColor:'#C1403A',borderColor:'#C1403A',pointRadius:4},
    {label:'Frequency Support',data:support.map(b=>({x:b.block+(new Date(b.date).getTime()%7)*96,y:b.dev})),backgroundColor:'#0F8A5F',borderColor:'#0F8A5F',pointRadius:4},
    {label:'Adverse — Over @ High F',data:adverse.map(b=>({x:b.block+(new Date(b.date).getTime()%7)*96,y:b.dev})),backgroundColor:'#C1403A',borderColor:'#C1403A',pointRadius:4},
    {label:'Neutral / Deadband',data:neutral.map(b=>({x:b.block+(new Date(b.date).getTime()%7)*96,y:b.dev})),backgroundColor:'#E7A62A',borderColor:'#E7A62A',pointRadius:3}
  ];
  window._frequencyResponseTimeline=new Chart(chartEl,{type:'scatter',data:{datasets},options:{
    responsive:true,maintainAspectRatio:false,
    plugins:{legend:{position:'bottom',labels:{font:{size:7},boxWidth:8}}},
    scales:{
      x:{title:{display:true,text:'Block sequence (Day × 96)',font:{size:8}},ticks:{font:{size:7}}},
      y:{title:{display:true,text:'Deviation (MWh)',font:{size:8}},ticks:{font:{size:7}}}
    }
  }});
}
window.addEventListener('load',()=>setTimeout(renderFrequencyResponseVisual,1200));
