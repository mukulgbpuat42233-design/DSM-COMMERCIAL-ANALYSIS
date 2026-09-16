const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t1 = '<div class="login-authority" id="loginAuthorityBox">GRID / SETTLEMENT AUTHORITY: <b>${authority||\'\'}</b><span style="float:right">${plant?plant.capacity:\'\'} MW</span></div>';
const r1 = '<div class="login-authority" id="loginAuthorityBox" style="display:flex;align-items:center;"><span style="opacity:0.8;">GRID / SETTLEMENT AUTHORITY:</span> <b style="color:#0F172A; margin-left:6px;">${authority||\'\'}</b><span style="margin-left:auto; color:#0073CF; font-weight:900;">${plant?plant.capacity:\'\'} MW</span></div>';

html = html.replace(t1, r1);

const t2 = "if(box) box.innerHTML='GRID / SETTLEMENT AUTHORITY: <b>'+authority+'</b><span style=\"float:right\">'+(p?.capacity||'')+' MW</span>';";
const r2 = "if(box) box.innerHTML='<span style=\"opacity:0.8;\">GRID / SETTLEMENT AUTHORITY:</span> <b style=\"color:#0F172A; margin-left:6px;\">'+authority+'</b><span style=\"margin-left:auto; color:#0073CF; font-weight:900;\">'+(p?.capacity||'')+' MW</span>';";

html = html.replace(t2, r2);

fs.writeFileSync('public/index.html', html);
console.log("Auth box updated");
