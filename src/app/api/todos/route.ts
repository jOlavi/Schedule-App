import pool from "@/app/lib/db";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { rows } = await pool.query("SELECT * FROM todos");
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
