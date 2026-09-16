const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = `function normalizeAppDate(v){
  const s=String(v||'').trim();
  let m=s.match(/^(\\d{2})-(\\d{2})-(\\d{4})$/);
  if(m) return \`\${m[3]}-\${m[2]}-\${m[1]}\`;
  return s;
}`;

const r = `function normalizeAppDate(v){
  const s=String(v||'').trim();
  let m=s.match(/^(\\d{2})[-/](\\d{2})[-/](\\d{4})$/);
  if(m) return \`\${m[3]}-\${m[2]}-\${m[1]}\`;
  return s;
}`;

if (html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("normalizeAppDate updated.");
}
