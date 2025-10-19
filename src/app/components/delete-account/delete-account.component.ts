import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { AlertController, Platform } from '@ionic/angular';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnInit {
name:any;
email:any;
isLoading:any=false;
password_bool:any=false;
password:any;
password_icon:string='eye-off-outline';
password_type:string='password';
  initialHeight: number = window.innerHeight;
keyboardOpen: boolean = false;
 isKeyboardOpen: boolean = false;

  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
private lockInProgress = false;
  constructor(private router: Router,private screenOrientation: ScreenOrientation,private platform: Platform,private service:MainServiceService,private alertController: AlertController) {}
goBack() {
  this.router.navigate(['/setting']);
}
  ngOnInit() {  this.lockInProgress = false;

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
   this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      this.isKeyboardOpen = true; // السماح بالتمرير
    });

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      this.isKeyboardOpen = false;
       const activeElement = document.activeElement as HTMLElement;
    if (activeElement && typeof activeElement.blur === 'function') {
      activeElement.blur();
    }
       // منع التمرير عند إغلاق الكيبورد
    });}
remove(){

    this.password='';
}
title() {
  if (localStorage.getItem('lang') === 'ar') {
    return { 'font-family': '"El Messiri", sans-serif' };
  } else {
    return { 'font-family': '"Lucida Console", Monaco, monospace' };
  }
}
delete(){const user = JSON.parse(localStorage.getItem('User'));
   this.isLoading=true;
  this.service.delete({
    "emailOrPhone":user.email,
    "password":this.password,
}).subscribe((data:any)=>{
    

  },(error: HttpErrorResponse)=>{this.isLoading=false;
    console.log(error?.error?.arDescription)
      if(localStorage.getItem('lang')=='ar'){  this.name = error?.error?.arDescription;
      console.error(error.error);

      this.presentAlert();}else{this.name = error?.error?.enDescription;this.presentAlert(); }
  });

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
login() {
  this.isLoading = true;

  /*const loginPayload = {
    emailOrPhone: this.loginData.email,
    password: this.loginData.password
  };

  this.Service.login(loginPayload).subscribe(
    (data: any) => {
      this.isLoading = false;
      console.log(data);

      localStorage.setItem('user', 'true');
      localStorage.setItem('User', JSON.stringify(data));

      this.router.navigate(['/home-page']);
    },
    (error: HttpErrorResponse) => {
      this.isLoading = false;

    
      if(localStorage.getItem('lang')=='ar'){  this.name = error?.error?.arDescription;
      console.error(error.error);

      this.presentAlert();}else{this.name = error?.error?.enDescription;this.presentAlert(); }
    
    }
  );*/
}async presentAlert() {
    if(localStorage.getItem('lang')=='ar'){  const alert = await this.alertController.create({
    message: this.name,
    buttons: ['موافق']
  });await alert.present();}else{const alert = await this.alertController.create({
    //header: 'dddddd',
    message: this.name,
    buttons: ['ok']
  });await alert.present();}


  
} style_image2() {
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
}
}
  
//npx cap open android
//// npx cap sync android
//ionic build
//ng serve --host 0.0.0.0 --port 4200