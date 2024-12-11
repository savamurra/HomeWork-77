export interface Message {
    id: string;
    message: string;
    author: string | null;
    image: string | null;
}

export type MessageWithoutId = Omit<Message, 'id'>
