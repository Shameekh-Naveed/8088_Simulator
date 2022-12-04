const translate = (instruction) => {
  machineCode = machineCoder(instruction);
  if (machineCode == false) {
    alert("invalid instruction");
    document.getElementsByClassName("trans_text")[0].innerHTML =
      "Invalid Syntax";
    return false;
  }
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
};

const simulate = async () => {
  await basicArithematic(
    machineCode.OPCODE,
    machineCode.D,
    machineCode.W,
    machineCode.MOD,
    machineCode.REM,
    machineCode.RM,
    machineCode.DISP,
    machineCode.IMM
  );
};

function machineCoder(str1) {
  let mem, reg, torf, ques, i, q1;
  str1 = str1.toUpperCase();
  let query = str1.split(/[ ,]+/);
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

  let opcode3 = { SHL: "101101", SHR: "101110", ROR: "101111", ROL: "110000" };
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
        formats[7] = query[2];
        if (formats[7].length > "2" && B8.includes(query[1])) {
          return false;
        }
        return true;
      }
    }

    return true;
  };

  let findMOD = () => {
    let count = -1;
    let msg = false;
    let temp, q1;
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
        if (REG1[query[1]] == undefined) {
          throw new Error("Not Found");
        }
        formats[4] = REG1[query[1]];
      } catch {
        return false;
      }

      try {
        if (REG1[query[2]] == undefined) {
          throw new Error("Not Found");
        }
        formats[5] = REG1[query[2]];
      } catch {
        formats[5] = "000";
      }
    } else {
      formats[4] = REG2[query[1]];
      try {
        if (REG2[query[1]] == undefined) {
          throw new Error("Not Found");
        }
        formats[4] = REG2[query[1]];
      } catch {
        return false;
      }

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
    if (opcode3[query[0]] != undefined) {
      formats[0] = opcode3[query[0]];
      if (B8.includes(query[1]) != -1 || B3216.includes(query[1] != -1)) {
        Immediate();
        // console.log(formats);
        if (formats[7] != "Imm") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
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
    let mem;
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
            // console.log(mem);
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
        if (B8.includes(query[2])) {
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

// Hexadecimal Adder function
function adder(a, b, digits) {
  var ndigits = digits,
    i,
    carry = 0,
    d,
    result = "";
  for (i = ndigits - 1; i >= 0; i--) {
    d = parseInt(a[i], 16) + parseInt(b[i], 16) + carry;
    carry = d >> 4;
    result = (d & 15).toString(16) + result;
  }
  return result;
}

function hexToDec(hex) {
  return parseInt(hex, 16).toString(10);
}

function decToHex(dec) {
  return parseInt(dec, 10).toString(16).toUpperCase();
}

function binToHex(bin) {
  return parseInt(bin, 2).toString(16).toUpperCase();
}

function hexaSubtract(a, b) {
  let first = hexToDec(a);
  let second = hexToDec(b);
  if (second > first) {
    return false;
  }
  let result = first - second;
  return decToHex(result);
}

function hexToBin(hex) {
  let len = hex.length * 4;
  return parseInt(hex, 16).toString(2).padStart(len, "0");
}

function SH(times, val, direction) {
  let decVal = hexToDec(val);
  let decTimes = hexToDec(times);

  console.log({ times, val, decVal, decTimes });

  if (direction == "L") {
    return decToHex(decVal << decTimes);
  } else {
    return decToHex(decVal >> decTimes);
  }
}

function rotater(times, val, direction) {
  let binVal = hexToBin(val);
  let decTimes = hexToDec(times);
  let first = binVal[0];
  let last = binVal[binVal.length - 1];

  console.log({ val, times, binVal, decTimes });

  if (direction == "L") {
    for (let i = 0; i < Number(decTimes); i++) {
      first = binVal[0];
      binVal << "1";
      binVal = first + binVal.slice(1, binVal.length);
      console.log({ msg: "hr point", binVal });
    }
  } else {
    for (let i = 0; i < Number(decTimes); i++) {
      last = binVal[binVal.length - 1];
      binVal >> "1";
      binVal = binVal.slice(0, binVal.length - 1) + last;
    }
  }

  return binToHex(binVal);
}

let machineCode = 0;
let registers = {
  A: {
    l: { address: "000", data: "B3" },
    h: { address: "100", data: "A1" },
  },
  B: {
    l: { address: "011", data: "D6" },
    h: { address: "111", data: "C4" },
  },
  C: {
    l: { address: "001", data: "22" },
    h: { address: "101", data: "00" },
  },
  D: {
    l: { address: "010", data: "AA" },
    h: { address: "110", data: "DD" },
  },
};

let pc = "1SF";
let irFunc = () => {
  return (
    machineCode.OPCODE +
    " " +
    machineCode.D +
    machineCode.W +
    " " +
    machineCode.MOD +
    " " +
    machineCode.REM +
    " " +
    machineCode.RM
  );
};
let ir = "000000 00 00 000 000";

let R0 = "0000",
  R1 = "0000";

// Manipulate regisers
const setRegisters = (address, newData) => {
  for (const register in registers) {
    for (const subReg in registers[register]) {
      if (registers[register][subReg].address == address) {
        // console.log({ address, newData });
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

  // document.getElementById("pc").innerHTML = pc;
  // document.getElementById("ir").innerHTML = ir;

  // document.getElementById("R0").innerHTML = R0;
  // document.getElementById("R1").innerHTML = R1;
};

// Creating functions for different operations
async function basicArithematic(opcode, D, W, mod, R0, R1, disp, imm) {
  console.log({
    msg: "Machine code passed to basic arithematic",
    opcode,
    D,
    W,
    mod,
    R0,
    R1,
    disp,
    imm,
  });
  let currentMemory = memorySegments();
  let sourceContent, destinationContent;
  let sourceContent2, destinationContent2;
  let sourceAddress, destinationAddress;
  let sourceAddress2, destinationAddress2;

  if (mod == "00") {
    if (D == "1") {
      sourceAddress = disp;
      destinationAddress = R0;
      destinationContent = reg1(destinationAddress);
      sourceContent = currentMemory[sourceAddress].innerHTML;
    } else {
      sourceAddress = R0;
      destinationAddress = disp;
      destinationContent = currentMemory[destinationAddress].innerHTML;
      sourceContent = reg1(sourceAddress);
    }
    if (W == "1") {
      if (sourceAddress == disp) {
        sourceContent2 = sourceContent[0] + sourceContent[1];
        sourceContent = sourceContent[2] + sourceContent[3];

        destinationAddress2 =
          "1" + destinationAddress[1] + destinationAddress[2];
      }
      if (destinationAddress == disp) {
        destinationContent2 = destinationContent[1] + destinationContent[0];
        destinationContent = destinationContent[3] + destinationContent[2];
      }
    }
  } else if (mod == "11") {
    if (D == "1") {
      sourceAddress = R1;
      destinationAddress = R0;
      destinationContent = reg1(destinationAddress);
      sourceContent = reg1(sourceAddress);
      if (imm != "Imm") {
        sourceAddress = null;
        // sourceContent = binToHex(imm);
        sourceContent = imm;
      }
    } else {
      sourceAddress = R0;
      destinationAddress = R1;
      destinationContent = reg1(destinationAddress);
      sourceContent = reg1(sourceAddress);
      if (imm != "Imm") {
        sourceAddress = null;
        // sourceContent = binToHex(imm);
        sourceContent = imm;
      }
    }
    // console.log({ sourceContent });
    if (W == "1") {
      if (sourceAddress == null) {
        sourceContent2 = sourceContent[0] + sourceContent[1];
        sourceContent = sourceContent[2] + sourceContent[3];
      } else {
        sourceAddress2 = "1" + sourceAddress[1] + sourceAddress[2];
        sourceContent2 = reg1(sourceAddress2);
      }
      if (destinationAddress == null) {
        destinationContent2 = destinationContent[1] + destinationContent[0];
        destinationContent = destinationContent[3] + destinationContent[2];
      } else {
        destinationAddress2 =
          "1" + destinationAddress[1] + destinationAddress[2];
        destinationContent2 = reg1(destinationAddress2);
      }

      // console.log({
      //   sourceAddress2,
      //   sourceAddress,
      //   sourceContent2,
      //   sourceContent,
      //   destinationAddress2,
      //   destinationContent2,
      // });
    }
  }

  console.log({
    sourceAddress,
    sourceContent,
    destinationAddress,
    destinationContent,
  });

  R0 = sourceContent;
  R1 = destinationContent;

  controllerWorking();

  document.getElementById("pc").innerHTML = pc;
  glowComponent("pc");

  await pcToController();

  document.getElementById("ir").innerHTML = irFunc();
  glowComponent("ir");

  await irToController();

  await outerBusRun("aux_bus", 1);

  aluWorking();

  document.getElementById("R1").innerHTML = R0;
  glowComponent("R1");

  await R0ToALU();
  if (disp != "Disp") {
    await outerBusRun("mem_datapath");
  }
  document.getElementById("R0").innerHTML = R1;
  glowComponent("R0");

  await R1ToALU();

  switch (opcode) {
    case "100010": //MOV
      console.log({ R0, sourceContent });
      if (disp != "Disp" && D == "0") {
        // currentMemory[destinationAddress].innerHTML = sourceContent;
        await outerBusRun("mem_datapath");
        memoryContent[destinationAddress] = sourceContent;
        console.log({ currentMemory });
        break;
      }
      setRegisters(destinationAddress, sourceContent);
      if (W == "1") {
        setRegisters(destinationAddress2, sourceContent2);
      }
      break;
    case "100011": //INC
      setRegisters(destinationAddress, adder(destinationContent, "01", 2));
      break;
    case "100101": //ADD
      setRegisters(
        destinationAddress,
        adder(sourceContent, destinationContent, W == "1" ? 4 : 2)
      );

      break;
    case "100110": //SUB
      setRegisters(
        destinationAddress,
        hexaSubtract(sourceContent, destinationContent)
      );
      break;
    case "100111": //DEC
      setRegisters(destinationAddress, destinationContent - 1);
      break;
    case "100100": //CMP
      setRegisters(R0, sourceContent);
      break;
    case "101000": //OR
      let result = hexToDec(sourceContent) | hexToDec(destinationContent);
      setRegisters(destinationAddress, decToHex(result));
      break;
    case "101001": //AND
      let resulter = hexToDec(sourceContent) & hexToDec(destinationContent);
      setRegisters(destinationAddress, decToHex(resulter));
      break;
    case "101010": //XOR
      let resultish = hexToDec(sourceContent) ^ hexToDec(destinationContent);
      setRegisters(destinationAddress, decToHex(resultish));
      break;
    case "101101": //SHL
      setRegisters(
        destinationAddress,
        SH(sourceContent, destinationContent, "L")
      );
      break;
    case "101110": // SHR
      setRegisters(
        destinationAddress,
        SH(sourceContent, destinationContent, "R")
      );
      break;
    case "101111": // ROR
      setRegisters(
        destinationAddress,
        rotater(sourceContent, destinationContent, "R")
      );
      break;
    case "110000": //ROL
      setRegisters(
        destinationAddress,
        rotater(sourceContent, destinationContent, "L")
      );
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

const outerBusRun = async (busId, auxBus = 0) => {
  let animation = "memB 1.5s infinite linear";
  if (auxBus == 1) {
    animation = "auxB 1.5s infinite linear";
  }
  let bus = document.getElementById(`${busId}`);
  bus.style.animation = animation;
  await sleep(1.5 * 1000);
  bus.style.animation = "";
};

const busRun = async (busId, auxBus = 0) => {
  let animation = "dataflowUp 1.5s infinite linear";

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
  await sleep(1.5 * 1000);
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

const glowComponent = async (componentId) => {
  let animation = "glow .5s infinite linear";
  let bus = document.getElementById(`${componentId}`);
  bus.style.animation = animation;
  await sleep(1 * 1000);
  bus.style.animation = "";
};

const aluWorking = async () => {
  let animation = "glowCircle 1s infinite linear";
  let c1 = document.getElementsByClassName("ALUTLcircle")[0];
  let c2 = document.getElementsByClassName("ALUBRcircle")[0];
  c1.style.animation = animation;
  c2.style.animation = animation;
  c2.style.animationDirection = "reverse";
  await sleep(8 * 1000);
  c1.style.animation = "";
  c2.style.animation = "";
};

const controllerWorking = async () => {
  let animation = "glowCircle 1s infinite linear";
  let c1 = document.getElementsByClassName("controllerTLcircle")[0];
  let c2 = document.getElementsByClassName("controllerBRcircle")[0];
  c1.style.animation = animation;
  c1.style.animationDirection = "reverse";
  c2.style.animation = animation;

  await sleep(8 * 1000);
  c1.style.animation = "";
  c2.style.animation = "";
};

const openConsole = () => {
  document.getElementById("overlay").style.display = "block";
  document
    .getElementById("overlay")
    .setAttribute("class", "animated fadeInLeft");
};

const closeConsole = () => {
  // document.getElementById("overlay").style.display = "block"
  document
    .getElementById("overlay")
    .setAttribute("class", "animated fadeOutRight");
  // clearConsole();
};

const clearConsole = () => {
  document.getElementById("consoleText").value = "";
};

const translateText = async () => {
  closeConsole();
  let textArr = document.getElementById("consoleText").value.split("\n");
  for (let i = 0; i < textArr.length; i++) {
    const element = textArr[i];
    document.getElementById("inputSmol").value = element;
    // console.log({ element });
    translate(element);
    // document.getElementsByClassName("trans_text")[0].innerHTML = machineCode;
    await simulate();
  }
  // clearConsole();
};

mountData();

document.getElementById("translater").onclick = () => {
  translate();
};
document.getElementById("simulator").onclick = () => {
  simulate();
};
document.getElementById("open").onclick = () => {
  openConsole();
};
document.getElementById("exitBtn").onclick = () => {
  closeConsole();
};
document.getElementById("translateBtn").onclick = () => {
  translateText();
};
document.querySelectorAll(".smexcy")[1].onclick = () => {
  clearConsole();
};
