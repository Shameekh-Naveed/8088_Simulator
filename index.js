let A = {
  h: 0,
  l: 0,
};
let B = {
  h: 0,
  l: 0,
};
let C = {
  h: 0,
  l: 0,
};
let D = {
  h: 0,
  l: 0,
};

let memoryContent = [0, 0, 0, 0, 0, 0, 0, 0]; // Content of 0 to F memory locations
let memorySegments = () => {
  let arr = [];
  for (let i = 0; i < 16; i++) {
    const element = document.getElementById(`${i}mem`);
    arr.push(element);
  }
  return arr;
};

// console.log(memorySegments());

let registerA = "000";
let RegisterB = "000";

let registers = {};

// Creating functions for different operations

function basicArithematic(opcode, D, W, mod, R0, R1) {
  // Works for MOV, ADD, SUB, MUL, DIV
  // if mod says address then
  if (mod == address) {
    R0 = 0;
  }
}

// Creating sequence functions for every type of cylinder

// Memory to PC bus toggle
function mem_pc_down() {
  let toggleAble = document.querySelector(".mem-pc-bus");

  toggleAble.classList.toggle("mem-pc-bus-down-fill");
}

// PC to Controller bus toggle
function pc_controller_down() {
  let toggleAble = document.querySelector(".pc-controller-bus");

  toggleAble.classList.toggle("pc-controller-bus-down-fill");
}

// Memory to IR bus toggle
function mem_ir_up() {
  let toggleAble = document.querySelector(".mem-ir-bus");

  toggleAble.classList.toggle("mem-ir-bus-up-fill");
}

// IR to Controller Bus Toggle
function ir_controller_up() {
  let toggleAble = document.querySelector(".ir-controller-bus");

  toggleAble.classList.toggle("ir-controller-bus-up-fill");
}

// ALU to Registers Bus Toggle
function alu_regs_up() {
  let toggleAble = document.querySelector(".ALU-Registers-bus");

  toggleAble.classList.toggle("ALU-Registers-bus-up-fill");
}
function alu_regs_down() {
  let toggleAble = document.querySelector(".ALU-Registers-bus");

  toggleAble.classList.toggle("ALU-Registers-bus-down-fill");
}

// Memory to Registers Bus Toggle
function mem_regs_up() {
  let toggleAble = document.querySelector(".mem-Registers-bus");

  toggleAble.classList.toggle("mem-Registers-bus-up-fill");
}

function mem_regs_down() {
  let toggleAble = document.querySelector(".mem-Registers-bus");

  toggleAble.classList.toggle("mem-Registers-bus-down-fill");
}

// Processor to Datapath Bus Toggle
function proc_dp_left() {
  let toggleAble = document.querySelector(".proc-dp-bus");

  toggleAble.classList.toggle("proc-dp-bus-left-fill");
}
function proc_dp_right() {
  let toggleAble = document.querySelector(".proc-dp-bus");

  toggleAble.classList.toggle("proc-dp-bus-right-fill");
}

// FUNCTIONS TO GLOW THE BOXES
// Controler Box
function controller_glow() {
  let toggleAble = document.querySelector(".controller");

  toggleAble.classList.toggle("controller-glow");
}

// PC Box
function pc_glow() {
  let toggleAble = document.querySelector(".programcounter");

  toggleAble.classList.toggle("programcounter-glow");
}

// IR Box
function ir_glow() {
  let toggleAble = document.querySelector(".instructionregister");

  toggleAble.classList.toggle("instructionregister-glow");
}

// Memory Box
function memory_glow() {
  let toggleAble = document.querySelector(".memory-block");

  toggleAble.classList.toggle("memory-block-glow");
}

// ALU Box
function ALU_glow() {
  let toggleAble = document.querySelector(".ALU-block");

  toggleAble.classList.toggle("ALU-block-glow");
}

// Registers Box
function registers_glow() {
  let toggleAble = document.querySelector(".Registers-block");

  toggleAble.classList.toggle("Registers-block-glow");
}

// Empty Function for time delay
function empty() {}

// Testing function
async function test() {
  controller_glow();
  await new Promise((empty) => setTimeout(empty, 700));

  pc_controller_down();
  await new Promise((empty) => setTimeout(empty, 700));
  controller_glow();

  pc_glow();
  await new Promise((empty) => setTimeout(empty, 700));

  mem_pc_down();
  await new Promise((empty) => setTimeout(empty, 700));
  pc_glow();

  memory_glow();
  await new Promise((empty) => setTimeout(empty, 700));

  mem_ir_up();
  await new Promise((empty) => setTimeout(empty, 700));
  memory_glow();

  ir_glow();
  await new Promise((empty) => setTimeout(empty, 700));

  ir_controller_up();
  await new Promise((empty) => setTimeout(empty, 700));
  ir_glow();

  controller_glow();
  await new Promise((empty) => setTimeout(empty, 700));

  alu_regs_up();
  await new Promise((empty) => setTimeout(empty, 700));
  controller_glow();

  mem_regs_down();
  await new Promise((empty) => setTimeout(empty, 700));

  proc_dp_right();
  await new Promise((empty) => setTimeout(empty, 700));

  proc_dp_right();
  mem_regs_down();
  alu_regs_up();
  ir_controller_up();
  mem_pc_down();
  pc_controller_down();
  mem_ir_up();
}
