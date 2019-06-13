import { User } from "./user";

export class Message {
    user: User;
    text: string;
    timePosted: Date;
    roomId: string;
}

//currently a fictional model