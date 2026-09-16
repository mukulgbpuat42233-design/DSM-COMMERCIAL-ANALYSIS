const fs = require('fs');
let html = fs.readFileSync('script_0.js', 'utf8');

const t1 = "function renderLogin(){ const app=document.getElementById('app'); const plant=window.THDC_PLANTS?.[window.currentPlantContext]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};";

console.log("t1 exists original:", html.includes(t1));

