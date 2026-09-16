const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "  if(box) box.innerHTML='GRID / SETTLEMENT AUTHORITY: <b>'+authority+'</b><span style=\"float:right\">'+p.capacity+' MW</span>';";
const r = "  if(box) box.innerHTML='GRID / SETTLEMENT AUTHORITY: <b>'+authority+'</b><span style=\"float:right\">'+(p?.capacity||'')+' MW</span>';";

if(html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("Success");
} else {
    console.log("Not found");
}
