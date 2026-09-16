const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = " if(typeof renderFrequencyDaywise==='function')renderFrequencyDaywise();\n}";
const r = " if(typeof renderFrequencyDaywise==='function')renderFrequencyDaywise();\n if(typeof renderOptimizationInsights==='function')renderOptimizationInsights();\n}";

if(html.includes(t)) {
  html = html.replace(t, r);
  fs.writeFileSync('public/index.html', html);
  console.log("Success");
} else {
  console.log("String not found");
}

