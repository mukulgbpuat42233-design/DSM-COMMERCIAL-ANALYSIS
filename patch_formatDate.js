const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = `function formatDateDDMMYYYY(v){
  if(!v) return '';
  const s=String(v);
  const m=s.match(/^(\\d{4})-(\\d{2})-(\\d{2})$/);
  if(m) return \`\${m[3]}-\${m[2]}-\${m[1]}\`;
  const d=new Date(v);
  if(!isNaN(d.getTime())){
    return String(d.getDate()).padStart(2,'0')+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+d.getFullYear();
  }
  return s;
}`;

const r = `function formatDateDDMMYYYY(v){
  if(!v) return '';
  const s=String(v).trim();
  // Already YYYY-MM-DD
  let m = s.match(/^(\\d{4})-(\\d{2})-(\\d{2})$/);
  if(m) return \`\${m[3]}-\${m[2]}-\${m[1]}\`;
  // Already DD-MM-YYYY or DD/MM/YYYY
  let m2 = s.match(/^(\\d{2})[-/](\\d{2})[-/](\\d{4})$/);
  if (m2) return \`\${m2[1]}-\${m2[2]}-\${m2[3]}\`;
  // Fallback
  const d = new Date(v);
  if(!isNaN(d.getTime())){
    return String(d.getDate()).padStart(2,'0')+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+d.getFullYear();
  }
  return s;
}`;

if (html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("formatDateDDMMYYYY updated.");
} else {
    console.log("formatDateDDMMYYYY not found. Searching...");
}
