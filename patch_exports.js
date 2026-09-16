const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const reps = [
  { t: "dailyRows.push([d.date, dg.blocks,", r: "dailyRows.push([formatDateDDMMYYYY(d.date), dg.blocks," },
  { t: "blockRows.push([d.date, b.idx, b.t,", r: "blockRows.push([formatDateDDMMYYYY(d.date), b.idx, b.t," },
  { t: "calcRows.push([d.date, b.idx, Number(r.devPct", r: "calcRows.push([formatDateDDMMYYYY(d.date), b.idx, Number(r.devPct" },
  { t: "allBlocks.push({date:d.date,idx:b.idx,time:b.t", r: "allBlocks.push({date:formatDateDDMMYYYY(d.date),idx:b.idx,time:b.t" },
  { t: "blockBody.push([d.date,b.idx,b.t,pdfNum(b.s,3)", r: "blockBody.push([formatDateDDMMYYYY(d.date),b.idx,b.t,pdfNum(b.s,3)" }
];

reps.forEach(({t,r}) => {
  if(html.includes(t)) {
    html = html.replace(t, r);
    console.log("Patched:", t.substring(0, 30));
  }
});

fs.writeFileSync('public/index.html', html);
