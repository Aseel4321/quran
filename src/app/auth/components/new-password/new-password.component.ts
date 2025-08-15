import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service/auth.service';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit{
text_password='';
Text:any='';
password_color='';
  initialHeight: number = window.innerHeight;
keyboardOpen: boolean = false;

private lockInProgress = false;
list_langPassword=localStorage.getItem('lang')=="ar"?["كلمه السر ضعيفه","قوه متوسطه","كلمه سر قويه","كلمه سر ممتازه"]:["Weak password",'Moderate strength','Strong password','Very strong password'];
list_langMatch=localStorage.getItem('lang')=="ar"?["كلمه المرور متطابقه","كلمه المرور غير متطابقه",]:["Not Matched Password",'Matched Password',];
  constructor(private screenOrientation: ScreenOrientation,private platform: Platform,private router: Router,private Service:AuthService) {}
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
  
    onKeyup_password(event:any){
  this.password= (event.target as HTMLInputElement).value;
  console.log(this.password);
    }
     onKeyup_repassword(event:any){
  this.repassword.text_password= (event.target as HTMLInputElement).value;
  this.password_match();
  console.log(this.password);
    }
      onKeyup_conpassword(event:any){
  this.conpassword.text_password= (event.target as HTMLInputElement).value;
  console.log(this.password);
    }
   
    password:any;
    password_bool:any=false;
     password_icon:string='eye-off-outline';
     password_type:string='password';
  
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
    list:boolean[]=[false,false,false,false];  
  login(){
    var user=localStorage.getItem('User');
     const user1 = JSON.parse(user);
     this.isLoading=true;  console.log(this.Service.email) ;
    this.Service.forgot_password({"emailOrPhone":this.Service.email,
  "newPassword": this.password,
  "confirmNewPassword": this.repassword.text_password}).subscribe((data:any)=>{
       this.isLoading=false;
   
     localStorage.setItem('login','true');
     localStorage.setItem('user', JSON.stringify(data));
       this.router.navigate(['/home-page']);
    },(e:any)=>{this.isLoading=false;
      
      console.log(e)})
   
   
     
   
   }
  
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
    return '#FFFF00'
  }else{return '#E5E4E2'}
          }else if(this.num.length==3){
  if(i<=2){
    return '#90EE90'
  }else{return '#E5E4E2'}
          }else if(this.num.length==4){
            if(i<=4){
    return '#006400'
  }else{return '#E5E4E2'}
          }
        }
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
  }
  onInputChange(event: any) {
    this.password=this.password = (event.target as HTMLInputElement).value;
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
    password_match(){
  if(this.password==''||this.repassword.text_password==''){this.text_password='';}
if(this.password==this.repassword.text_password){
  this.text_password=this.list_langMatch[0];
}else{this.text_password=this.list_langMatch[1];}
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
}
color_password() {
  if(this.password ==""&&this.repassword.text_password==''){
    this.text_password=' ';
  }else{ if (this.password === this.repassword.text_password) {
    return {
      color:  '#006400',       
              'align-items': 'center',
              'text-align': 'center',
         'font-size':'4vw '
         
       
      
    };
  } else {
    return {
      color: '#FF0000',       
       'align-items': 'center',
  'text-align': 'center',
  'font-size':'4vw '
         
        
    };
  }}
 
}
text_color() {
   if(this.num.length==0){
    
      }else{
if(this.num.length==1){

this.password_color="#FF0000";
}else if(this.num.length==2){
this.password_color='#FFFF00';
        }else if(this.num.length==3){
this.password_color='#FFFF00';
        }else if(this.num.length==4){
this.password_color='#006400';
        }
      }
}
title() {
  if (localStorage.getItem('lang') === 'ar') {
    return { 'font-family': '"El Messiri", sans-serif' };
  } else {
    return { 'font-family': '"Lucida Console", Monaco, monospace' };
  }
}

validation(){
 if(this.repassword.text_password!==''&&this.password!==""&&(this.repassword.text_password==this.password)&&this.num.length==5){return 'login-button-activee';}else{return 'login-button';}}

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
}
}
