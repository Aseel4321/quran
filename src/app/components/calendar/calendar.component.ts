import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent{
selectedDates: string[] = [];

minDate: string;

  constructor() {
    // ضبط الحد الأدنى لتاريخ اليوم (مثلاً)
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // شكل "YYYY-MM-DD"
  }
  onDateChange(event: any) {
    console.log('تم اختيار التاريخ:', event.value);
    // يمكنك هنا تعيين القيمة إلى متغير أو أي معالجة أخرى
  }
onDatesSelected(event: any) {
  const value = event.detail.value;
  
  if (Array.isArray(value)) {
    this.selectedDates = value;
    console.log('التواريخ المختارة:', this.selectedDates);
  } else {
    console.warn('التاريخ المفرد:', value);
  }
}
 


}
