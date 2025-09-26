export interface TodoType {
    id: number;
    text: string;
    status: boolean;
    created_at: Date | string;
    due_date?: Date | string;
}
