import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { AuthService } from '../../auth-service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-otp-email',
  templateUrl: './otp-email.component.html',
  styleUrls: ['./otp-email.component.scss'],
})
export class OtpEmailComponent implements AfterViewInit {
  name: any = "ggg"; 
  disabled = true;
  isLoading = false;
isLoadingotp = false;
  code: string = '';

  num: { [key: number]: boolean } = {
    0: false,
    1: false,
    2: false,
    3: false
  };

  @ViewChildren(IonInput) inputs!: QueryList<IonInput>;

  constructor(private router: Router, private Service: AuthService,private alertController: AlertController) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputs.first.setFocus();
    }, 300);
  }

  onInputChange(event: any, index: number) {
    const input = event.target.value;


    this.num[index] = !!(input && input.trim() !== '');

   
    if (input && index < this.inputs.length - 1) {
      this.inputs.toArray()[index + 1].setFocus();
    }

   
    this.code = this.inputs
      .toArray()
      .map(inputEl => inputEl.value || '')
      .join('');

   
    this.validation();
  }

  validation() {
    const allFilled = this.num[0] && this.num[1] && this.num[2] && this.num[3];
    this.disabled = !allFilled;
    return allFilled ? 'login-button-activee' : 'login-button';
  }

  login() {
    this.isLoading = true;



    this.Service.verity_otp(this.Service.email, this.code).subscribe(
      (data: any) => {
        this.isLoading = false;
        if(this.Service.otp_number==0){this.router.navigate(['/new-password']);}else{this.router.navigate(['/home-page']);}
        this.name = data;
         console.log('data');
        console.log(data);
      },
      (e: HttpErrorResponse) => {
        this.isLoading = false;
        if(localStorage.getItem('lang')=='ar'){    this.name = e.error.arDescription;
        this.presentAlert();
        console.log(e.error.enDescription);}else{   this.name = e.error.enDescription;
       this.presentAlert();
        console.log(e.error.enDescription);}
    
      }
    );
  }
  otp(){
   this.isLoadingotp=true;
    this.Service.send_otp(this.Service.email).subscribe((data:any)=>{ this.isLoadingotp=false; this.router.navigate(['/otp-email']);
  },(e:any)=>{this.isLoadingotp=false;
 this.router.navigate(['/otp-email']);
    
   })
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
title() {
  if (localStorage.getItem('lang') === 'ar') {
    return { 'font-family': '"El Messiri", sans-serif' };
  } else {
    return { 'font-family': '"Lucida Console", Monaco, monospace' };
  }
}
}
/*otp(){
   this.isLoadingotp=true;
 const userData = localStorage.getItem('user');
    const userObject = JSON.parse(userData || '{}');
    this.Service.send_otp(userObject.email).subscribe((data:any)=>{this.isLoadingotp=false;
  console.log('data');    if(this.Service.otp_number==0){this.router.navigate(['/new-password']);}else{this.router.navigate(['/home-page']);}
  },(e:any)=>{this.isLoadingotp=false; console.log('e');

  
   })
}}*/