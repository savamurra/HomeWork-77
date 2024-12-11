export interface Message {
    id: string;
    message: string;
    author?: string | null;
    image?: string | null;
}


export interface MessageMutation {
    message: string;
    author: string | null;
    image: File | null;
}