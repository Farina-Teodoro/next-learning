import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient(
        {
            adapter: new PrismaPg({
                connectionString: process.env["DATABASE_URL"],
            })
        }
    )
    await prisma.$connect()
    const result = await prisma.user.findMany()
    return NextResponse.json(result)
}