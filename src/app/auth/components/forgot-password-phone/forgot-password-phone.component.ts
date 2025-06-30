import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-forgot-password-phone',
  templateUrl: './forgot-password-phone.component.html',
  styleUrls: ['./forgot-password-phone.component.scss'],
})
export class ForgotPasswordPhoneComponent  {
isLoadingotp:any=false;
constructor(private router: Router, private Service: AuthService,private alertController: AlertController) {}
 email:string='';
 name:any;
 phoneNumber = '';
selectedCountryCode = '+962';
  onKeyup_email(event: KeyboardEvent){
this.email = (event.target as HTMLInputElement).value;
console.log(this.email);
  }  countries = [
    { name: 'السعودية', dial_code: '+966' },
    { name: 'مصر', dial_code: '+20' },
    { name: 'الإمارات', dial_code: '+971' },
    { name: 'الأردن', dial_code: '+962' }
    // يمكنك إزالة التكرار من قائمة الدول
  ];
  remove_email(){

    this.email='';
}
validation(){
  if(this.phoneNumber!==''){
     return 'login-button-activee';
  }else{return 'login-button';}
 
}
onKeyup_phone(event:any){
this.phoneNumber= (event.target as HTMLInputElement).value;
console.log(this.phoneNumber);
  }
 onCountryChange(event: any) {
  this.selectedCountryCode= (event.target as HTMLInputElement).value;
  console.log('تم تغيير رمز الدولة إلى:', this.selectedCountryCode);
}
otp() {console.log('ddd');
  this.isLoadingotp = true;

  this.Service.send_otp(this.email).subscribe(
    (data: any) => {
      console.log('OTP sent successfully');

      // Save email to the service for later use
      this.Service.email = this.email;

      this.isLoadingotp = false;

      // Navigate to OTP verification page
      this.router.navigate(['/otp-email']);
    },
    (error: HttpErrorResponse) => { console.error('OTP Error:','ssssssssssssss');
      this.isLoadingotp = false;

      // Safe error message handling
      this.name = error?.error?.enDescription || 'An error occurred while sending OTP';

     

      // Save email even if there was an error (if needed for retry)
      this.Service.email = this.email;

 
    }
  );
}
title() {
  if (localStorage.getItem('lang') === 'ar') {
    return { 'font-family': '"El Messiri", sans-serif' };
  } else {
    return { 'font-family': '"Lucida Console", Monaco, monospace' };
  }
}
 /*async presentAlert() {
    if(localStorage.getItem('lang')=='ar'){  const alert = await this.alertController.create({
    //header: 'aتنبيه',
    message: this.name,
    buttons: ['موافق']
  });await alert.present();}else{const alert = await this.alertController.create({
    //header: 'dddddd',
    message: this.name,
    buttons: ['ok']
  });await alert.present();}


 
}*/
}
