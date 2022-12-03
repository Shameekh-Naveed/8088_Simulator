import machineCoder from "./Machinecodeassemble.js";

let machineCode = 0;
let registers = {
  A: {
    l: { address: 0, data: "B3" },
    h: { address: 100, data: "A1" },
  },
  B: {
    l: { address: 011, data: "D6" },
    h: { address: 111, data: "C4" },
  },
  C: {
    l: { address: 001, data: "22" },
    h: { address: 101, data: "00" },
  },
  D: {
    l: { address: 010, data: "AA" },
    h: { address: 110, data: "DD" },
  },
};

let pc = "0000",
  ir = "000000  00 00 000 000";

let R0 = "0000",
  R1 = "0000";

// Manipulate regisers
const setRegisters = (address, newData) => {
  for (const register in registers) {
    for (const subReg in registers[register]) {
      if (registers[register][subReg].address == address) {
        console.log("here");
        registers[register][subReg].data = newData;
        return true;
      }
    }
  }
};

// Given the address of a register determine the value
const reg = (address) => {
  for (const register in registers) {
    for (const subReg in registers[register]) {
      if (registers[register][subReg].address == address) {
        console.log("here");
        return registers[register][subReg].data;
      }
    }
  }

  // switch (address) {
  //   case 000:
  //     return registers.A.h.data;
  //     break;
  //   case 001:
  //     return registers.A.l.data;
  //     break;
  //   case 010:
  //     return registers.B.h.data;
  //     break;
  //   case 011:
  //     return registers.B.l.data;
  //     break;
  //   case 100:
  //     return registers.C.h.data;
  //     break;
  //   case 101:
  //     return registers.C.l.data;
  //     break;
  //   case 110:
  //     return registers.D.h.data;
  //     break;
  //   case 111:
  //     return registers.D.l.data;
  //     break;
  // }
};

let memoryContent = [
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
  "0000",
]; // Content of 0 to F memory locations
const memorySegments = () => {
  let arr = [];
  for (let i = 0; i < 16; i++) {
    const element = document.getElementById(`${i}mem`);
    arr.push(element);
  }
  return arr;
};

// Function that sets everything that needs to be set

const mountData = () => {
  let memSegs = memorySegments();
  for (let i = 0; i < memSegs.length; i++) {
    const location = memSegs[i];
    location.innerHTML = memoryContent[i];
  }
  document.getElementById("ah").innerHTML = registers.A.h.data;
  document.getElementById("al").innerHTML = registers.A.l.data;
  document.getElementById("bh").innerHTML = registers.B.h.data;
  document.getElementById("bl").innerHTML = registers.B.l.data;
  document.getElementById("ch").innerHTML = registers.C.h.data;
  document.getElementById("cl").innerHTML = registers.C.l.data;
  document.getElementById("dh").innerHTML = registers.D.h.data;
  document.getElementById("dl").innerHTML = registers.D.l.data;

  document.getElementById("pc").innerHTML = pc;
  document.getElementById("ir").innerHTML = ir;

  document.getElementById("R0").innerHTML = R0;
  document.getElementById("R1").innerHTML = R1;
};

// Creating functions for different operations

function basicArithematic(opcode, D, W, mod, R0, R1) {
  let currentMemory = memorySegments();
  let destinationContent = reg(R0);
  let sourceContent = reg(R1);
  //  0 pr right pr para ha
  if ((D = 0)) {
    let sourceContent;
  } else {
  }

  if (mod == 11) {
  }

  // console.log({ sourceContent, destinationContent });

  // // if mod says address then
  // if (mod == 11) {
  //   // Figure out if R0 is address or R1
  //   if (R0 == address) {
  //     location = currentMemory[R0];
  //   }
  // }

  switch (opcode) {
    case 100010: //MOV
      setRegisters(R0, sourceContent);
      break;
    case 100011: //INC
      setRegisters(R0, sourceContent);
      break;
    case 100101: //ADD
      setRegisters(R0, sourceContent);
      break;
    case 100110: //SUB
      setRegisters(R0, sourceContent);
      break;
    case 100111: //DEC
      setRegisters(R0, sourceContent);
      break;
    case 100100: //CMP
      setRegisters(R0, sourceContent);
      break;
    case 101000: //OR
      setRegisters(R0, sourceContent);
      break;
    case 101001: //AND
      setRegisters(R0, sourceContent);
      break;
    case 101010: //XOR
      setRegisters(R0, sourceContent);
      break;
    case 1000010:
      setRegisters(R0, sourceContent);
      break;
    case 1000010:
      setRegisters(R0, sourceContent);
      break;
    case 1000010:
      setRegisters(R0, sourceContent);
      break;
    case 1000010:
      setRegisters(R0, sourceContent);
      break;
    case 1000010:
      setRegisters(R0, sourceContent);
      break;
    case 1000010:
      setRegisters(R0, sourceContent);
      break;
  }

  mountData();
}

// Empty time out function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// A function that moves the lines using animation

const busRun = async (busId, auxBus = 0) => {
  let animation = "dataflowUp 3s infinite linear";

  switch (auxBus) {
    case 1:
      animation = "dataflowLeft 2s infinite linear";
      break;
    case 2:
      animation = "dataflowRight 2s infinite linear";
      break;
    case 3:
      animation = "dataflowLeftALU 2s infinite linear";
      break;
    case 4:
      animation = "dataflowRightALU 2s infinite linear";
      break;
  }

  let bus = document.getElementById(`${busId}`);
  bus.style.animation = animation;
  await sleep(3 * 1000);
  bus.style.animation = "";
};

const pcToController = async () => {
  await busRun("pc_bus");
  await busRun("ir_pc_bus", 1);
};
const irToController = async () => {
  await busRun("ir_bus");
  await busRun("ir_pc_bus", 2);
};
const R0ToALU = async () => {
  await busRun("R0_bus");
  await busRun("R0_R1_bus", 3);
};
const R1ToALU = async () => {
  await busRun("R1_bus");
  await busRun("R0_R1_bus", 4);
};

const allAnimation = async () => {
  await pcToController();
  await irToController();
  await R0ToALU();
  await R1ToALU();
};
allAnimation();
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

function translate(){
  machineCode = machineCoder(input);
  document.getElementsByClassName('trans_text')[0].innerHTML = 11
};

translate();