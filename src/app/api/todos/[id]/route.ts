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

export async function PATCH(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { text, status } = body;

        const result = await pool.query(
            "UPDATE todos SET text = $1, status = $2 WHERE id = $3 RETURNING *",
            [id, text, status]
        );
        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
