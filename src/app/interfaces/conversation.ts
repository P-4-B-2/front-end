export interface Conversation {
    id: number,
    startDatetime: Date,
    endDatetime: Date,
    sentiment: number,
    summary: string;
}