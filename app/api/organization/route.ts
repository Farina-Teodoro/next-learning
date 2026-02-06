import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const OrganizationSchema = z.object({
    name: z.string().regex(/^[a-zA-Z\s]+$/)
})

export async function POST(req: NextRequest, res: NextResponse) {
    const prisma = new PrismaClient({
        adapter: new PrismaPg({
            connectionString: process.env["DATABASE_URL"],
        })
    })
    await prisma.$connect()

    try {
        const data = OrganizationSchema.parse(await req.json())
        const result = await prisma.organization.create({ "data": data})
        return NextResponse.json({ data: result })
    } catch (error: any) {
        return NextResponse.json({ error: "user already exists" }, { status: 400 })
        }
    }