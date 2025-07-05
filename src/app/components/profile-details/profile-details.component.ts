import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit{
profile:any={name:'',email:'',Phone:'',Password:'',Birthday_date:'',Gender:''}
isReadonly=true;
  constructor() { }
  ngOnInit(): void {
  const user = JSON.parse(localStorage.getItem('User'));
this.profile.name=user.fullName;
this.profile.email=user.email;
this.profile.phone=user.phone;
this.profile.Password=user.password;
this.profile.Birthday_date=user.dob;
this.profile.Gender=user.gender;
  }
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
 

}
