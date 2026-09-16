const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "if(d.blocks.length !== BLOCKS_PER_DAY) issues.push(d.date+': '+d.blocks.length+'/96 blocks');";
const r = "if(d.blocks.length !== BLOCKS_PER_DAY) issues.push(formatDateDDMMYYYY(d.date)+': '+d.blocks.length+'/96 blocks');";

if (html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
}
