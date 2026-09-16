
function renderFrequencyAnalysis(){
  const el=document.getElementById('frequencyContent'); if(!el)return;
  const week=ciWeek(), blocks=ciAllBlocks(week);
  if(!blocks.length){el.innerHTML='<div class="freq-card"><div class="freq-sub">Load block data to generate frequency analysis.</div></div>';return;}
  const low=Number(window.FP?.bandLow ?? 49.97), high=Number(window.FP?.bandHigh ?? 50.03), nominal=50;
  const under=blocks.filter(b=>b.dev<0), over=blocks.filter(b=>b.dev>0);
  const underLow=under.filter(b=>b.f<low), underHigh=under.filter(b=>b.f>high), underDead=under.filter(b=>b.f>=low&&b.f<=high);
  const overLow=over.filter(b=>b.f<low), overHigh=over.filter(b=>b.f>high), overDead=over.filter(b=>b.f>=low&&b.f<=high);
  const avg=(arr,key)=>arr.length?arr.reduce((s,x)=>s+x[key],0)/arr.length:0;
  const lowFreqUnderPct=under.length?underLow.length/under.length*100:0;
  const lowFreqOverPct=over.length?overLow.length/over.length*100:0;
  const supportive=overLow.length+underHigh.length;
  const adverse=underLow.length+overHigh.length;
  const neutral=underDead.length+overDead.length;
  const score=(supportive-adverse)/(supportive+adverse+neutral||1)*100;

  // Four operational interpretations:
  // Under-injection + low frequency = adverse (adds stress during under-frequency).
  // Over-injection + low frequency = supportive (adds active power during under-frequency).
  // Under-injection + high frequency = supportive (reduces injection during over-frequency).
  // Over-injection + high frequency = adverse (adds power during over-frequency).
  const matrix=[
    ['Under-injection',underLow.length,underDead.length,underHigh.length,'Adverse at low frequency; supportive at high frequency'],
    ['Over-injection',overLow.length,overDead.length,overHigh.length,'Supportive at low frequency; adverse at high frequency']
  ];
  const avgF=avg(blocks,'f'), avgUnderF=avg(under,'f'), avgOverF=avg(over,'f');
  const minF=Math.min(...blocks.map(b=>b.f)), maxF=Math.max(...blocks.map(b=>b.f));

  el.innerHTML=`
  <div class="freq-grid">
    <div class="freq-card">
      <div class="freq-title">Frequency vs Deviation — 96 Block Profile</div>
      <div class="freq-sub">Blue = over-injection · Red = under-injection · horizontal lines show the 49.97–50.03 Hz operating band.</div>
      <div class="freq-chart"><canvas id="frequencyScatterChart"></canvas></div>
    </div>
    <div class="freq-card">
      <div class="freq-title">Grid Response Classification</div>
      <div class="freq-kpis">
        <div class="freq-kpi"><span class="freq-sub">Avg Frequency</span><b>${ciNum(avgF,3)} Hz</b></div>
        <div class="freq-kpi"><span class="freq-sub">Observed Range</span><b>${ciNum(minF,3)}–${ciNum(maxF,3)}</b></div>
        <div class="freq-kpi"><span class="freq-sub">Under @ Low F</span><b class="red">${underLow.length}</b><span class="freq-sub">${ciNum(lowFreqUnderPct,1)}% of under blocks</span></div>
        <div class="freq-kpi"><span class="freq-sub">Over @ Low F</span><b class="green">${overLow.length}</b><span class="freq-sub">${ciNum(lowFreqOverPct,1)}% of over blocks</span></div>
      </div>
      <table class="freq-matrix">
        <thead><tr><th>Injection</th><th>Low F &lt; ${low.toFixed(2)}</th><th>Deadband</th><th>High F &gt; ${high.toFixed(2)}</th></tr></thead>
        <tbody>
          <tr><td><b>Under</b></td><td class="freq-bad">${underLow.length} · Adverse</td><td class="freq-neutral">${underDead.length} · Neutral</td><td class="freq-good">${underHigh.length} · Supportive</td></tr>
          <tr><td><b>Over</b></td><td class="freq-good">${overLow.length} · Supportive</td><td class="freq-neutral">${overDead.length} · Neutral</td><td class="freq-bad">${overHigh.length} · Adverse</td></tr>
        </tbody>
      </table>
      <div class="freq-insight">
        <b>Observed response:</b> ${supportive} blocks were directionally supportive of frequency correction, ${adverse} were directionally adverse and ${neutral} fell inside the frequency deadband.
        This is a <b>data-based directional assessment</b>, not proof that the injection deviation itself caused the grid-frequency event.
      </div>
    </div>
  </div>
  <div class="freq-card" style="margin-top:10px">
    <div class="freq-title">“Grid Disturbance / Stabilization” Diagnostic</div>
    <div class="freq-sub">
      <b>Under-injection during low frequency:</b> directionally worsens the active-power imbalance and is therefore flagged <span class="ins-pill pill-red">GRID STRESS</span>.
      &nbsp;&nbsp;
      <b>Over-injection during low frequency:</b> directionally supplies active power and is flagged <span class="ins-pill pill-green">FREQUENCY SUPPORT</span>.
      &nbsp;&nbsp;
      Conversely, during high frequency the preferred direction reverses.
    </div>
    <div class="freq-insight">
      <b>Week signal:</b> frequency-response score = <b>${score>=0?'+':''}${ciNum(score,1)}</b>.
      Positive means more blocks were directionally supportive than adverse; negative means the reverse.
      Average frequency during under-injection was <b>${ciNum(avgUnderF,3)} Hz</b>, versus <b>${ciNum(avgOverF,3)} Hz</b> during over-injection.
    </div>
  </div>`;

  if(typeof Chart!=='undefined'){
    const c=document.getElementById('frequencyScatterChart');
    if(c){
      if(window._frequencyScatter)window._frequencyScatter.destroy();
      const overPts=over.map(b=>({x:b.f,y:b.dev}));
      const underPts=under.map(b=>({x:b.f,y:b.dev}));
      window._frequencyScatter=new Chart(c,{type:'scatter',data:{datasets:[
        {label:'Over-injection',data:overPts,backgroundColor:'#215CD1',pointRadius:3},
        {label:'Under-injection',data:underPts,backgroundColor:'#C1403A',pointRadius:3}
      ]},options:{responsive:true,maintainAspectRatio:false,
        plugins:{legend:{position:'bottom',labels:{font:{size:8},boxWidth:9}}},
        scales:{
          x:{type:'linear',title:{display:true,text:'Frequency (Hz)',font:{size:9}},ticks:{font:{size:8}},min:Math.min(49.85,minF-0.01),max:Math.max(50.15,maxF+0.01)},
          y:{title:{display:true,text:'Deviation (MWh)',font:{size:9}},ticks:{font:{size:8}}}
        }
      }});
    }
  }
}
window.addEventListener('load',()=>setTimeout(renderFrequencyAnalysis,1000));
