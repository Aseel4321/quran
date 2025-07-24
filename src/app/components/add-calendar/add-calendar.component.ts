import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.scss'],
})
export class AddCalendarComponent{
title:string='';
note:string='';
   showModal = false;
  selectedTime1: string | null = null;
  tempTime: string | null = null;
  selectedTime: string='';
 disabled=true;
  printTime(event: any) {
    console.log('الوقت المختار:', this.selectedTime);
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
  }else{console.log(this.note);  this.disabled=false;return'button-activee'; }
}
}
