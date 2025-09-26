// File holds helper functions for API calls related to todos

// Utility function to update a todo by ID
export async function updateTodoApi(
    id: number,
    updates: { text?: string; status?: boolean; due_date?: string }
) {
    const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    return await response.json();
}
