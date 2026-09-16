const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const target = "const plant=window.THDC_PLANTS?.[ctx]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};";
const rep = "const plant=window.THDC_PLANTS?.[ctx]||{name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant'};\n  if (!state.projectMeta) state.projectMeta = {};\n  state.projectMeta.plant = plant.name + ' — ' + plant.capacity + ' MW';\n  state.projectMeta.name = plant.name;";

if(html.includes(target)) {
    html = html.replace(target, rep);
    fs.writeFileSync('public/index.html', html);
    console.log('Success');
} else {
    console.log('Not found');
}
