import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit { isModalOpen = false;

  constructor(
    private router: Router,
    private Service: AuthService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        console.log('زر الرجوع معطّل في هذه الصفحة');
      });
    });}

list_langPassword=localStorage.getItem('lang')=="ar"?["كلمه السر ضعيفه","قوه متوسطه","كلمه سر قويه","كلمه سر ممتازه"]:["Weak password",'Moderate strength','Strong password','Very strong password'];
list_langMatch=localStorage.getItem('lang')=="ar"?["كلمه المرور متطابقه","كلمه المرور غير متطابقه",]:["Not Matched Password",'Matched Password',];
list_langCountries=localStorage.getItem('lang')=="ar"?["ا"]:["a"];
  disabled=true;
  Text_color="";
  name:string='';
  Text:any='';
   text_password='';
   text_numpassword="";
   phonenumber='';
  password_color='';
  selectedGender: string = 'male'; 
  isLoading:any=false;
 dateOfBirth: string | null = null;
  password_bool:any=false;
  password_icon:string='eye-off-outline';
  password_type:string='password';
  repassword_bool:any=false;
  repassword_icon:string='eye-off-outline';
  repassword_type:string='password';
  email:string='';
  dob: any;
  repassword:any='';
  booll:string="male"
password11:any;
password:string='';
img:string='assets/icon/man1.png';
   dob1: string='تاريخ الميلاد';
  today: string;
  birthDate: string = 'NaN-NaN-NaN';  // التاريخ المختار كـ نص
  selectedCountryCode = '+962';
  phoneNumber = '';
  gender: string = 'MALE';
  showPassword = false;
  showConfirm = false;
  list:boolean[]=[false,false,false,false];
  num:boolean[]=[];
  countries = [
    {name:this.list_langCountries[0],flag: "assets/icon/man1.png", dial_code: '+962' },
  
    
  ];
remove(){
 this.dob1=''; 
}
signup(){
   this.isLoading=true;
  this.Service.signup({
    "fullName":this.name,
    "email":this.email,
    "phone":this.phoneNumber,
    "dob":this.birthDate,
    "gender":this.gender,
    "password":this.password,
    "confirmPassword":this.repassword
   
}).subscribe((data:any)=>{
    localStorage.setItem('User',JSON.stringify(data));
    this.Service.send_otp(this.email).subscribe((data:any)=>{ this.isLoading=false;
   this.Service.otp_number=1;
  },(e:any)=>{this.isLoading=false;
    this.router.navigate(['/otp-email']);
    console.log(e)})
  },(e:any)=>{this.isLoading=false;
    console.log(e)})
 }

     
 
 
   
 

  rectangles = [
    { id: 1, color: 'red' },
    { id: 2, color: 'blue' },
    { id: 3, color: 'green' },
    { id: 4, color: 'orange' },
    { id: 5, color: 'purple' }
  ];

  onKeyup_password(event:any){
this.password= (event.target as HTMLInputElement).value;
this.password_match();
console.log(this.password);
  }
   onKeyup_name(event:any){
this.name= (event.target as HTMLInputElement).value;
this.password_match();

  }
 onKeyup_repassword(event:any){
this.repassword= (event.target as HTMLInputElement).value;
this.password_match();
console.log(this.repassword);
  }
  onKeyup_phone(event:any){
const phoneNumber1= (event.target as HTMLInputElement).value;
console.log(this.selectedCountryCode);
this.phoneNumber = this.selectedCountryCode + phoneNumber1;
console.log(this.phoneNumber);
this.phonenumber=phoneNumber1;
  }
 onCountryChange(event: any) {
  this.selectedCountryCode= (event.target as HTMLInputElement).value;
  console.log('تم تغيير رمز الدولة إلى:', this.selectedCountryCode);
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
eye_repassword(){
if(this.repassword_bool==false){
  this.repassword_bool=true;
  this.repassword_icon='eye-outline';
  this.repassword_type='type';
}else{this.repassword_bool=false;
  this.repassword_type='password';
    this.repassword_icon='eye-off-outline';
}
}
  onKeyup_email(event: KeyboardEvent){
this.email = (event.target as HTMLInputElement).value;
console.log(this.email);
  }onKeyup_date(event:any){
this.dob== (event.target as HTMLInputElement).value;
console.log(this.dob);
  }
  remove_email(){

    this.email='';


}
 remove_phone(){

    this.phonenumber='';


}
 remove_name(){

    this.name='';


}
  ngOnInit() {
    
    //const now = new Date();
    //this.today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    //this.dob = `yyyy`;
    //this.birthDate = this.formatReadableDate(this.today);

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
  // عندما يختار المستخدم تاريخ
onDateChange(event: any) {
  this.today = 'yes';
  const selectedDate = event.target.value;
  this.birthDate = this.formatReadableDate(selectedDate);
  console.log('التاريخ المختار:', this.birthDate);
}
formatReadableDate(dateString: string): string {
  const d = new Date(dateString);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

  setGender(gender: string) {console.log(this.booll);
    this.gender=gender;
    if(gender==="FEMALE"){this.img='assets/icon/woman1.png';
      this.booll="female" ,console.log(this.booll);}else{this.booll="male" ;this.img='assets/icon/man1.png';}
  }

  togglePassword() {
    this.password_bool = !this.password_bool;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }
  onDateChangee(event: any) {
  const rawDate = event.detail?.value || event.target?.value;

  if (rawDate) {
    const dob = new Date(rawDate);
    if (!isNaN(dob.getTime())) {
      const formattedDate = `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`;
      this.birthDate=formattedDate;
      console.log("التاريخ المنسق:", formattedDate);
    } else {
      console.error("تاريخ غير صالح:", rawDate);
    }
  } else {
    console.error("لم يتم اختيار تاريخ");
  }
}

validation(){
   const dob = new Date(this.dateOfBirth);
    const formattedDate = `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`;
  console.log(formattedDate);
  if(this.email!==""){if((this.repassword==this.password)&&this.num.length==4&&this.birthDate!=='NaN-NaN-NaN'){
    this.disabled=false;this.Service.otp_number=1;
    return 'login-button-activee';}else{this.disabled=true; return 'login-button';}}
  else{if((this.repassword==this.password)&&this.num.length==4&&this.birthDate!=='NaN-NaN-NaN'&&this.email!==""){this.Service.otp_number=1; this.disabled=false; return 'login-button-activee';}else{ this.disabled=true; return 'login-button';}}
}
password_match(){
  if(this.password==''||this.repassword==''){this.text_password='';}
if(this.password==this.repassword){
  this.text_password=this.list_langMatch[0];
}else{this.text_password=this.list_langMatch[1];}
}
color_password() {
  if(this.password ==""&&this.repassword==''){
    this.text_password=' ';
  }else{ if (this.password === this.repassword) {
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
this.password_color='#90EE90';
        }else if(this.num.length==4){
this.password_color='#006400';
        }
      }
}
}
