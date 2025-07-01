import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { AlertController, Platform } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private Service:AuthService,private alertController: AlertController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(9999, () => {
    
  });
  }
  isLoading:any=false;
  name:any='aaa';
  password_bool:any=false;
  password_icon:string='eye-off-outline';
  password_type:string='password';
  loginData = {
    email: '',
    password: '',
    rememberMe: true
  };

remove(){

    this.loginData.email='';


}
forgot_nav(){
  this.router.navigate(['/Forgot-Password-Email']);
}
signup_nav(){
  this.router.navigate(['/signup']);
}
eye(){
if(this.password_bool==false){
  this.password_bool=true;
  this.password_icon='eye-outline';
  this.password_type='type';
}else{this.password_bool=false;
  this.password_type='password';
    this.password_icon='eye-off-outline';
}
}

  ngOnInit() {
    //localStorage.setItem('login',"true");
  }
//{"emailOrPhone":'aseelaleen@gmail.com',"password": "Aseel882000@"}
login() {
  this.isLoading = true;

  const loginPayload = {
    emailOrPhone: this.loginData.email,
    password: this.loginData.password
  };

  this.Service.login(loginPayload).subscribe(
    (data: any) => {
      this.isLoading = false;
      console.log(data);

      // Save user data to localStorage
      localStorage.setItem('user', 'true');
      localStorage.setItem('User', JSON.stringify(data));

      // Navigate to home page
      this.router.navigate(['/home-page']);
    },
    (error: HttpErrorResponse) => {
      this.isLoading = false;

      // Safe error message handling
      if(localStorage.getItem('lang')=='ar'){  this.name = error?.error?.arDescription;
      console.error(error.error);

      this.presentAlert();}else{this.name = error?.error?.enDescription;this.presentAlert(); }
    
    }
  );
}

  onLogin(form: any) {
    if (form.valid) {
      console.log('Login Data:', this.loginData);
     
    }
  }
  async presentAlert() {
    if(localStorage.getItem('lang')=='ar'){  const alert = await this.alertController.create({
    //header: 'aتنبيه',
    message: this.name,
    buttons: ['موافق']
  });await alert.present();}else{const alert = await this.alertController.create({
    //header: 'dddddd',
    message: this.name,
    buttons: ['ok']
  });await alert.present();}


  
}
}
