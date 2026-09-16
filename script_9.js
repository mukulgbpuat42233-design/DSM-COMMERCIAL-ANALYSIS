
/* ===== PLANT → GRID / SETTLEMENT AUTHORITY ROUTING ===== */
window.THDC_GRID_SOURCES={
 "Khurja STPP":{authority:"UPSLDC",label:"UPSLDC",region:"Uttar Pradesh",revisionLabel:"UPSLDC Schedule Revision",statementLabel:"UPSLDC DSM Statement"},
 "Khurja Floating Solar":{authority:"UPSLDC",label:"UPSLDC",region:"Uttar Pradesh",revisionLabel:"UPSLDC Schedule Revision",statementLabel:"UPSLDC DSM Statement"},
 "Tehri HPP":{authority:"NRPC",label:"NRPC",region:"Northern Region",revisionLabel:"NRPC Schedule Revision",statementLabel:"NRPC DSM Statement"},
 "Tehri PSP":{authority:"NRPC",label:"NRPC",region:"Northern Region",revisionLabel:"NRPC Schedule Revision",statementLabel:"NRPC DSM Statement"},
 "Koteshwar HEP":{authority:"NRPC",label:"NRPC",region:"Northern Region",revisionLabel:"NRPC Schedule Revision",statementLabel:"NRPC DSM Statement"}
};
function getGridSource(){
 return THDC_GRID_SOURCES[window.currentPlantContext]||THDC_GRID_SOURCES["Khurja Floating Solar"];
}
function updateGridSourceUI(){
 const s=getGridSource(), n=document.getElementById('gridSourceName'), d=document.getElementById('gridSourceDetails');
 if(n)n.textContent=s.label;
 if(d)d.textContent=s.region+' · '+s.statementLabel+' · '+s.revisionLabel;
 // Change reconciliation button wording dynamically.
 document.querySelectorAll('[onclick="loadUpsldcStatement()"]').forEach(b=>{b.textContent='⇪ Upload '+s.label+' Excel';});
 document.querySelectorAll('.recon-title').forEach(e=>{if(e.textContent.includes('THDC vs'))e.textContent='THDC vs '+s.label+' Calculation Reconciliation';});
}
const _oldSetPlantContext=window.setPlantContext;
window.setPlantContext=function(v){
 if(typeof _oldSetPlantContext==='function')_oldSetPlantContext(v); else {
   window.currentPlantContext=v;localStorage.setItem('thdc-plant-context',v);
 }
 updateGridSourceUI();
};
window.addEventListener('load',()=>setTimeout(updateGridSourceUI,300));
