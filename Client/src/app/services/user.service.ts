import { Injectable } from '@angular/core';
import { UserInfo } from '../modals/user-info';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private restApiBaseUrl = environment.rest_url;
  private users: UserInfo[] = [];

  private dataSource = new BehaviorSubject<UserInfo[]>(this.users);
  data = this.dataSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserInfo[]> {
    this.http.get<UserInfo[]>(this.restApiBaseUrl+'/users/').subscribe(users => {
      this.users = users;
      this.dataSource.next(users);
    }, err => {
    });
    return this.data;
  }

  createUser(userInfo: UserInfo): Observable<UserInfo> {
    var subject = new Subject<UserInfo>();
    this.http.post<UserInfo>(this.restApiBaseUrl+'/users/', userInfo).subscribe(user => {
      this.users.push(user);
      this.dataSource.next(this.users);
      subject.next(user);
    }, err => {
      subject.error(err);
    }
    );
    return subject;
  }

  updateUser(userInfo: UserInfo): Observable<UserInfo> {
    var subject = new Subject<UserInfo>();
    this.http.put<UserInfo>(this.restApiBaseUrl+'/users/' + userInfo.id, userInfo).subscribe(user => {
      let index = this.users.map(x => x.id).indexOf(userInfo.id)
      this.users[index] = userInfo;
      this.dataSource.next(this.users);
      this.dataSource.next(this.users)
      subject.next(user);
    }, err => {
      subject.error(err);
    }
    );
    return subject;
  }

  deleteUser(userId): Observable<{}> {
    var subject = new Subject();
    this.http.delete<UserInfo>(this.restApiBaseUrl+'/users/' + userId).subscribe(data => {
      let index = this.users.map(x => x.id).indexOf(userId)
      this.users.splice(index, 1);
      this.dataSource.next(this.users)
      subject.next();
    }, err => {
      subject.error(err);
    }
    );
    return subject;
  }
}
