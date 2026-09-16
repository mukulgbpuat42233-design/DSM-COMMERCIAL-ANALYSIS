const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const targetStr = "function renderLogin(){ const app=document.getElementById('app'); const plant=window.THDC_PLANTS?.[window.currentPlantContext]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};";

const replaceStr = "function renderLogin(){ const app=document.getElementById('app'); const ctx=window.currentPlantContext||'Khurja Floating Solar'; const plant=window.THDC_PLANTS?.[ctx]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};";

if (html.includes(targetStr)) {
    html = html.replace(targetStr, replaceStr);
    
    const targetStr2 = " const authority=window.THDC_GRID_SOURCES?.[window.currentPlantContext]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";
    const replaceStr2 = " const authority=window.THDC_GRID_SOURCES?.[ctx]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";
    
    if (html.includes(targetStr2)) {
         html = html.replace(targetStr2, replaceStr2);
         fs.writeFileSync('public/index.html', html);
         console.log("Success");
    } else {
        console.log("str2 not found");
    }
} else {
    console.log("str1 not found");
}

