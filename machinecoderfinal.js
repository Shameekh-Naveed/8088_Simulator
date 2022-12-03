str1="mov ax,50"
str1=str1.toUpperCase()
query=str1.split(/[ ,]+/);
let B3216=["EAX","EBX","ECX","EDX","AX","BX","CX","DX","BP","SI","DI"]
let B8=["AL","AH","BH","BL","CH","CL","DH","DL"]

let formats=["OP","D","W","MOD","REG","R/M","Disp","Imm"]

let REG1={"AL":"000","CL":"001","DL":"010","BL":"011","AH":"100","CH":"101","DH":"110","BH":"111"}

let REG2={"AX":"000","CX":"001","DX":"010","BX":"011","SP":"100","BP":"101","SI":"110","DI":"111"}

let RM00={"[BX+SI]":"000","[BX+DI]":"001","[BP+SI]":"010","[BP+DI]":"011","[SI]":"100","[DI]":"101","[DIRECT]":"110","[BX]":"111"}

let RM01={"[BX+SI+D8]":"000","[BX+DI+D8]":"001","[BP+SI+D8]":"010","[BP+DI+D8]":"011","[SI+D8]":"100","[DI+D8]":"101","[BP+D8]":"110","[BX+D8]":"111"}

let RM10={"[BX+SI+D16]":"000","[BX+DI+D16]":"001","[BP+SI+D16]":"010","[BP+DI+D16]":"011","[SI+D16]":"100","[DI+D16]":"101","[BP+D16]":"110","[BX+D16]":"111"}

let MOD={"NO":"00","8B":"01","16B":"10","REG":"11"}

let opcode1={"MOV":"100010"}
let opcode2={"INC":"100011","ADD":"100101","SUB":"100110","DEC":"100111","CMP":"100100","OR":"101000","AND":"101001","XOR":"101010"}

let HEX={"0":"0000","1":"0001","2":"0010","3":"0011","4":"0100","5":"0101","6":"0110","7":"0111","8":"1000","9":"1001","A":"1010","B":"1011","C":"1100","D":"1101","E":"1110","F":"1111"}
let RPM=["BX","SI","DI","BP"]



let findD=()=>
{
    if (query[1][0]=="[")
    {
        formats[1]="0"
    }
    else
    {
        formats[1]="1"
    }
}


let findW=()=>
{
    for (i of B3216)
    {
        if (query[1].search(i)!=-1 || query[2].search(i)!=-1)
        {
            formats[2]="1"
            break
        }
    }
    if (formats[2]=="W")
    {
        for (i of B8)
        {
            if (query[1].search(i)!=-1 || query[2].search(i)!=-1)
            {
                formats[2]="0"
                break
            }
        }
    }
}


let Immediate=()=>
{
    if (query[2][0]!="[" && !(["X","H","L","I","P"].includes(query[2][query[2].length-1].toUpperCase())))
    {
        if (formats[2]=="0" && (query[2].length)>=3 && query[1][0]=="[")
        {
            return false
        }
        else
        {
            formats[7]=""
            for (i of query[2])
            {

                formats[7]=formats[7].concat(HEX[i])
            }
            return true;
        }
    }

    return true
}



let findMOD=()=>
{
    count=-1
    msg=false
    for (i of query)
    {
        count+=1
        if (i[0]=="[")
        {
            msg=true
            break
        }
    }
    if (msg)
    {
        temp=query[count].slice(1,query[count].length-1)
        let msg2=false;
        for (i in temp)
        {
            if (temp[i]=="+")
            {
                msg2=true
                break
            }
        }
        if (msg2)
        {
            q1=temp.split("+")
            if (RPM.includes(q1[q1.length-1]))
            {
                formats[3]=MOD["NO"]
            }
            else
            {
                if ((q1[q1.length-1].trimStart("0")).length==2)
                {
                    formats[3]=MOD["8B"]
                }
                else
                {
                    formats[3]=MOD["16B"]
                }
                if (!RPM.includes(q1[q1.length-1]))
                {
                    formats[6]=""
                    let n=q1[q1.length-1].trimStart("0")
                    for (i in n)
                    {
                        try
                        {
                            if (HEX[n[i]]==undefined)
                            {
                                throw new Error("Not found")
                            }
                            formats[6]+=HEX[n[i]]
                        }
                        catch
                        {
                            formats[6]="Disp"
                            return false
                        }
                    }
                }
            }
        }
        else
        {
            formats[3]=MOD["NO"]
        }
    }
    else
    {
        formats[3]=MOD["REG"]
    }
    return true
}

