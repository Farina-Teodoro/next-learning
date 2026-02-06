import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/)
})

export async function POST(req: NextRequest, res: NextResponse) {
    const prisma = new PrismaClient({
        adapter: new PrismaPg({
            connectionString: process.env["DATABASE_URL"],
        })
    })
    await prisma.$connect()

    try {
        const data = LoginSchema.parse(await req.json())
        const result = await prisma.user.create({ data })
        return NextResponse.json({ data: result })
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: JSON.parse(error.message) }, { status: 400 })
        }
        return NextResponse.json({ error: "user already exists" }, { status: 400 })
    }
}
