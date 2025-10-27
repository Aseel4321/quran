import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.scss'],
})
export class ForgotPasswordEmailComponent implements OnInit{  
 disabled=true;
 name:any;
 email:string='';  
 initialHeight: number = window.innerHeight;
keyboardOpen: boolean = false;
 
private lockInProgress = false;
  constructor(private screenOrientation: ScreenOrientation,private platform: Platform,private router: Router,private Service:AuthService,private alertController: AlertController) {}
   ngOnInit(): void {
  this.lockInProgress = false;

  this.platform.ready().then(() => {
    this.initialHeight = window.innerHeight; // حفظ الارتفاع الأصلي

    if (Capacitor.isNativePlatform() && !this.lockInProgress) {
      this.lockInProgress = true;
      setTimeout(() => {
        ScreenOrientation.lock({ orientation: 'portrait' })
          .then(() => console.log('Orientation locked'))
          .catch(err => console.error('Lock failed', err));
      }, 150);
    }

    window.addEventListener('resize', () => {
      const currentHeight = window.innerHeight;
      this.keyboardOpen = currentHeight < this.initialHeight - 100;

      const img = document.querySelector('.login-image2') as HTMLElement;
      if (img) {
        img.style.cssText = this.style_image2();
      }
    });
  });
}

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
}goBack() {
  this.router.navigate(['/login']);
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
style_image2() {
  if (this.keyboardOpen) {
    return 'display: none;';
  }

  const baseStyle = 'width: 100%; position: fixed; bottom: 0; z-index: 10;';
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + ' right: 0;';
  } else {
    return baseStyle + ' left: 0;';
  }
}title() {
  if (localStorage.getItem('lang') === 'ar') {
    return { 'font-family': '"El Messiri", sans-serif' };
  } else {
    return { 'font-family': '"Lucida Console", Monaco, monospace' };
  }
}
}
