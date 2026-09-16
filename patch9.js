const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "function renderLogin(){ const app=document.getElementById('app'); const plant=window.THDC_PLANTS?.[window.currentPlantContext]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};";
const r = "function renderLogin(){ const app=document.getElementById('app'); const ctx=window.currentPlantContext||'Khurja Floating Solar'; const plant=window.THDC_PLANTS?.[ctx]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};";

const t2 = " const authority=window.THDC_GRID_SOURCES?.[window.currentPlantContext]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";
const r2 = " const authority=window.THDC_GRID_SOURCES?.[ctx]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";

html = html.replace(t, r);
html = html.replace(t2, r2);

// Re-write script_0 to script_9.js back into html
const regex = /<script>([\s\S]*?)<\/script>/gi;
let match;
let i = 0;
while ((match = regex.exec(html)) !== null) {
   const scriptContent = match[1];
   if (i === 0) {
      let script0 = fs.readFileSync('script_0.js', 'utf8');
      html = html.replace(scriptContent, script0);
   }
   i++;
}

fs.writeFileSync('public/index.html', html);
