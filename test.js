const v = 'Khurja Floating Solar';
const state = {};
const p = {};
p.name = 'Khurja Floating Solar';
p.capacity = 11;
state.projectMeta = {};
state.projectMeta.plant = p.name + ' — ' + p.capacity + ' MW';
console.log(state.projectMeta.plant);
