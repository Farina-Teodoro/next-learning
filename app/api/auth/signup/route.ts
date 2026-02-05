import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/)
})

// const data = {
//     email: "teo@email.com",
//     password: "Teodoro17"
// }

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const data = LoginSchema.parse(await req.json())
    return NextResponse.json({data})
    } catch (error: any) {
        return NextResponse.json({ error: JSON.parse(error.message)}, {status: 400})
    }
} 



// export function POST(){
//     const login: Login = LoginSchema.parse(data);
//     return NextResponse.json({login})
// }


// const validationResult = LoginSchema.safeParse(data)
// export function POST(){
//     return NextResponse.json({validationResult})
// }


// async function createLogin(req: Request, res: Response): Promise<void> {
//   const data: Login = LoginSchema.parse(req.body);
//   const newLogin = await saveLogin(data);
//   res.json(newLogin);
// }

