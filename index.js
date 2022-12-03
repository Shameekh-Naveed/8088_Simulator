function machineCoder(str1) {
  str1 = str1.toUpperCase();
  query = str1.split(/[ ,]+/);
  let B3216 = [
    "EAX",
    "EBX",
    "ECX",
    "EDX",
    "AX",
    "BX",
    "CX",
    "DX",
    "BP",
    "SI",
    "DI",
  ];
  let B8 = ["AL", "AH", "BH", "BL", "CH", "CL", "DH", "DL"];

  let formats = ["OP", "D", "W", "MOD", "REG", "R/M", "Disp", "Imm"];

  let REG1 = {
    AL: "000",
    CL: "001",
    DL: "010",
    BL: "011",
    AH: "100",
    CH: "101",
    DH: "110",
    BH: "111",
  };

  let REG2 = {
    AX: "000",
    CX: "001",
    DX: "010",
    BX: "011",
    SP: "100",
    BP: "101",
    SI: "110",
    DI: "111",
  };

  let RM00 = {
    "[BX+SI]": "000",
    "[BX+DI]": "001",
    "[BP+SI]": "010",
    "[BP+DI]": "011",
    "[SI]": "100",
    "[DI]": "101",
    "[DIRECT]": "110",
    "[BX]": "111",
  };

  let RM01 = {
    "[BX+SI+D8]": "000",
    "[BX+DI+D8]": "001",
    "[BP+SI+D8]": "010",
    "[BP+DI+D8]": "011",
    "[SI+D8]": "100",
    "[DI+D8]": "101",
    "[BP+D8]": "110",
    "[BX+D8]": "111",
  };

  let RM10 = {
    "[BX+SI+D16]": "000",
    "[BX+DI+D16]": "001",
    "[BP+SI+D16]": "010",
    "[BP+DI+D16]": "011",
    "[SI+D16]": "100",
    "[DI+D16]": "101",
    "[BP+D16]": "110",
    "[BX+D16]": "111",
  };

  let MOD = { NO: "00", "8B": "01", "16B": "10", REG: "11" };

  let opcode1 = { MOV: "100010" };
  let opcode2 = {
    INC: "100011",
    ADD: "100101",
    SUB: "100110",
    DEC: "100111",
    CMP: "100100",
    OR: "101000",
    AND: "101001",
    XOR: "101010",
  };

  let HEX = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };
  let RPM = ["BX", "SI", "DI", "BP"];

  let findD = () => {
    if (query[1][0] == "[") {
      formats[1] = "0";
    } else {
      formats[1] = "1";
    }
  };

  let findW = () => {
    for (i of B3216) {
      if (query[1].search(i) != -1 || query[2].search(i) != -1) {
        formats[2] = "1";
        break;
      }
    }
    if (formats[2] == "W") {
      for (i of B8) {
        if (query[1].search(i) != -1 || query[2].search(i) != -1) {
          formats[2] = "0";
          break;
        }
      }
    }
  };

  let Immediate = () => {
    if (
      query[2][0] != "[" &&
      !["X", "H", "L", "I", "P"].includes(
        query[2][query[2].length - 1].toUpperCase()
      )
    ) {
      if (formats[2] == "0" && query[2].length >= 3 && query[1][0] == "[") {
        return false;
      } else {
        formats[7] = "";
        for (i of query[2]) {
          formats[7] = formats[7].concat(HEX[i]);
        }
        return true;
      }
    }

    return true;
  };

  let findMOD = () => {
    count = -1;
    msg = false;
    for (i of query) {
      count += 1;
      if (i[0] == "[") {
        msg = true;
        break;
      }
    }
    if (msg) {
      temp = query[count].slice(1, query[count].length - 1);
      let msg2 = false;
      for (i in temp) {
        if (temp[i] == "+") {
          msg2 = true;
          break;
        }
      }
      if (msg2) {
        q1 = temp.split("+");
        if (RPM.includes(q1[q1.length - 1])) {
          formats[3] = MOD["NO"];
        } else {
          if (q1[q1.length - 1].trimStart("0").length == 2) {
            formats[3] = MOD["8B"];
          } else {
            formats[3] = MOD["16B"];
          }
          if (!RPM.includes(q1[q1.length - 1])) {
            formats[6] = q1[q1.length - 1].trimStart("0");
          }
        }
      } else {
        formats[3] = MOD["NO"];
      }
    } else {
      formats[3] = MOD["REG"];
    }
    return true;
  };

  let if11 = () => {
    if (formats[2] == "0") {
      try {
        if (REG1[query[2]] == undefined) {
          throw new Error("Out of Range");
        }
        formats[5] = REG1[query[2]];
      } catch {
        formats[5] = "000";
      }
    }
    if (formats[2] == "1") {
      formats[4] = REG2[query[1]];
      try {
        if (REG2[query[2]] == undefined) {
          throw new Error("Not Found");
        }
        formats[5] = REG2[query[2]];
      } catch {
        formats[5] = "000";
      }
    }
    return true;
  };

  let findOP = () => {
    try {
      if (opcode1[query[0]] == undefined) {
        throw new Error("Not Found");
      }
      formats[0] = opcode1[query[0]];
    } catch {
      try {
        if (opcode2[query[0]] == undefined) {
          throw new Error("Not found");
        }
        formats[0] = opcode2[query[0]];
      } catch {
        return false;
      }
    }
    return true;
  };

  let ifnot11 = () => {
    if (formats[1] == "0") {
      mem = query[1];
      reg = query[2];
    } else {
      mem = query[2];
      reg = query[1];
    }
    if ((formats[7] != "Imm" && formats[1] == "1") || formats[7] == "Imm") {
      if (formats[2] == "1") {
        if (REG2[reg] == undefined) {
          return false;
        }
        formats[4] = REG2[reg];
      } else {
        formats[4] = REG1[reg];
      }
    }
    if ((formats[7] != "Imm" && formats[1] == "0") || formats[7] == "Imm") {
      q1 = mem.slice(1, mem.length - 1).split("+");
      if (formats[3] == "00") {
        try {
          if (RM00[mem] == undefined) {
            throw new Error("Not Found");
          }
          formats[5] = RM00[mem];
        } catch {
          formats[5] = RM00["[DIRECT]"];
          formats[6] = mem.slice(1, mem.length - 1);
        }
      } else if (formats[3] == "01") {
        try {
          if (RM01[mem] == undefined) {
            throw new Error("Not Found");
          }
          formats[5] = RM01[mem];
        } catch {
          try {
            q1[q1.length - 1] = "D8";
            mem = q1.join("+");
            console.log(mem);
            if (RM01[`[${mem}]`] == undefined) {
              throw new Error("Not Found");
            }
            formats[5] = RM01[`[${mem}]`];
          } catch {
            return false;
          }
        }
      } else {
        try {
          if (RM10[mem] == undefined) {
            throw new Error("Not Found");
          }
          formats[5] = RM10[mem];
        } catch {
          try {
            q1[q1.length - 1] = "D16";
            mem = q1.join("+");
            if (RM10[`[${mem}]`] == undefined) {
              throw new Error("Not Found");
            }
            formats[5] = RM10[`[${mem}]`];
          } catch {
            return false;
          }
        }
      }
    }
    return true;
  };

  let error = () => {
    if (query[2][0] == "[" && B8.includes(query[1])) {
      return false;
    }
    if (query[2][0] == "[" && query[1][0] == "[") {
      return false;
    }
    if (query[2][0] != "[" && query[1][0] != "[") {
      if (B3216.includes(query[1])) {
        if (query[2] in B8) {
          console.log("Different Size registers Not supported");
          return false;
        }
      }
    } else if (B8.includes(query[1])) {
      if (B3216.includes(query[2])) {
        console.log("Different Size registers Not supported");
        return false;
      }
    }
    return true;
  };

  let machinecode = () => {
    if (error()) {
      let t = findOP();
      if (t) {
        findD();
        findW();
        torf = findMOD();
        if (torf) {
          ques = Immediate();
          if (ques) {
            if (formats[3] == "11") {
              q1 = if11();
            } else {
              q1 = ifnot11();
            }
            if (formats[4] == "REG") {
              formats[4] = "000";
            }
            if (formats[5] == "R/M") {
              formats[5] = "000";
            }
            if (formats)
              if (q1) {
                mem = {
                  OPCODE: "",
                  D: "",
                  W: "",
                  MOD: "",
                  REM: "",
                  RM: "",
                  DISP: "",
                  IMM: "",
                };
                let count = 0;
                for (i in mem) {
                  mem[i] = formats[count];
                  count += 1;
                }
                return mem;
              } else {
                return false;
              }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return machinecode();
}

// --------------------------------------------------------

let machineCode = 0;
let registers = {
  A: {
    l: { address: 000, data: "B3" },
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
        registers[register][subReg].data = newData;
        return true;
      }
    }
  }
};

// Given the address of a register determine the value
const reg1 = (address) => {
  for (const register1 in registers) {
    for (const subReg in registers[register1]) {
      if (registers[register1][subReg].address == address) {
        return registers[register1][subReg].data;
      }
    }
  }
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

function basicArithematic(opcode, D, W, mod, R0, R1, disp = 0) {
  console.log({ opcode, D, W, mod, R0, R1, disp });
  let currentMemory = memorySegments();
  let sourceContent, destinationContent;
  let sourceAddress, destinationAddress;

  // if (mod == "00") {
  //   // => R1 is ignored
  //   sourceAddress = disp;
  //   sourceContent = currentMemory[sourceAddress].innerHTML;

  //   // => R0 is register address
  //   destinationContent = reg1(R0);

  //   // console.log({ sourceAddress, sourceContent, destinationContent });
  // }

  if (mod == "00") {
    if (D == "1") {
      sourceAddress = disp;
      destinationAddress = R0;
      destinationContent = reg1(destinationAddress);
      sourceContent = currentMemory[sourceAddress];
    } else {
      sourceAddress = R1;
      destinationAddress = disp;
      destinationContent = currentMemory[destinationAddress];
      sourceContent = reg1(sourceAddress);
    }
    // sourceContent = currentMemory[sourceAddress].innerHTML;
    // destinationContent = reg1(R0);
  } else if (mod == "11") {
    if (D == "1") {
      sourceAddress = R1;
      destinationAddress = R0;
      destinationContent = reg1(destinationAddress);
      sourceContent = reg1(sourceAddress);
    } else {
      sourceAddress = R0;
      destinationAddress = R1;
      destinationContent = reg1(destinationAddress);
      sourceContent = reg1(sourceAddress);
    }
  }

  console.log({
    sourceAddress,
    sourceContent,
    destinationAddress,
    destinationContent,
  });
  // console.log({ sourceContent, destinationContent });

  // // if mod says address then
  // if (mod == 11) {
  //   // Figure out if R0 is address or R1
  //   if (R0 == address) {
  //     location = currentMemory[R0];
  //   }
  // }

  switch (opcode) {
    case "100010": //MOV
      console.log("first");
      console.log({ R0, sourceContent });
      setRegisters(destinationAddress, sourceContent);
      break;
    case "100011": //INC
      setRegisters(R0, sourceContent);
      break;
    case "100101": //ADD
      setRegisters(R0, sourceContent);
      break;
    case "100110": //SUB
      setRegisters(R0, sourceContent);
      break;
    case "100111": //DEC
      setRegisters(R0, sourceContent);
      break;
    case "100100": //CMP
      setRegisters(R0, sourceContent);
      break;
    case "101000": //OR
      setRegisters(R0, sourceContent);
      break;
    case "101001": //AND
      setRegisters(R0, sourceContent);
      break;
    case "101010": //XOR
      setRegisters(R0, sourceContent);
      break;
    case "1000010":
      setRegisters(R0, sourceContent);
      break;
    case "1000010":
      setRegisters(R0, sourceContent);
      break;
    case "1000010":
      setRegisters(R0, sourceContent);
      break;
    case "1000010":
      setRegisters(R0, sourceContent);
      break;
    case "1000010":
      setRegisters(R0, sourceContent);
      break;
    case "1000010":
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

function translate() {
  machineCode = machineCoder(document.getElementsByClassName("input")[0].value);

  document.getElementsByClassName("trans_text")[0].innerHTML =
    machineCode.OPCODE +
    " " +
    machineCode.D +
    machineCode.W +
    " " +
    machineCode.MOD +
    " " +
    machineCode.REM +
    " " +
    machineCode.RM;
}

function simulate() {
  basicArithematic(
    machineCode.OPCODE,
    machineCode.D,
    machineCode.W,
    machineCode.MOD,
    machineCode.REM,
    machineCode.RM,
    machineCode.DISP
  );
}
