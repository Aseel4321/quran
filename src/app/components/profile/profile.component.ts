import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit {
  name: string = '';
  email: string = '';
  gender:any;
  selectedGender: string = 'male'; 
  phoneNumber: string = '';
  selectedCountryCode = '+962';
  dateOfBirth: string | null = null;
  phonenumber='';
   birthDate: string = 'NaN-NaN-NaN';
  list_langCountries=localStorage.getItem('lang')=="ar"?["ا"]:["a"]; 
  countries = [
    {name:this.list_langCountries[0],flag: "assets/icon/man1.png", dial_code: '+962' },
  
    
  ];
constructor( private service: MainServiceService){
  this.update();
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
  "oldEmail":"aseelghaleb2088@gmail.com",
  "newFullName":"aseelsl",
  "newEmail":"aseelghdaleb2088d@gmail.com",
  "newPhone":"34347544",
  "newDob":"1/1/1970",
  "newGender":"MALE"
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

}
