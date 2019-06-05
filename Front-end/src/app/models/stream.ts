import { Message } from "./message";
import { User } from "./user";

export class Stream {
    id: number;
    title: string;
    streamUrl: string;
    description: string;
    messages: Message[];
    viewers: User[];
}

//currently a fictional model