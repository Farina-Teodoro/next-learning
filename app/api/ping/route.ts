import { NextResponse } from "next/server";
import { Client } from 'pg'



export async function GET() {
    const client = new Client({connectionString:"postgres://postgres:postgres@localhost:5432/postgres"});
    await client.connect()
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    await client.end()
    return NextResponse.json({ message: res.rows[0].message })
}

