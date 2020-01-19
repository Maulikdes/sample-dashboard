import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserInfo } from '../modals/user-info';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-creator',
  templateUrl: './user-creator.component.html',
  styleUrls: ['./user-creator.component.css']
})
export class UserCreatorComponent implements OnInit {
  
  nameValidationFailed:boolean = false;
  emailValidationFailed:boolean = false;
  mobileValidationFailed:boolean = false;
  isEditor:boolean;

  @Input()
  user : UserInfo;
  
  userToUpdate : UserInfo;
  @Output() onSucessCallback: EventEmitter<any> = new EventEmitter();
  @Output() onFailedCallback: EventEmitter<any> = new EventEmitter();
  constructor(private userService : UserService) {
  }

  ngOnInit() {
    if(this.user){
      this.userToUpdate = Object.assign({}, this.user);
      this.isEditor = true;
    }else{
      this.userToUpdate = Object.assign({});
      // default values
      this.userToUpdate.role = 'Admin';
      this.userToUpdate.status = 'Pending';
    }
  }
  validateUser():boolean{
    if(this.userToUpdate.name==''){
      this.nameValidationFailed = true;
    }else{
      this.nameValidationFailed = false;
    }
    if(this.userToUpdate.email!=''){
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.emailValidationFailed =  !re.test(String(this.userToUpdate.email.toLowerCase()));
    }
    else{
      this.emailValidationFailed = true;
    }

    if(this.userToUpdate.mobile){
      if(this.userToUpdate.mobile.toString().length != 10){
        this.mobileValidationFailed = true;
      }else{
        this.mobileValidationFailed = false;
      }
    }else{
      this.mobileValidationFailed = false;
    }

    if(this.nameValidationFailed || this.mobileValidationFailed || this.emailValidationFailed ){
      return false;
    }else{
      return true;
    }
  }

  onCreateClick():void {
    if(this.validateUser()){
      let successCallback = this.onSucessCallback;
      let failCallback = this.onFailedCallback;
      if(this.isEditor){
        this.userService.updateUser(this.userToUpdate).subscribe(data => {
          successCallback.emit();
          },
          err =>{
            failCallback.emit();
          }
        );
      }
      else{ 
        this.userService.createUser(this.userToUpdate).subscribe(data => {
            successCallback.emit();
          },
          err =>{
            failCallback.emit();
          }
        );
      }
    }
  }
}
