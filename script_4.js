
function renderFrequencyTimeline(){
 const el=document.getElementById('frequencyTimelineContent'); if(!el)return;
 const blocks=ciAllBlocks(ciWeek()); if(!blocks.length){el.innerHTML='<div class="ins-empty">Load block data first.</div>';return;}
 const low=49.97,high=50.03;
 const cls=b=>{
   if(b.f<low && b.dev<0)return ['GRID STRESS','fr-bad'];
   if(b.f<low && b.dev>0)return ['FREQUENCY SUPPORT','fr-good'];
   if(b.f>high && b.dev>0)return ['ADVERSE','fr-bad'];
   if(b.f>high && b.dev<0)return ['FREQUENCY SUPPORT','fr-good'];
   return ['NEUTRAL','fr-neu'];
 };
 const rows=blocks.map((b,i)=>{
   const z=cls(b);
   return `<tr><td>${i+1}</td><td>${ciDate(b.date)}</td><td>${b.block}</td><td>${b.time}</td><td class="mono">${ciNum(b.f,3)} Hz</td><td class="mono">${b.dev>=0?'+':''}${ciNum(b.dev,3)} MWh</td><td>${ciNum(b.devPct,2)}%</td><td><span class="${z[1]}">${z[0]}</span></td></tr>`;
 }).join('');
 el.innerHTML=`<div style="overflow:auto"><table class="fr-table"><thead><tr><th>#</th><th>Date</th><th>Block</th><th>Time</th><th>Frequency</th><th>Deviation</th><th>Dev %</th><th>Observed Response</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
window.addEventListener('load',()=>setTimeout(renderFrequencyTimeline,1100));
