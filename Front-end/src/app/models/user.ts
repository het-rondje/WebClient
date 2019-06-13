import { Message } from './message';

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    streamUrl: string;
    dateJoined: Date;
    messages: Message[];
    viewers: number;
}

//currently a fictional model