import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.scss'],
})
export class ForgotPasswordEmailComponent {  
 disabled=true;
 name:any;
 email:string='';
  constructor(private router: Router,private Service:AuthService,private alertController: AlertController) {}
    isLoading:any=false;
  onKeyup_email(event: KeyboardEvent){
this.email = (event.target as HTMLInputElement).value;
console.log(this.email);
  }
  remove_email(){

    this.email='';
}
validation(){
  if(this.email!==''){this.disabled=false;
     return 'login-button-activee';
  }else{this.disabled=true; return 'login-button';}
}
otp(){
   this.isLoading=true;

    this.Service.send_otp(this.email).subscribe((data:any)=>{
   this.isLoading=false;console.log(data);
  },(e:HttpErrorResponse)=>{console.log('data');
   if(e.status===200){   localStorage.setItem('email',this.email); ;this.Service.otp_number=0;
    this.isLoading=false; this.router.navigate(['/otp-email']);}else{
     if(localStorage.getItem('lang')=='ar'){
      this.name=e.error.arDescription
      this.isLoading=false;
      this.presentAlert()
     }else{this.name=e.error.enDescription
      this.isLoading=false;
      this.presentAlert()}
      
    }
  
    
   })
}
async presentAlert() {
  const alert = await this.alertController.create({

    message: this.name,
    buttons: ['موافق']
  });

  await alert.present();
}
forgot_nav(){
  this.router.navigate(['/Forgot-Password-Phone']);
}
}
