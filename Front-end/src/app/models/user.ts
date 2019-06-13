import { Message } from './message';

export class User {
    _id: string;
    firstname: string;
    lastname: string;
    streamUrl: string;
    dateJoined: Date;
    messages: Message[];
    viewers: number;
}

//currently a fictional model