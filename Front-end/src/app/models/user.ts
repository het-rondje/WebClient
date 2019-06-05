import { Stream } from "./stream";

export class User {
    id: number;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    token: string;
    stream: Stream;
    birthDate: Date;
    dateJoined: Date;
}

//currently a fictional model