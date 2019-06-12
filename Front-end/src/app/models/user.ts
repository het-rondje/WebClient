import { Message } from './message';

export class User {
    id: number;
    firstname: string;
    lastname: string;
    streamUrl: string;
    birthDate: Date;
    dateJoined: Date;
    messages: Message[];
    viewers: User[];
}

//currently a fictional model