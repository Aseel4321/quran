import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit ,OnInit{
 currentMonth: number;
  currentYear: number;
indx:string='';
  monthDays: (Date | null)[] = [];
  weekDays = localStorage.getItem('lang')=='ar'?['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
;
  selectedDates:date[] = [];

  selectedFullDate: string | null = null;

  ngOnInit() {this.date();
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.generateMonth(this.currentYear, this.currentMonth);
  }

  generateMonth(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    // فراغات قبل أول يوم في الأسبوع (مراعاة أن الأحد = 0)
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    this.monthDays = days;
  }
user=['t','f']
  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateMonth(this.currentYear, this.currentMonth);
    this.selectedFullDate = null; // مسح التاريخ المختار عند تغير الشهر
  }
date(){const days = localStorage.getItem('lang')=='ar'?['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = localStorage.getItem('lang')=='ar'?[
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ]:[
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
  if(this.indx==''){
   const today = new Date();
const dayIndex = today.getDay(); // 0-6
const dayName = days[dayIndex];
const date = today.getDate();
const monthName = months[today.getMonth()];
const year = today.getFullYear();
this.indx = `${dayName}, ${monthName} ${date}, ${year}`;
  }
}
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateMonth(this.currentYear, this.currentMonth);
    this.selectedFullDate = null; // مسح التاريخ المختار عند تغير الشهر
  }

  getMonthName(monthIndex: number): string {
    const monthNames = localStorage.getItem('lang')=='ar'?[
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ]:[
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
;
    return monthNames[monthIndex];
  }

  formatFullDatear(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('ar-EG', options);
  }
formatFullDateen(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

  onDateClick(date: Date) {
    if (!date) return;

    const key = date.toISOString().split('T')[0];
this.indx=localStorage.getItem('lang')=='ar'?this.formatFullDatear(date):this.formatFullDateen(date);
 //this.selectedDates.push({date:,colors:[]});
console.log(this.indx);
    //this.selectedFullDate.push()
  }

  /*getDayColors(date: Date): string[] {
    const key = date.toISOString().split('T')[0];
    return this.selectedDates[key] || [];
  }*/
  @ViewChild('calendar', { static: false }) calendarRef!: ElementRef;  @ViewChild('myCalendar', { static: false }) myCalendar!: ElementRef;
//selectedDates: string[] = [];

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

    buttons.forEach((btn: HTMLElement, index: number) => {
      // فقط إذا كان الزر يمثل يوم (يحتوي على data-day)
      if (btn.hasAttribute('data-day')) {
        // استمع للضغط عليه لتحديث اللون
        btn.addEventListener('click', () => {
          setTimeout(() => {
            // احصل على جميع الأيام المختارة بعد التحديث
            const activeButtons = shadow.querySelectorAll('.calendar-day-active');

            // نظف الكل وطبق اللون الجديد
            activeButtons.forEach((activeBtn: any) => {
              activeBtn.classList.remove('calendar-day-active');
              activeBtn.style.backgroundColor = '#17ee34ff'; // اللون الأخضر بدل الأزرق
              activeBtn.style.color = 'white';
              activeBtn.style.borderRadius = '20%';
            });
          }, 10); // تأخير بسيط للسماح لـ DOM بالتحديث
        });
      }
    });
  });
}

color_day(day){

if(this.formatFullDatear(day)==this.indx){return '#8F8FA7'}else if(this.formatFullDateen(day)==this.indx){return '#8F8FA7'}
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
    //this.selectedDates = value;
    console.log('التواريخ المختارة:', this.selectedDates);
  } else {
    console.warn('التاريخ المفرد:', value);
  }
}
 onDatesSelected1(event: any) {
  const selectedValues = event.detail.value;
  console.log('التواريخ المحددة:', selectedValues);

  // ننتظر قليلًا حتى تنتهي DOM من التحديث
  setTimeout(() => {
    const hostEl = this.calendarRef.nativeElement;

    // نحصل على كل الأيام المحددة (تحتوي على كلاس معين)
    const activeDays = hostEl.shadowRoot?.querySelectorAll('.calendar-day-active');

    activeDays?.forEach((day: any) => {
      // نغير لون الخلفية (الدائرة)
      //day.style.backgroundColor = '#2d5d4d'; // أخضر
      day.style.color = 'white';             // لون الرقم داخل الدائرة
      day.style.borderRadius = '50%';        // تأكيد أنها دائرية
    });
  }, 100); // تأخير بسيط للسماح للـ DOM بالتحديث
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

 interface date{
  date:string;
  colors:[]
 }
