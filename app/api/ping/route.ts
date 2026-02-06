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
    const result = await prisma.$queryRaw<{ message: string }[]>`SELECT 'Hello world!' as message`;
    return NextResponse.json({ message: result[0].message })
}

