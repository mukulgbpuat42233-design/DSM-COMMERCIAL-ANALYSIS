
window.THDC_PLANTS={
 "Khurja STPP":{name:"Khurja STPP",capacity:1320,unit:"MW",type:"Thermal Power Plant"},
 "Koteshwar HEP":{name:"Koteshwar HEP",capacity:400,unit:"MW",type:"Hydro Electric Power Plant"},
 "Tehri HPP":{name:"Tehri HPP",capacity:1000,unit:"MW",type:"Hydro Power Plant"},
 "Tehri PSP":{name:"Tehri PSP",capacity:1000,unit:"MW",type:"Pumped Storage Plant"},
 "Khurja Floating Solar":{name:"Khurja Floating Solar",capacity:11,unit:"MW",type:"Floating Solar Power Plant"}
};
window.currentPlantContext=localStorage.getItem('thdc-plant-context')||'Khurja Floating Solar';
function setPlantContext(v){
 window.currentPlantContext=THDC_PLANTS[v]?v:'Khurja Floating Solar';
 localStorage.setItem('thdc-plant-context',window.currentPlantContext);
 const p=THDC_PLANTS[window.currentPlantContext];
 document.title='THDC DSM - '+p.name;
 const badge=document.getElementById('plantCapacityBadge');
 if(badge)badge.textContent=p.capacity+' MW · '+p.type;
 const pn=document.getElementById('selectedPlantName'),pc=document.getElementById('selectedPlantCapacity'),pt=document.getElementById('selectedPlantType');
 if(pn)pn.textContent=p.name; if(pc)pc.textContent=p.capacity+' MW'; if(pt)pt.textContent=p.type;
 if(typeof renderAll==='function')renderAll();
 if(typeof renderTHDCUPSLDCReconciliation==='function')renderTHDCUPSLDCReconciliation();
 if(typeof renderCompleteInsights==='function')renderCompleteInsights();
 if(typeof renderFrequencyDaywise==='function')renderFrequencyDaywise();
}
window.addEventListener('load',()=>{
 const s=document.getElementById('plantContextSelect');
 if(s){s.value=THDC_PLANTS[window.currentPlantContext]?window.currentPlantContext:'Khurja Floating Solar';}
 const p=THDC_PLANTS[s?.value||window.currentPlantContext];
 const badge=document.getElementById('plantCapacityBadge');
 if(badge&&p)badge.textContent=p.capacity+' MW · '+p.type;
 const pn=document.getElementById('selectedPlantName'),pc=document.getElementById('selectedPlantCapacity'),pt=document.getElementById('selectedPlantType');
 if(pn&&p)pn.textContent=p.name; if(pc&&p)pc.textContent=p.capacity+' MW'; if(pt&&p)pt.textContent=p.type;
});
