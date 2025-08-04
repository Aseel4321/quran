import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit{  @ViewChild('myCalendar', { static: false }) myCalendar!: ElementRef;
selectedDates: string[] = [];

minDate: string;
 ngAfterViewInit() {
    this.customizeCalendarColors();
  }
customizeCalendarColors() {
  const ionDateTime = document.querySelector('ion-datetime') as any;
  if (!ionDateTime) return;

  ionDateTime.componentOnReady().then(() => {
    const shadow = ionDateTime.shadowRoot;
    if (!shadow) {
      console.log('shadowRoot غير متاح');
      return;
    }

    const buttons = shadow.querySelectorAll('button');
    console.log('أزرار داخل shadowRoot:', buttons);

    buttons.forEach((btn: HTMLElement, index: number) => {
      console.log(`زر رقم ${index + 1}:`, btn.textContent?.trim());

      // هنا نلون كل الأزرار بنفس اللون:
      btn.style.backgroundColor = '#4caf50'; // أخضر
      btn.style.color = 'white';
      btn.style.borderRadius = '8px';
    });
  });
}


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
 
highlightDates() {
  const specialDate = '2025-08-10'; // اليوم المراد تمييزه
  requestAnimationFrame(() => {
    const days = document.querySelectorAll('ion-datetime::part(calendar-day)');
    days.forEach((dayElement: any) => {
      const date = dayElement.getAttribute('data-day');  dayElement.style.backgroundColor = '#0a0808ff'; // اللون المخصص
        dayElement.style.color = 'white';
        dayElement.style.borderRadius = '50%';
     
    });
  });
}


}


