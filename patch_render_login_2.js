const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "const authority=window.THDC_GRID_SOURCES?.[ctx]?.label||((plant.name==='Tehri HPP'||plant.name==='Tehri PSP'||plant.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";
const r = "const authority=window.THDC_GRID_SOURCES?.[ctx]?.label||((plant?.name==='Tehri HPP'||plant?.name==='Tehri PSP'||plant?.name==='Koteshwar HEP')?'NRPC':'UPSLDC');";

if(html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("Success");
} else {
    console.log("Not found");
}
