import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MainServiceService } from 'src/app/main-service/main-service.service';

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
  constructor(private service:MainServiceService,private alertController: AlertController) {}

  ngOnInit() {}
remove(){

    this.email='';
}
delete(){const user = JSON.parse(localStorage.getItem('User'));
   this.isLoading=true;
  this.service.delete({
    "emailOrPhone":user.email,
    "password":this.password,
}).subscribe((data:any)=>{
    

  },(error: HttpErrorResponse)=>{this.isLoading=false;
    console.log(error?.error?.arDescription)})
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


  
}
}
  
//npx cap open android
//// npx cap sync android
//ionic build
//ng serve --host 0.0.0.0 --port 4200