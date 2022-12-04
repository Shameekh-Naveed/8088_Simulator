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
* [increament in knowledge](#Increament in knwoledge)

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
Rotate Left is what the ROL instruction means. Depending on the count value, the bits in the
operand (register) are rotated left a certain number of places. Themost significant bit (MSB)
is rotated into the least significant bit (LSB) position throughout this process.
variations: reg, immediate
#### ROR
Rotate Right is referred to as a ROR instruction. Depending on the count value, the operand’s
contents are rotated right a certain number of places. The least significant bit (LSB) gets
relocated into themost significant bit’s (MSB) position since this instruction rotates the bits
to the right. variations: reg, immediate

#### SHR
Shift Right is referred to by the abbreviation SHR in the instruction. The SHR instruction
shifts the bits of the destination operand to the right by however many bits are specified in
the count operand, and it is zero-filled. variations: shl/shr reg, immediate value

#### SHL

Shift Left" is referred to as the SHL command. By inserting the same number of zeroes from
the right end, this instruction simply shifts the mentioned bits in the register to the left side
one by one. variations: shl/shr reg, immediate value


#### INC

To increase an operand by one, use the INC instruction. It operates on a single operand that
may be in memory or a register. Variations: Inc/Dec reg, Inc/Decmem(Memory in register
like [dx] but not like [00436h].)

#### DEC
The DEC instruction is used for decrementing an operand by one. Itworks on a single operand
that can be either in a register or in memory. Variations: Inc/Dec reg, Inc/Dec mem (Memory
in register like [dx] but not like [00436h].)

#### NOT:
NOT operation performs the 1s complement of the operand Variations: Not reg, Not mem


#### AND:

The AND instruction performs a Boolean (bitwise) AND operation between each pair of
matching bits in two operands and places the result in the destination operand. variations:
And reg,reg And reg,mem And reg,imm


#### XOR
Performs a bit-wise xor of the two operands, and stores the result in destination. variations:
Xor reg,reg, Xor mem,reg, Xor reg,mem, Xor reg,imm.



## Outcomes.

## Increament in knowledge:

Linking UI and code. Complex problem solving owing to problems that
developed during the creation of parsing and compiling. Github cooperation in group,
including installation, setup . 8086 memory and register addressing. 8086 machine code
generation for each instruction









