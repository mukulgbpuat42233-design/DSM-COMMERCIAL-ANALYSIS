const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const regex = /function renderLogin\(\)\{\s*const app=document\.getElementById\('app'\);\s*const plant=window\.THDC_PLANTS\?\.\[window\.currentPlantContext\]\|\|\{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'\};\s*const authority=window\.THDC_GRID_SOURCES\?\.\[window\.currentPlantContext\]\?\.label\|\|\(\(plant\.name==='Tehri HPP'\|\|plant\.name==='Tehri PSP'\|\|plant\.name==='Koteshwar HEP'\)\?'NRPC':'UPSLDC'\);/;

const replacement = "function renderLogin(){ const app=document.getElementById('app'); const ctx=window.currentPlantContext||'Khurja Floating Solar'; const plant=window.THDC_PLANTS?.[ctx]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'}; const authority=window.THDC_GRID_SOURCES?.[ctx]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";

if (regex.test(html)) {
  html = html.replace(regex, replacement);
  fs.writeFileSync('public/index.html', html);
  console.log("Success");
} else {
  console.log("Not found with regex");
}
