const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t1 = "  const p=window.THDC_PLANTS?.[v]||{};\n  const authority=window.THDC_GRID_SOURCES?.[v]?.label || ((v==='Tehri HPP'||v==='Tehri PSP'||v==='Koteshwar HEP')?'NRPC':'UPSLDC');\n  if(state.projectMeta){\n    state.projectMeta.plant=p.name+' — '+p.capacity+' MW';\n    state.projectMeta.name=p.name;\n  }\n  const box=document.getElementById('loginAuthorityBox');";

console.log("t1 exists: ", html.includes(t1));

