import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { AlertController, Platform } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.scss'],
})
export class RestPasswordComponent implements OnInit {
constructor(private alertController: AlertController,private router: Router,private Service:AuthService,private platform: Platform) {}
  isLoading:any=false;
    disabled=true;
    name:any='';
    
  password_color='';
list_langPassword=localStorage.getItem('lang')=="ar"?["كلمه السر ضعيفه","قوه متوسطه","كلمه سر قويه","كلمه سر ممتازه"]:["Weak password",'Moderate strength','Strong password','Very strong password'];
list_langMatch=localStorage.getItem('lang')=="ar"?["كلمه المرور متطابقه","كلمه المرور غير متطابقه",]:['Matched Password',"Not Matched Password"];
  /*onKeyup_password(event:any){
this.password.text_password= (event.target as HTMLInputElement).value;
console.log(this.password);
  }*/
   onKeyup_password(event:any){
this.password.text_password= (event.target as HTMLInputElement).value;
console.log(this.password);
  }
    onKeyup_conpassword(event:any){
this.conpassword.text_password= (event.target as HTMLInputElement).value;
this.password_match();
console.log(this.conpassword.text_password);
  }
  
 
password:any={ 
  password_bool:false,
   password_icon:'eye-off-outline',
   password_type:'password',
   text_password:""}
  repassword:any={
   password_bool:false,
   password_icon:'eye-off-outline',
 password_type:'password',
   text_password:""
   }
     conpassword:any={
   password_bool:false,
   password_icon:'eye-off-outline',
   password_type:'password',
   text_password:""
   }

num:boolean[]=[];  
text_password=''
    list:boolean[]=[false,false,false,false]; 
     Text =''
update(){
  const userString = localStorage.getItem('User');
const user = userString ? JSON.parse(userString) : null;
   this.isLoading=true;
   this.Service. rest_password({"emailOrPhone":user.email, "oldPassword":this.password.text_password,"newPassword":this.repassword.text_password,"confirmNewPassword":this.conpassword.text_password}).subscribe((data:any)=>{
        
   this.isLoading=false;if(localStorage.getItem('lang')=='ar'){this.name="تم تغيير كلمة السر بنجاح"}else{this.name="Password changed successfully"} 
   
   console.log(data) ;
  this.presentAlert();
  
  },(error: HttpErrorResponse)=>{this.isLoading=false;
       if(localStorage.getItem('lang')=='ar'){  this.name = error?.error?.arDescription;
      

      this.presentAlert();}else{this.name = error?.error?.enDescription;this.presentAlert(); }
    console.log(error)})
 
 
   
 
 }
 
  ngOnInit() {}
    color(i:any){
      if(this.num.length==0){
        return '#E5E4E2'
      }else{
if(this.num.length==1){
if(i==0){
  return '#FF0000'
}else{return '#E5E4E2'}
}else if(this.num.length==2){
if(i<=1){
  return '#b4b42aff'
}else{return '#E5E4E2'}
        }else if(this.num.length==3){
if(i<=2){
  return '#90EE90'
}else{return '#E5E4E2'}
        }else if(this.num.length==4){
          if(i<=4){
  return '#006400'
}else{return  '#E5E4E2'}
        }
      }
    }
    eye(){
if(this.password.password_bool==false){
  this.password.password_bool=true;
  this.password.password_icon='eye-outline';
  this.password.password_type='type';
}else{this.password.password_bool=false;
  this.password.password_type='password';
    this.password.password_icon='eye-off-outline';
}
}
re_eye(){
if(this.repassword.password_bool==false){
  this.repassword.password_bool=true;
  this.repassword.password_icon='eye-outline';
  this.repassword.password_type='type';
}else{this.repassword.password_bool=false;
  this.repassword.password_type='password';
    this.repassword.password_icon='eye-off-outline';
}
}
con_eye(){
if(this.conpassword.password_bool==false){
  this.conpassword.password_bool=true;
  this.conpassword.password_icon='eye-outline';
  this.conpassword.password_type='type';
}else{this.conpassword.password_bool=false;
  this.conpassword.password_type='password';
    this.conpassword.password_icon='eye-off-outline';
}
}  onInputChange(event: any) {
    this.repassword.text_password = (event.target as HTMLInputElement).value;
    console.log(this.repassword.text_password);
  this.num.length=0;
  this.list[0] = /(?=.*[a-z])(?=.*[A-Z])/.test(event.target.value);
  this.list[1] = /\d/.test(event.target.value);
  this.list[2] = /[!@#$%^&*(),.?":{}|<>]/.test(event.target.value); 
 this.list[3] = event.target.value.length>8;
 for(let i=0;i<this.list.length;i++){
    if(this.list[i]===true){
      this.num.push(true)  
    }
    }this.password_match();
    this.text();
    this.text_color(); 
    }
    
text() {
   if(this.num.length==0){
    this.Text='';
      }else{
if(this.num.length==1){
this.Text=this.list_langPassword[0];

}else if(this.num.length==2){
this.Text=this.list_langPassword[1];
        }else if(this.num.length==3){
this.Text=this.list_langPassword[2];
        }else if(this.num.length==4){
this.Text=this.list_langPassword[3];
        }
      }
}goBack() {
  this.router.navigate(['/home-page']);
}
text_color() {
   if(this.num.length==0){
    
      }else{
if(this.num.length==1){

this.password_color="#FF0000";
}else if(this.num.length==2){
this.password_color='#b4b42aff';
        }else if(this.num.length==3){
this.password_color='#90EE90';
        }else if(this.num.length==4){
this.password_color='#006400';
        }
      }
}
validation(){
 if(this.repassword.text_password!==''&&this.conpassword.text_password!==""&&(this.repassword.text_password==this.conpassword.text_password)&&this.num.length==4&&this.password.text_password!==''){this.disabled=false; return 'login-button-activee';}else{this.disabled=true; return 'login-button';}}
    async presentAlert() {
    if(localStorage.getItem('lang')=='ar'){ 
    const alert = await this.alertController.create({
   
    message: this.name,
     buttons: [
    {
      text: 'موافق',
      handler: () => {if(this.name=='تم تغيير كلمة السر بنجاح'){ this.router.navigate(['/home-page']);
  }else{}
   
     
      }
    }
  ]
  });await alert.present();}else{
 
    const alert = await this.alertController.create({
   
    message: this.name,
     buttons: [
    {
      text: 'OK',
      handler: () => {if(this.name=='Password changed successfully'){  
 this.router.navigate(['/home-page']);
        }else{}
   
     
      }
    }
  ]
  });await alert.present();}


  
}
password_match(){
  if(this.conpassword.text_password==''||this.repassword.text_password==''){this.text_password='';}else
if(this.conpassword.text_password==this.repassword.text_password){
  console.log('yes');
  this.text_password=this.list_langMatch[0];
}else{this.text_password=this.list_langMatch[1];}
}
color_password() {
  if(this.conpassword.text_password ==""&&this.repassword.text_password==''){
    this.text_password=' ';
  }else{ if (this.conpassword.text_password === this.repassword.text_password) {
    return {
      color:  '#006400',       
              'align-items': 'center',
              'text-align': 'center',
         'font-size':'2vw '
         
       
      
    };
  } else {
    return {
      color: '#FF0000',       
       'align-items': 'center',
  'text-align': 'center',
  'font-size':'2vw '
         
        
    };
  }}
 
}
title() {
 
return this.Service.title();
  
}
}
