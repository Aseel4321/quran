import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.scss'],
})
export class AddCalendarComponent implements OnInit{  keyboardWillShowListener: any;
  date:string='';
  d:any;
  keyboardWillHideListener: any;isKeyboardOpen: boolean = false;isModalOpen = false;constructor(private main:MainServiceService){}
  ngOnInit(): void {   this.date=this.main.date;
      console.log(this.main.date)
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
title:string='';
note:string='';
   showModal = false;
  selectedTime1: string | null = null;
  tempTime: string | null = null;
  selectedTime: string='';
 disabled=true;
  printTime(event: any) {
   
  }
  openTimeModal() {
    this.tempTime = this.selectedTime; // تمرير القيمة الحالية (إن وجدت)
    this.showModal = true;
  }

  onTimeChange(event: any) {
    this.selectedTime = event.detail.value; 
    this.showModal = false;
  }
valid(){
  if(this.title==''||this.note==''||this.selectedTime==''){console.log(this.note);this.disabled=true;
    return 'button'
  }else{ console.log(this.note);  this.disabled=false; return'button-activee'; }
}
add() { 
const email = localStorage.getItem('email'); 
const arabic = "الخميس، ٦ نوفمبر ٢٠٢٥";
const english = this.arabicDateToEnglish(arabic);
console.log(english);
const dateObj = new Date(this.date);
const year = dateObj.getFullYear();
const month = dateObj.getMonth();
const day = dateObj.getDate();
const dateObj1 = new Date(this.selectedTime);
console.log("UTC Date:", this.date);
const hours = Number(dateObj1.getHours().toString().padStart(2,'0'));;
const minutes = Number(dateObj1.getMinutes().toString().padStart(2,'0'));; // من 1 إلى 6
console.log(hours);console.log(minutes);
const utcDate = new Date(Date.UTC(year, month, day,hours,minutes));console.log("UTC Date:", utcDate.toISOString());
//console.log(utcDate.toISOString());
/*this.main.add_calendar({
  "userEmail": "aseelghaleb2088@gmail.com",
  "alertAddress": "string",
  "note": "string",
  "alertTime": utcDate.toISOString()
}).subscribe((data:any)=>{
     
console.log(data)
    },(error: HttpErrorResponse)=>{
      
      console.log(error.status)})*/
 
}
 arabicDateToEnglish(arabicDate: string): string {
  // 1- تحويل الأرقام العربية إلى أرقام إنجليزية
  const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const englishNumbers = ['0','1','2','3','4','5','6','7','8','9'];

  const convertNumbers = (str: string) =>
    str.replace(/[٠-٩]/g, d => englishNumbers[arabicNumbers.indexOf(d)]);

  let converted = convertNumbers(arabicDate); // مثال: "الخميس، 6 نوفمبر 2025"

  // 2- تحويل أسماء الأشهر من العربية للإنجليزية
  const monthsMap: {[key: string]: string} = {
    "يناير":"January",
    "فبراير":"February",
    "مارس":"March",
    "أبريل":"April",
    "مايو":"May",
    "يونيو":"June",
    "يوليو":"July",
    "أغسطس":"August",
    "سبتمبر":"September",
    "أكتوبر":"October",
    "نوفمبر":"November",
    "ديسمبر":"December"
  };

  for (const [arabic, english] of Object.entries(monthsMap)) {
    converted = converted.replace(arabic, english);
  }

  // 3- تحويل أيام الأسبوع من العربية للإنجليزية
  const weekdaysMap: {[key: string]: string} = {
    "الأحد":"Sunday",
    "الاثنين":"Monday",
    "الثلاثاء":"Tuesday",
    "الأربعاء":"Wednesday",
    "الخميس":"Thursday",
    "الجمعة":"Friday",
    "السبت":"Saturday"
  };

  for (const [arabic, english] of Object.entries(weekdaysMap)) {
    converted = converted.replace(arabic, english);
  }

  // إزالة الفاصلة العربية
  converted = converted.replace("،", ",");

  return converted.trim();
}

// استخدام الدالة


// استخدام الدالة

}
