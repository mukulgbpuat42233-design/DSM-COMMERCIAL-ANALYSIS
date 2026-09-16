const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');
html = html.replace(
  "function renderLogin(){ const app=document.getElementById('app'); const plant=window.THDC_PLANTS?.[window.currentPlantContext]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'}; const authority=window.THDC_GRID_SOURCES?.[ctx]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');",
  "function renderLogin(){ const app=document.getElementById('app'); const ctx=window.currentPlantContext||'Khurja Floating Solar'; const plant=window.THDC_PLANTS?.[ctx]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'}; const authority=window.THDC_GRID_SOURCES?.[ctx]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');"
);
fs.writeFileSync('public/index.html', html);
