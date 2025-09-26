import pool from "@/app/lib/db";
import { ca } from "date-fns/locale";

import { NextResponse } from "next/server";

// Handle GET request to fetch all todos
export async function GET() {
    try {
        const { rows } = await pool.query("SELECT * FROM todos");
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
// Handle POST request to create a new todo
// This function expects a JSON body with 'text' and 'status' fields
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { text, status } = body;

        const result = await pool.query(
            "INSERT INTO todos (text, status) VALUES ($1, $2) RETURNING *",
            [text, status]
        );
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
