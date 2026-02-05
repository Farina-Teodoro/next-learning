import { NextRequest, NextResponse } from "next/server";

type ItemRequestBody = {
    name: string;
    age: number;
};

function createMessages(body: ItemRequestBody) {
    if (body.age == undefined || body.name == undefined) {
        throw new Error("payload invalid");
    }
    return `Name: ${body.name} - age: ${body.age}`;
}


export async function POST(req: NextRequest) {

    const body = await req.json();

    return NextResponse.json({ 
      message: 'Item created successfully', 
      data: createMessages(body) 
    }, { status: 201 });
 
}

export function GET() {
    return NextResponse.json({teo: 1})
}

//export function POST() {
//    return NextResponse.json({teo: 2})
//}
