import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
// Handle DELETE request to delete a todo by ID
export async function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: Request, context: { params: { id: string } }) {}
