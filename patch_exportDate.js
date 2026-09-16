const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "const period = week.days[0].date+' to '+week.days[week.days.length-1].date;";
const r = "const period = formatDateDDMMYYYY(week.days[0].date)+' to '+formatDateDDMMYYYY(week.days[week.days.length-1].date);";

if (html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("exportWeek period updated.");
}

const t2 = "allBlocks.push({date:d.date, idx:b.idx, time:b.t, dev:r.dev, devPct:r.devPct, charge:r.charge});";
const r2 = "allBlocks.push({date:formatDateDDMMYYYY(d.date), idx:b.idx, time:b.t, dev:r.dev, devPct:r.devPct, charge:r.charge});";
if (html.includes(t2)) {
    html = html.replace(t2, r2);
    fs.writeFileSync('public/index.html', html);
    console.log("allBlocks date updated.");
}

