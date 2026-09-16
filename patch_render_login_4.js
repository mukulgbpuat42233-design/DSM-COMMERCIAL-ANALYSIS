const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "  if(!state.projectMeta) state.projectMeta = {};\n  state.projectMeta.plant=p.name+' — '+p.capacity+' MW';\n  state.projectMeta.name=p.name;";
const r = "  if(!state.projectMeta) state.projectMeta = {};\n  state.projectMeta.plant=p?.name+' — '+p?.capacity+' MW';\n  state.projectMeta.name=p?.name;";

if(html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("Success");
} else {
    console.log("Not found");
}
