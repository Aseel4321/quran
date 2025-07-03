import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.scss'],
})
export class RestPasswordComponent implements OnInit {
constructor(private router: Router,private Service:AuthService) {}
  isLoading:any=false;
  password_color='';
list_langMatch=localStorage.getItem('lang')=="ar"?["أ","ب",]:["a",'b',];
  onKeyup_password(event:any){
this.password= (event.target as HTMLInputElement).value;
console.log(this.password);
  }
   onKeyup_repassword(event:any){
this.repassword.text_password= (event.target as HTMLInputElement).value;
console.log(this.password);
  }
    onKeyup_conpassword(event:any){
this.conpassword.text_password= (event.target as HTMLInputElement).value;
console.log(this.conpassword.text_password);
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
   list_langPassword=localStorage.getItem('lang')=="ar"?["أ","ب","ت","ث"]:["a",'b','c','d'];
num:boolean[]=[];  
text_password=''
    list:boolean[]=[false,false,false,false]; 
     Text =''
login(){
  const userString = localStorage.getItem('User');
const user = userString ? JSON.parse(userString) : null;
   this.isLoading=true;
   this.Service. rest_password({"emailOrPhone":user.email, "oldPassword":this.conpassword.text_password,"newPassword":this.password,"confirmNewPassword":this.repassword.text_password}).subscribe((data:any)=>{
   this.isLoading=false;
   console.log(data) ;
  },(e:any)=>{this.isLoading=false;
    
    console.log(e)})
 
 
   
 
 }
  ngOnInit() {}
    color(i:any){
      if(this.num.length==0){
        return '#E5E4E2'
      }else{
if(this.num.length==1){
if(i==0){
  return '#FF0000'
}else{return '#FFFFFF'}
}else if(this.num.length==2||this.num.length==3){
if(i<=1){
  return '#FFFF00'
}else{return '#FFFFFF'}
        }else if(this.num.length==4){
if(i<=2){
  return '#90EE90'
}else{return '#FFFFFF'}
        }else if(this.num.length==5){
          if(i<=4){
  return '#006400'
}else{return '#FFFFFF'}
        }
      }
    }eye(){
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
}  onInputChange(event: any) {
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
    }color_password() {
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
validation(){
 if(this.repassword.text_password!==''&&this.conpassword.text_password!==""&&(this.repassword.text_password==this.password)&&this.num.length==5&&this.password!==''){return 'login-button-activee';}else{return 'login-button';}}
}
