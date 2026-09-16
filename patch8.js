const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t1 = "function renderLogin(){ const app=document.getElementById('app'); const plant=window.THDC_PLANTS?.[window.currentPlantContext]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};";
const r1 = "function renderLogin(){ const app=document.getElementById('app'); const ctx=window.currentPlantContext||'Khurja Floating Solar'; const plant=window.THDC_PLANTS?.[ctx]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};";

const t2 = " const authority=window.THDC_GRID_SOURCES?.[window.currentPlantContext]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";
const r2 = " const authority=window.THDC_GRID_SOURCES?.[ctx]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";

html = html.replace(t1, r1);
html = html.replace(t2, r2);

fs.writeFileSync('public/index.html', html);
