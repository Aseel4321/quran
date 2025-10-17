import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { AlertController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
// ✅ الصحيح
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Keyboard } from '@capacitor/keyboard';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit { isModalOpen = false;

  constructor(private screenOrientation: ScreenOrientation,
    private router: Router,
    private Service: AuthService,
    private platform: Platform,private alertController: AlertController
  ) {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        console.log('زر الرجوع معطّل في هذه الصفحة');
      });
    });}
     initialHeight: number = window.innerHeight;
keyboardOpen: boolean = false;
  
 isKeyboardOpen: boolean = false;

  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
private lockInProgress = false;

list_langPassword=localStorage.getItem('lang')=="ar"?["كلمه السر ضعيفه","قوه متوسطه","كلمه سر قويه","كلمه سر ممتازه"]:["Weak password",'Moderate strength','Strong password','Very strong password'];
list_langMatch=localStorage.getItem('lang')=="ar"?["كلمه المرور متطابقه","كلمه المرور غير متطابقه",]:['Matched Password',"Not Matched Password"];
 list_langCountries = localStorage.getItem('lang') == "ar" 
  ? ["الأردن", "السعودية", "مصر", "الإمارات", "الكويت", "قطر", "عُمان", "البحرين"]
  : ["Jordan", "Saudi Arabia", "Egypt", "UAE", "Kuwait", "Qatar", "Oman", "Bahrain"];

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
 name1:any;
  gender: string = 'MALE';
  showPassword = false;
  showConfirm = false;
  list:boolean[]=[false,false,false,false];
  num:boolean[]=[];
  countries = [
  { name: this.list_langCountries[0], flag: "assets/icon/man1.png", dial_code: '+962' }, // الأردن
  { name: this.list_langCountries[1], flag: "assets/icon/man2.png", dial_code: '+966' }, // السعودية
  { name: this.list_langCountries[2], flag: "assets/icon/man3.png", dial_code: '+20' },  // مصر
  { name: this.list_langCountries[3], flag: "assets/icon/man4.png", dial_code: '+971' }, // الإمارات
  { name: this.list_langCountries[4], flag: "assets/icon/man5.png", dial_code: '+965' }, // الكويت
  { name: this.list_langCountries[5], flag: "assets/icon/man6.png", dial_code: '+974' }, // قطر
  { name: this.list_langCountries[6], flag: "assets/icon/man7.png", dial_code: '+968' }, // عُمان
  { name: this.list_langCountries[7], flag: "assets/icon/man8.png", dial_code: '+973' }, // البحرين
];
//setGender(){}
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
   
}).subscribe((data:any)=>{localStorage.setItem('email',this.email)
    localStorage.setItem('User',JSON.stringify(data));
    this.Service.send_otp(this.email).subscribe((data:any)=>{ this.isLoading=false;
   this.Service.otp_number=1;
  },(e:any)=>{this.isLoading=false;
    this.router.navigate(['/otp-email']);
    console.log(e)})
  },(error: HttpErrorResponse)=>{this.isLoading=false;
      if(localStorage.getItem('lang')=='ar'){this.name1 = error?.error?.arDescription;
      console.error(error.error);

      this.presentAlert();}else{this.name1 = error?.error?.enDescription;this.presentAlert(); }})
 }

     
 
 
     async presentAlert() {
    if(localStorage.getItem('lang')=='ar'){  const alert = await this.alertController.create({
    message: this.name1,
    buttons: ['موافق']
  });await alert.present();}else{const alert = await this.alertController.create({
    //header: 'dddddd',
    message: this.name1,
    buttons: ['ok']
  });await alert.present();}


  
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
        window.addEventListener('resize', () => {
      const currentHeight = window.innerHeight;
      this.keyboardOpen = currentHeight < this.initialHeight - 100;

      // تحديث CSS يدويًا لو أردت
      const img = document.querySelector('.login-image2') as HTMLElement;
      if (img) {
        img.style.cssText = this.style_image2();
      }
    });
  this.lockInProgress = false;  this.platform.ready().then(() => {
      if (Capacitor.isNativePlatform() && !this.lockInProgress) {
        this.lockInProgress = true;
        // نضيف تأخير بسيط لتفادي مشاكل التداخل
        setTimeout(() => {
          ScreenOrientation.lock({ orientation: 'portrait' })
            .then(() => console.log('Orientation locked'))
            .catch(err => {
              console.error('Lock failed', err);
            });
        }, 150);
      }
    });
this.lockInProgress = false;

  this.platform.ready().then(() => {
    if (Capacitor.isNativePlatform() && !this.lockInProgress) {
      this.lockInProgress = true;
      setTimeout(() => {
        ScreenOrientation.lock({ orientation: 'portrait' })
          .then(() => console.log('Orientation locked'))
          .catch(err => console.error('Lock failed', err));
      }, 150);
    }

    // مراقبة فتح الكيبورد
    window.addEventListener('resize', () => {
      const currentHeight = window.innerHeight;
      this.keyboardOpen = currentHeight < this.initialHeight - 100;

      // تحديث CSS يدويًا لو أردت
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
    });
  }
  login(){
    this.router.navigate(['/login']);
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
  return '#b4b42aff'
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
  if(this.email!==""){if((this.repassword==this.password)&&this.num.length==4&&this.birthDate!=='NaN-NaN-NaN'&&this.name){
    this.disabled=false;this.Service.otp_number=1;
    return 'login-button-activee';}else{this.disabled=true; return 'login-button';}}
  else{if((this.repassword==this.password)&&this.num.length==4&&this.birthDate!=='NaN-NaN-NaN'&&this.email!==""&&this.name){this.Service.otp_number=1; this.disabled=false; return 'login-button-activee';}else{ this.disabled=true; return 'login-button';}}
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
this.password_color='#b4b42aff';
        }else if(this.num.length==3){
this.password_color='#90EE90';
        }else if(this.num.length==4){
this.password_color='#006400';
        }
      }
}
style_image2() {
  if (this.keyboardOpen) {
    return 'display: none;';
  }

  const baseStyle = 'width: 33%; position: fixed; bottom: 0; z-index: 10;';
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + ' right: 0;';
  } else {
    return baseStyle + ' left: 0;';
  }
}
}
