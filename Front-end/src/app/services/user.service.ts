import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const URL = "http://localhost:3000/api/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
getUsers() {
  return this.http.get(URL)
}

getUser(id: String) {
  return this.http.get(URL+ "/"+ id)
}
}
