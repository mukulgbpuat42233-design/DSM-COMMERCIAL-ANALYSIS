const fs = require('fs');
let html = fs.readFileSync('script_0.js', 'utf8');

const t1 = "function renderLogin(){ const app=document.getElementById('app'); const ctx=window.currentPlantContext||'Khurja Floating Solar'; const plant=window.THDC_PLANTS?.[ctx]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};";

const t2 = " const authority=window.THDC_GRID_SOURCES?.[ctx]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";

console.log("t1 exists:", html.includes(t1));
console.log("t2 exists:", html.includes(t2));

