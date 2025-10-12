/*import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { IonInput, Platform } from '@ionic/angular';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit ,OnInit{ isModalOpen = false; user:any 
  name: string = '';
  email: string = '';
  gender:any;
   initialHeight: number = window.innerHeight;
  keyboardOpen: boolean = false;
  private lockInProgress = false;
  selectedGender: string = 'male'; 
  phoneNumber: string = '';
  selectedCountryCode = '+962';
  dateOfBirth: string | null = null;
  phonenumber='';
  genderr:any;
   birthDate: string = 'NaN-NaN-NaN';
  list_langCountries=localStorage.getItem('lang')=="ar"?["ا"]:["a"]; 
  countries = [
    {name:this.list_langCountries[0],flag: "assets/icon/man1.png", dial_code: '+962' },
  
    
  ];
constructor(private platform: Platform, private service: MainServiceService){
  
}
  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('User'));
    console.log(this.user.gender);
    this.gender=this.user.gender;this.birthDate=this.user.dob;
    if(this.user.gender=='MALE'){this.selectedGender='male';}else{this.selectedGender='female';}
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
   remove_phone(){

    this.phonenumber='';


}
   onKeyup_name(event:any){
this.name= (event.target as HTMLInputElement).value;
console.log(this.name)

  }
 onKeyup_email(event: KeyboardEvent){
this.email = (event.target as HTMLInputElement).value;
console.log(this.email);
  }
onDateChange(event: any) {

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
  update(){
    
    this.service.update_profile({
  "oldEmail":this.user.email,
  "newFullName":this.name,
  "newEmail":this.email,
  "newPhone":this.phonenumber,
  "newDob":this.birthDate,
  "newGender":this.gender
}).subscribe((data:any)=>{
console.log(data);
    },(error: HttpErrorResponse)=>{
     console.log(error);
        
    });
  
   }
   
  setGender(gender: string) { 
    this.gender=gender;
    
      console.log(this.gender);
  }
     onKeyup_phone(event:any){
const phoneNumber1= (event.target as HTMLInputElement).value;
console.log(this.selectedCountryCode);
this.phoneNumber = this.selectedCountryCode + phoneNumber1;
console.log(this.phoneNumber);
this.phonenumber=phoneNumber1;
  }
  @ViewChild('nameInput', { static: false }) nameInputRef!: IonInput;
  @ViewChild('emailInput', { static: false }) emailInputRef!: IonInput;
  @ViewChild('phoneInput', { static: false }) phoneInputRef!: IonInput;

  ngAfterViewInit() {
    this.addBlurOnReadonlyFocus(this.nameInputRef);
    this.addBlurOnReadonlyFocus(this.emailInputRef);
    this.addBlurOnReadonlyFocus(this.phoneInputRef);
  }

  addBlurOnReadonlyFocus(input: IonInput) {
    input.getInputElement().then((el: HTMLInputElement) => {
      el.addEventListener('focus', () => {
        if (el.readOnly) {
          el.blur();
        }
      });
    });
  }

enableInput(field: string) {
  let inputRef: IonInput | undefined;

  if (field === 'name') inputRef = this.nameInputRef;
  else if (field === 'email') inputRef = this.emailInputRef;
  else if (field === 'phone') inputRef = this.phoneInputRef;

  if (inputRef) {
    inputRef.getInputElement().then((el: HTMLInputElement) => {
      el.readOnly = false;

      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);

        if (!el.dataset.blurSet) {
          el.dataset.blurSet = 'true';
          el.addEventListener('blur', () => {
            setTimeout(() => {
              el.readOnly = true;
            }, 200);
          });
        }
      });
    });
  }
}

style_image2() {
  if (this.keyboardOpen) {
    return 'display: none;';
  }

  const baseStyle = 'width: 50%; position: fixed; bottom: 0; z-index: 10;';
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + ' right: 0;';
  } else {
    return baseStyle + ' left: 0;';
  }
}

valid(){
  if(this.name==''&&this.email==""&&this.phonenumber==''&&this.user.gender==this.gender&&this.user.dob==this.birthDate){
    return 'login-button';
  }else{ return 'login-button-activee';}
}
}*/
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { AlertController, IonInput, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit,OnInit {user:any;  keyboardWillShowListener: any; name1: string = '';gender:any;
  email: string = '';
  phoneNumber: string = '';
  selectedCountryCode = '+962';
  dateOfBirth: string ;
  booll:string="male"
  keyboardWillHideListener: any;
private lockInProgress = false; isKeyboardOpen: boolean = false; selectedGender: string = 'male'; 
disabled=true;
name:any;
img2:any; formatted :any;
isLoading=false;
list_langCountries = localStorage.getItem('lang') == "ar" 
  ? ["الأردن", "السعودية", "مصر", "الإمارات", "الكويت", "قطر", "عُمان", "البحرين"]
  : ["Jordan", "Saudi Arabia", "Egypt", "UAE", "Kuwait", "Qatar", "Oman", "Bahrain"];
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
constructor(private platform: Platform, private service: MainServiceService ,private servicea: AuthService ,private alertController: AlertController,private router: Router,private location: Location,){}
  ngOnInit(): void {
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
    const userData = localStorage.getItem('User');
     this.user = JSON.parse(userData);
     this.name1=this.user.fullName;
     this.email=this.user.email;
    this.phoneNumber = this.user.phone.replace(/^\+\d+/, '');
    console.log(this.phoneNumber);
     this.dateOfBirth=this.user.dob;    
       const date = new Date(this.dateOfBirth);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
   this.formatted = `${day}-${month}-${year}`;console.log(this.dateOfBirth);

  console.log("التاريخ بالعكس:", this.formatted);if(this.user.gender=='MALE'){this.booll="male";this.selectedGender='male';this.gender="MALE" ;
  
  this.img2='assets/icon/man3.png';
 } else{this.selectedGender='famale';this.gender="FEMALE" ;this.booll="female";this.img2= 'assets/icon/moslem-woman.png'}
 
  }  onKeyup_phone(event:any){
const phoneNumber1= (event.target as HTMLInputElement).value;
console.log(this.selectedCountryCode);
this.phoneNumber = this.selectedCountryCode + phoneNumber1;
console.log(this.selectedCountryCode);
//this.phonenumber=phoneNumber1;
  } onKeyup_email(event: KeyboardEvent){
this.email = (event.target as HTMLInputElement).value;
console.log(this.email);
  }
   setGender(gender: string) {
    this.gender=gender;
    if(gender==="FEMALE"){this.img2='assets/icon/moslem-woman.png';
      this.booll="female" }else{this.booll="male" ;this.img2='assets/icon/man3.png';}
  }
 onKeyup_name(event:any){
this.name1= (event.target as HTMLInputElement).value;


  }

isModalOpen = false;
  @ViewChild('nameInput', { static: false }) nameInputRef!: IonInput;
  @ViewChild('emailInput', { static: false }) emailInputRef!: IonInput;
  @ViewChild('phoneInput', { static: false }) phoneInputRef!: IonInput;

  ngAfterViewInit() {
    this.addBlurOnReadonlyFocus(this.nameInputRef);
    this.addBlurOnReadonlyFocus(this.emailInputRef);
    this.addBlurOnReadonlyFocus(this.phoneInputRef);
  }

  addBlurOnReadonlyFocus(input: IonInput) {
    input.getInputElement().then((el: HTMLInputElement) => {
      el.addEventListener('focus', () => {
        if (el.readOnly) {
          el.blur();
        }
      });
    });
  }
onDateChangee(event: any) {
  const rawDate = event.detail?.value || event.target?.value;
  if (rawDate) {
    const dob = new Date(rawDate);
    if (!isNaN(dob.getTime())) {
      const formattedDate = `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`;
      this.dateOfBirth=formattedDate;
      console.log("التاريخ المنسق:", formattedDate);
    } else {
      console.error("تاريخ غير صالح:", rawDate);
    }
  } else {
    console.error("لم يتم اختيار تاريخ");
  }
} update(){
    this.isLoading = true;
      
    this.service.update_profile({
  "oldEmail":this.user.email,
  "newFullName":this.name1,
  "newEmail":this.email,
  "newPhone":this.phoneNumber,
  "newDob":this.dateOfBirth,
  "newGender":this.gender
}).subscribe((data:any)=>{this.isLoading = false;localStorage.setItem('User',JSON.stringify(data));this.router.navigate(['/home-page']);
console.log(data);
    },(error: HttpErrorResponse) => {
      this.isLoading = false;
      
    
      if(localStorage.getItem('lang')=='ar'){
         this.name = error?.error?.arDescription; this.presentAlert();
       console.log(this.name);
        
     

    }else{
    this.name = error?.error?.enDescription; console.log('this.name'); console.log(this.name);
        this.presentAlert(); 
        }
    
    });
    
   } async presentAlert() {
    if(localStorage.getItem('lang')=='ar'){ 
    const alert = await this.alertController.create({
   
    message: this.name,
     buttons: [
    {
      text: 'موافق',
      handler: () => {if(this.name=='الحساب غير موثق'){ localStorage.setItem('email',this.email);; this.servicea.otp_number=1;this.router.navigate(['/otp-email']);
  }
   
     
      }
    }
  ]
  });await alert.present();}else{
 
    const alert = await this.alertController.create({
   
    message: this.name,
     buttons: [
    {
      text: 'OK',
      handler: () => {if(this.name=='The data has been changed successfully, including the email. You must log out to reactivate the new email.'){  
   localStorage.setItem('email',this.email);
   
 this.servicea.otp_number=1;this.router.navigate(['/otp-email']);
        }
   
     
      }
    }
  ]
  });await alert.present();}


  
}
value(){
  const date = new Date('2000-10-20');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formatted = `${year}-${month}-${day}`;
  return formatted;
}
v="";
  enableInput(field: string) {
    let inputRef: IonInput | undefined;

    if (field === 'name') inputRef = this.nameInputRef;
    else if (field === 'email') inputRef = this.emailInputRef;
    else if (field === 'phone') inputRef = this.phoneInputRef;

    if (inputRef) {
      inputRef.getInputElement().then((el: HTMLInputElement) => {
        if (document.activeElement === el) {
          el.blur();
        }

        setTimeout(() => {
          if (!el.readOnly) return;

          el.readOnly = false;

          setTimeout(() => {
            el.focus();
          }, 50);

          if (!el.dataset.blurSet) {
            el.dataset.blurSet = 'true';
            el.addEventListener('blur', () => {
              setTimeout(() => {
                el.readOnly = true;
              }, 200);
            });
          }
        }, 50);
      });
    }
  }
title() {
  if (localStorage.getItem('lang') === 'ar') {
    return {
      'font-family': '"El Messiri", sans-serif',
      'font-weight': '600',
      'text-align': 'center',
      'margin-top': '1vh'
    };
  } else {
    return {
      'font-family': '"Lucida Console", Monaco, monospace', 'font-weight': '600',
      'text-align': 'center',
      'margin-top': '1vh'
    };
  }
}
valid(){
  if(this.name1==this.user.fullName&&this.email==this.user.email&&this.phoneNumber==this.user.phone&&this.gender==this.user.gender&&this.dateOfBirth==this.user.dob){this.disabled=true;
    console.log(this.name1==this.user.fullName);console.log(this.email==this.user.email);console.log(this.phoneNumber==this.user.phone);console.log(this.gender==this.user.gender);console.log(this.dateOfBirth==this.user.dob);
    return 'login-button'
  }else{this.disabled=false; return 'login-button-activee'}
}
goBack() {
  this.location.back();
}
/*valid(){
  if(this.name!=this.user.fullName&&this.email!=this.user.email&&this.phoneNumber!=this.user.phone&&this.gender!=this.user.gender&&this.dateOfBirth!=this.user.dob){
    return 'login-button'
  }else{ return 'login-button-activee'}
}*/
}