let if11=()=>
{
    if (formats[2]=="0")
    {
        try
        {
            if (REG1[query[2]]==undefined)
            {
                throw new Error("Out of Range")
            }
            formats[5]=REG1[query[2]]
        }
        catch
        {
            formats[5]="000"
        }
    }
    if (formats[2]=="1")
    {
        formats[4]=REG2[query[1]]
        try{
            if (REG2[query[2]]==undefined)
            {
                throw new Error("Not Found")
            }
            formats[5]=REG2[query[2]]
        }
        catch{
            formats[5]="000"
        }
    }
    return true;
}

let findOP=()=>
{
    try
    {
        if (opcode1[query[0]]==undefined)
        {
            throw new Error("Not Found")
        }
        formats[0]=opcode1[query[0]]
    }
    catch
    {
        try
        {
            if (opcode2[query[0]]==undefined)
            {
                throw new Error("Not found")
            }
            formats[0]=opcode2[query[0]]
        }
        catch
        {
            return false
        }
    }
    return true
}

let ifnot11=()=>
{
    if (formats[1]=="0")
    {
        mem=query[1]
        reg=query[2]
    }
    else
    {
        mem=query[2]
        reg=query[1]
    }
    if ((formats[7]!="Imm" && formats[1]=="1") || formats[7]=="Imm")
    {
        if (formats[2]=="1")
        {
            formats[4]=REG2[reg]
        }
        else
        {
            formats[4]=REG1[reg]
        }
    }
    if ((formats[7]!="Imm" && formats[1]=="0") || formats[7]=="Imm")
    {
        q1=mem.slice(1,mem.length-1).split("+")
        if (formats[3]=="00")
        {
            try
            {
                if (RM00[mem]==undefined)
                {
                    throw new Error("Not Found")
                }
                formats[5]=RM00[mem]
            }
            catch
            {
                formats[5]=RM00["[DIRECT]"]
                formats[6]=mem.slice(1,mem.length-1)+"H"
            }
        }
        else if(formats[3]=="01")
        {
            try
            {
                if (RM01[mem])
                {
                    throw new Error("Not Found")
                }
                formats[5]=RM01[mem]
            }
            catch
            {
                try
                {
                    q1[q1.length-1]="D8"
                    mem=q1.join("+")
                    if (RM01[`[${mem}]`]==undefined)
                    {
                        throw new Error('Not Found')
                    }
                    formats[5]=RM01[`[${mem}]`]
                }
                catch
                {
                    return false;
                }
            }
        }
        else
        {
            try
            {
                if (RM10[mem]==undefined)
                {
                    throw new Error("Not Found")
                }
                formats[5]=RM10[mem]
            }
            catch
            {
                try
                {
                    q1[q1.length-1]="D16"
                    mem=q1.join("+")
                    if (RM10[`[${mem}]`]==undefined)
                    {
                        throw new Error('Not Found')
                    }
                    formats[5]=RM10[`[${mem}]`]
                }
                catch
                {
                    return false;
                }
            }
        }
    }
    return true
}

let error=()=>
{
    if (query[2][0]=="[" && query[1][0]=="[")
    {
        return false
    }
    if (query[2][0]!="[" && query[1][0]!="[")
    {
        if (B3216.includes(query[1]))
        {   
            if (query[2] in B8)
            {
                console.log("Different Size registers Not supported")
                return false
            }
        }   
    }
    elif (B8.includes(query[1]))
    {
        if (B3216.includes(query[2]))
        {
            console.log("Different Size registers Not supported")
            return false
        }
    }
}


let machinecode=()=>
{
    let t=findOP()
    if (t)
    {
        findD()
        findW()
        torf=findMOD();
        if (torf)
        {
            ques=Immediate()
            if (ques)
            {
                if (formats[3]=="11")
                {
                    q1=if11()
                }
                else
                {
                    q1=ifnot11()
                }
                if (formats[4]=="REG")
                {
                    formats[4]="000"
                }
                if (formats[5]=="R/M")
                {
                    formats[5]="000"
                }
                if (formats)
                if (q1)
                {
                    mem={OPCODE:"",D:"",W:"",MOD:"",REM:"",RM:"",DISP:"",IMM:""}
                    let count=0
                    for (i in mem)
                    {
                        mem[i]=formats[count]
                        count+=1
                    }
                    return mem
                }
                else
                {
                    return false
                }
            }
            else
            {
                return false
            }
        }
        else
        {
            return false
        }
    }
    else
    {
        return false
    }
}

console.log(machinecode())
