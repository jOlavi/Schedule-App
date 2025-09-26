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
        const { text, status, due_date } = body;

        const result = await pool.query(
            "UPDATE todos SET text = COALESCE($2, text), status = COALESCE($3, status), due_date = COALESCE($4, due_date) WHERE id = $1 RETURNING *",
            [id, text, status, due_date]
        );
        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json(result.rows[0], { status: 200 });
    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
