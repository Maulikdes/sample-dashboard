import { Injectable } from '@angular/core';
import { UserInfo } from '../modals/user-info';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: UserInfo[] = [];

  private dataSource = new BehaviorSubject<UserInfo[]>(this.users);
  data = this.dataSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getUsers():Observable<UserInfo[]>{
    this.http.get<UserInfo[]>('http://localhost:3000/users').subscribe(users => {
    this.users = users;  
    this.dataSource.next(users);
    });
    return this.data;
  }

  createUser(userInfo:UserInfo):Observable<UserInfo>{
    let id = this.users[this.users.length-1].id + 1;
    userInfo.id = id;
    this.users.push(userInfo);
    this.http.post<UserInfo>('http://localhost:3000/users',  userInfo).subscribe( user =>
      this.dataSource.next(this.users)
    );  
    return of(userInfo);
  }

  updateUser(userInfo:UserInfo):Observable<UserInfo>{
    console.log(this.users)
    let index = this.users.map( x => x.id).indexOf(userInfo.id)
    this.users[index] = userInfo;
    this.dataSource.next(this.users);
    this.http.put<UserInfo>('http://localhost:3000/users/'+userInfo.id,  userInfo).subscribe( user =>
      this.dataSource.next(this.users)
    );  
    return of(userInfo);
  }

  deleteUser(userId):Observable<{}>{
    let index = this.users.map( x => x.id).indexOf(userId)
    this.users.splice(index,1);
    this.http.delete<UserInfo>('http://localhost:3000/users/'+userId).subscribe( user =>
      this.dataSource.next(this.users)
    );
    return of({});  
  }
}
