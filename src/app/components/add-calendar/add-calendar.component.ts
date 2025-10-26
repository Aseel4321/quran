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
    this.selectedTime = event.detail.value; console.log('الوقت المختار:', this.selectedTime);
    this.showModal = false;
  }
valid(){
  if(this.title==''||this.note==''||this.selectedTime==''){console.log(this.note);this.disabled=true;
    return 'button'
  }else{ console.log(this.note);  this.disabled=false; return'button-activee'; }
}
}
