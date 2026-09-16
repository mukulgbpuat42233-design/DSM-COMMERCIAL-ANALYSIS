const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "  if(!state.projectMeta) state.projectMeta = {};\n  state.projectMeta.plant=p?.name+' — '+p?.capacity+' MW';\n  state.projectMeta.name=p?.name;";

if(!html.includes(t)) {
    const orig = "  if(!state.projectMeta) state.projectMeta = {};\n  state.projectMeta.plant=p.name+' — '+p.capacity+' MW';\n  state.projectMeta.name=p.name;";
    html = html.replace(orig, t);
    fs.writeFileSync('public/index.html', html);
    console.log("Success");
} else {
    console.log("Already applied");
}
