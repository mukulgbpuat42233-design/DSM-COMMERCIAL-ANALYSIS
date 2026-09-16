const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "state.projectMeta.plant = plant.name + ' — ' + plant.capacity + ' MW';\n  state.projectMeta.name = plant.name;";
const r = "state.projectMeta.plant = plant?.name + ' — ' + plant?.capacity + ' MW';\n  state.projectMeta.name = plant?.name;";

if(html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("Success");
} else {
    console.log("Not found");
}
