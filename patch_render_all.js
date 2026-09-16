const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "function renderAll(){\n  setTimeout(renderOptimizationInsights, 120);";
const r = "function renderAll(){\n  if (typeof renderOptimizationInsights === 'function') setTimeout(renderOptimizationInsights, 120);";

if(html.includes(t)) {
  html = html.replace(t, r);
  fs.writeFileSync('public/index.html', html);
  console.log("Success");
} else {
  console.log("String not found");
}

