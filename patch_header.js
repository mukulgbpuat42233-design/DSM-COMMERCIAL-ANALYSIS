const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Replace the old three blocks with the new unified header
const oldHeaderStart = '<div id="plantProfileCard"';
const oldHeaderEndRegex = /<span style="font-size:8px;color:#6B7D90">Same DSM engine · plant-specific Excel\/source mapping\.<\/span>\n<\/div>/m;

// Find start index
const startIndex = html.indexOf(oldHeaderStart);
const endMatch = html.match(oldHeaderEndRegex);

if (startIndex !== -1 && endMatch) {
    const endIndex = endMatch.index + endMatch[0].length;
    const oldBlock = html.substring(startIndex, endIndex);

    const newHeader = `<header id="thdc-global-header" style="background: linear-gradient(135deg, #062E73 0%, #084399 100%); color: #fff; padding: 20px 32px; border-radius: 0 0 16px 16px; margin: 0 0 24px 0; display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-between; align-items: center; box-shadow: 0 10px 30px rgba(6, 46, 115, 0.15); width: 100%; border-bottom: 4px solid #F59E0B;">
 <div style="display: flex; flex-direction: column; gap: 4px;">
  <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.12em; color: #93C5FD; text-transform: uppercase;" id="selectedPlantType"></div>
  <div style="display: flex; align-items: center; gap: 12px;">
   <span id="selectedPlantName" style="font-size: 24px; font-weight: 900; color: #fff; letter-spacing: -0.02em;"></span>
   <span id="selectedPlantCapacity" style="background: rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 800; border: 1px solid rgba(255,255,255,0.2);"></span>
  </div>
 </div>
 
 <div style="display: flex; flex-direction: column; gap: 6px; border-left: 1px solid rgba(255,255,255,0.15); padding-left: 24px;">
  <b style="font-size: 10px; color: #93C5FD; letter-spacing: 0.08em; text-transform: uppercase;">Grid / Settlement Authority</b>
  <div id="gridSourceName" style="font-size: 16px; font-weight: 800; color: #fff;"></div>
  <div id="gridSourceDetails" style="font-size: 11px; color: #DBEAFE; opacity: 0.8;"></div>
 </div>

 <div style="display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.2); padding: 12px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
  <b style="font-size: 11px; color: #93C5FD; font-weight: 800;">WORKSPACE</b>
  <select id="plantContextSelect" style="height: 38px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.1); color: #fff; padding: 0 14px; font-size: 14px; font-weight: 700; outline: none; cursor: pointer; min-width: 240px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);" onchange="setPlantContext(this.value)">
   <option style="color: #0F172A;" value="Khurja STPP">Khurja STPP — 1320 MW</option>
   <option style="color: #0F172A;" value="Koteshwar HEP">Koteshwar HEP — 400 MW</option>
   <option style="color: #0F172A;" value="Tehri HPP">Tehri HPP — 1000 MW</option>
   <option style="color: #0F172A;" value="Tehri PSP">Tehri PSP — 1000 MW</option>
   <option style="color: #0F172A;" value="Khurja Floating Solar">Khurja Floating Solar — 11 MW</option>
  </select>
  <span id="plantCapacityBadge" style="display: none;"></span> 
 </div>
</header>`;

    html = html.substring(0, startIndex) + newHeader + html.substring(endIndex);
    console.log("Header replaced.");
} else {
    console.log("Could not find the old header block bounds.");
}

// 2. Update the hide logic in <style id="hide-login-only-banners">
const oldHideCss = `body:has(.login-wrap) #plantProfileCard,
body:has(.login-wrap) #gridSourceBanner{
  display:none !important;
}`;
const newHideCss = `body:has(.login-wrap) #thdc-global-header{
  display:none !important;
}`;

if (html.includes(oldHideCss)) {
    html = html.replace(oldHideCss, newHideCss);
    console.log("Hide CSS updated.");
}

// 3. Update the global layout width (if needed)
// Actually, earlier I wrapped body content in <div id="main-layout-wrapper">. Let's make sure it has proper styling.
const oldLayout = 'style="max-width: 1480px; margin: 0 auto; background: #fff; box-shadow: 0 0 40px rgba(0,0,0,0.05); min-height: 100vh;"';
const newLayout = 'style="max-width: 1440px; margin: 0 auto; background: #F8FAFC; box-shadow: 0 0 60px rgba(0,0,0,0.08); min-height: 100vh; overflow-x: hidden;"';

if (html.includes(oldLayout)) {
    html = html.replace(oldLayout, newLayout);
    console.log("Layout wrapper updated.");
}

// We should also ensure the body background outside the max-width is a nice dark color, like #E2E8F0 or #F1F5F9.
// And remove .app{max-width:1480px!important;padding:24px 30px 90px!important} and just use padding inside .app.
const oldAppCss = `.app{max-width:1480px!important;padding:24px 30px 90px!important}`;
const newAppCss = `.app{padding: 10px 32px 90px!important; width: 100%;}`;

if (html.includes(oldAppCss)) {
    html = html.replace(oldAppCss, newAppCss);
    console.log(".app CSS updated.");
}

fs.writeFileSync('public/index.html', html);
