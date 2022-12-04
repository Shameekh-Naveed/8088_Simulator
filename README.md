# 8088_Simulator
Welcome to the 8088/8086 simulator we made as out COAL FYP
## Project details
An undergraduate majoring in computer science would benefit greatly from a good understanding
of assembly language programming. Programming with assembly or lower-level
languages provides one a highly important understanding of computer organisation and
architecture.
### Project functions:
### TASK NO 1
You need towrite a programwith easy to graphical use interface in the programming language
of your choice that will simulate the behavior of 8088/8086 processor. The program should
include the conversion from assembly language to machine code as per the book (implement
at least 15 different instructions with different operands). The program should show display
the contents of the registers and memory (for simplicity you can use 8 registers and 16
memory locations).
### TASK 2
The program should also give error in case of not allowed instructions like size mismatch etc.
Choose a simple circuit of 8086/88 (preferably circuit but you can also use block diagram)
The simulator should also highlight the cycles or modules (like ALU,Memory etc.) used in
the current instruction.
##TABLE OF CONTENTS
* [Requirements](#Requirements)
* [8086 Information](#8086-information)
* [Instructions ](#Instructions)
* [File names and Details](#File-names-and-Details)
* [Structure](#Structure)
* [Outcomes](#Outcomes)
* [Increament in knowledge](#Increament-in-knowledge)

## Requirements
To understand this project, particularly the 8086 function and how it operates and the number of bits a register accepts, knowledge of Assembly programmes and compilers is essential. You need to learn the fundamentals of assembly language in order to understand this project.
## 8086 Information


• 8086Microprocessor is an enhanced version of 8085Microprocessor that was designed
by Intel in 1976.
• It is a 16-bitMicroprocessor having 20 address lines and16 data lines that provides up
to 1MB storage. It consists of powerful instruction set, which provides operations like
multiplication and division easily.
• It supports twomodes of operation, i.e. Maximum mode andMinimummode. Maximum
mode is suitable for system having multiple processors andMinimummode is
suitable for system having a single processor.
• It has an instruction queue, which is capable of storing six instruction bytes from the
memory resulting in faster processing.
• It was the first 16-bit processor having 16-bit ALU, 16-bit registers, internal data bus,
and 16-bit external data bus resulting in faster processing.


## File names and details:
The following is a list of filenames along with their description.

## Structure:

• Javascript.
• HTML
• CSS

## Instructions:
#### ROL
The left rotate instruction shifts all bits in the register or memory operand specified. The most significant bit is rotated to the carry flag,
the carry flag is rotated to the least significant bit position, all other bits are shifted to the left. 
The result does not include the original value of the carry flag.


#### ROR
ROR (short for "ROtate Right") is the mnemonic for a machine language instruction which "rotates" the bits in either the accumulator or a specified address in RAM, one bit position towards the "right", or least significant, "end" of the byte. The most significant bit, is set to the value in the carry flag. Similarly, what was the least significant bit in the byte prior to the shifting, will subsequently be "rotated" into the carry flag
    The negative flag is set if the result is negative, i.e. has its most significant bit set.
    The zero flag is set if the result is zero, or cleared if it is non-zero.
    The carry flag is set or cleared depending on the result.

#### SHR
The SHR (shift right) instruction performs a logical
right shift on the destination operand. The highest bit
position is filled with a zero

EXAMPLES:
mov dl,80
shr dl,1 ; DL = 40
shr dl,2 ; DL = 10

#### SHL
The SHL (shift left) instruction performs a logical left
shift on the destination operand, filling the lowest bit
with 0
OPERANDS TYPES:
SHL reg,imm8
SHL mem,imm8
SHL reg,CL
SHL mem,CL


#### INC

The IINC instruction increments a local variable. This instruction has two operands: 
a 1-byte unsigned offset and a 1-byte signed integer value.
The offset is added to the value in the LV register to determine the location of the variable that is to be incremented

#### DEC
The DEC instruction decrements the specified operand by 1. An original value of 00h underflows to 0FFh.
No flags are affected by this instruction. When this instruction is used to modify an output port, the value used as
the port data is read from the output data latch, not the pins of the port

#### NOT:
The NOT instruction implements the bitwise NOT operation. NOT operation reverses the bits in an operand.
The operand could be either in a register or in the memory.


#### AND:

The AND instruction is used for supporting logical expressions by performing bitwise AND operation.
The bitwise AND operation returns 1, if the matching bits from both the operands are 1, otherwise it returns 0


#### XOR
The XOR instruction performs a bit wise Exclusive OR operation between corresponding bits in the two operands and places
the result in the first operand. reg, mem, and immed can be 8, 16, or 32 bits. 
The XOR instruction can be used to reverse selected bits in an operand while preserving the remaining bits.



## Outcomes.

![output 3](https://user-images.githubusercontent.com/119393518/205508536-0f85950e-1749-4220-a45d-8b8837921ef1.PNG)


![output 4](https://user-images.githubusercontent.com/119393518/205508549-53450f01-2c2b-42fd-a244-7ba771b6d423.PNG)


![output no 1](https://user-images.githubusercontent.com/119393518/205508580-d5ca4186-b5e4-42a9-a692-8b4454625045.PNG)

![output no 2](https://user-images.githubusercontent.com/119393518/205508592-efa3dfc1-c5dc-48b9-9e9d-3242ccf99f45.PNG)



## Increament in knowledge:


Linking UI and code. Complex problem solving owing to problems that
developed during the creation of parsing and compiling. Github cooperation in group,
including installation, setup . 8086 memory and register addressing. 8086 machine code
generation for each instruction









