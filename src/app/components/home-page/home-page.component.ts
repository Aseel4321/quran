import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { Geolocation } from '@capacitor/geolocation';// ✅ مكتبة Capacitor فقط
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import cron from 'node-cron';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  items = ['aa', 'kk', 'yy', 'yyy', 'hhh', 'aa', 'kk'];
  latitude: number = 0;
  longitude: number = 0;
  city: any;
  city_api:any;
  country_api:any;
prayer_name :any=[];
prayer_timee :any=[];
times:Model[]=[];
timess:any=['h','h']
  city1: any;
  country: any = '';
  bool: any = false;
  position: any;
  city11: any = '';
time_now:any; 
  currentTime: string = '';
  timePeriod: string = '';
 num=0;
  userRoles: Map<string,string> = new Map();
   lastPeriod = ''; 
   prayerName1=localStorage.getItem('lang');
 i:any;text:string;
user:any; 
loc:string;
imgg='';
  list_time: any[] = [
    { name: "aseel", image: "assets/icon/sunny.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/sunrise.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/sun.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/cloudy.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/cloud.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/moon.png", time: '17:8' }
  ];
 intervalId: any;
  initialHeight: number = window.innerHeight;
keyboardOpen: boolean = false;
  list_time1: any[] = [
   "assets/icon/sunny.png",
   "assets/icon/sunrise.png",
   "assets/icon/sun.png",
   "assets/icon/cloudy.png",
   "assets/icon/cloud.png",
    "assets/icon/moon.png",
  ]; ngOnInit(): void {   
   
 this.checkLocationEnabled();  
 
   window.addEventListener('resize', () => {
      const currentHeight = window.innerHeight;
      this.keyboardOpen = currentHeight < this.initialHeight - 100;

      // تحديث CSS يدويًا لو أردت
      const img = document.querySelector('.login-image2') as HTMLElement;
      if (img) {
        img.style.cssText = this.style_image2();
      }
    });
    const userData = localStorage.getItem('User');
     this.user = JSON.parse(userData);
  } ngOnDestroy() {
    // 🛑 عند إغلاق الصفحة أو الانتقال منها، أوقف التكرار
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('تم إيقاف التكرار عند إغلاق الصفحة.');
    }
  }
  constructor(private locationAccuracy: LocationAccuracy,
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    private service: MainServiceService,
  ) {
 

this.intervalId = setInterval(() => {
      const now = new Date();
      this.time_now = now.toLocaleTimeString('en-US');

      if (localStorage.getItem('lang') === 'ar') {
        this.time_now = this.time_now.replace('AM', 'ص').replace('PM', 'م');
        const currentPeriod = this.time_now.includes('ص') ? 'ص' : 'م';

        if (this.lastPeriod !== currentPeriod) {
          this.updateTime();
        }

        this.lastPeriod = currentPeriod;
        this.prayer_times();

      } else {
        const currentPeriod = this.time_now.includes('AM') ? 'AM' : 'PM';

        if (this.lastPeriod !== currentPeriod) {
          this.updateTime();
        }

        this.lastPeriod = currentPeriod;
        this.prayer_times();
      }

    }, 1000);
}

 list_type(){
                  
  return  localStorage.getItem('lang') === 'ar' ?[
    { name: "التسبيح", image: 'assets/icon/beads.png' },
    { name: "اختبار", image: 'assets/icon/exam.png' },
    { name: "الحديث الشريف", image: 'assets/icon/prayer.png' },
    { name: "التفسير", image: 'assets/icon/teachings.png' },
    { name: "القرآن الكريم", image: 'assets/icon/islamic.png' },
    { name: "الدعاء", image: 'assets/icon/exam.png' },
    { name: "الاذكار", image: 'assets/icon/praying.png' }
  ]:[
    { name: "Tesbeeh", image: 'assets/icon/beads.png' },
    { name: "Test", image: 'assets/icon/exam.png' },
    { name: "AL-Hadith", image: 'assets/icon/prayer.png' },
    { name: "Tafsir", image: 'assets/icon/teachings.png' },
    { name: "Al-Quran", image: 'assets/icon/islamic.png' },
    { name: "Dua", image: 'assets/icon/exam.png' },
    { name: "Adhkar", image: 'assets/icon/praying.png' }
  ]
 }
    updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US'); 
    const hour = now.getHours();
    const period = this.currentTime.includes('AM') ? 'AM' : (hour < 18 ? 'PM' : 'PM');
    this.timePeriod = period;

    

  }list_card(){ return  localStorage.getItem('lang') === 'ar' ? [
    { name: "إتمام القرآن", title: 'آخر قراءة للقرآن: ', number: 55, per: "4%", image: 'assets/icon/islamic.png' },
    
    { name: "اختبار حفظ القرآن", title: 'آخر مشاركة في اختبار الحفظ: 06-03-2025', number: null, per: "90%", image: 'assets/icon/prayer.png' },{ name:this.timePeriod=="AM"? "أذكار الصباح":this.timePeriod=="PM"?"أذكار المساء":'', title: 'آخر أذكار تم قراءتها:', number: 6, per: "76%", image: 'assets/icon/prayer.png' },
  ]:[
    { name: "Quran Completion", title: 'Last Read Al-Quran : ', number: 55, per: "4%", image: 'assets/icon/islamic.png' },  { name: "Quran Memorization Test", title: 'Last entry for Quran Memorization :', number: 66, per: "90%", image: 'assets/icon/prayer.png' },
    { name:this.timePeriod=="AM"? "Morning Adhkar":this.timePeriod=="PM"?"Evening Adhkar":'', title:this.timePeriod=="AM"?'Last Read Morning remembrance : ':this.timePeriod=="PM"?'Last Read Evening remembrance : ':'', number: 6, per: "76%", image: 'assets/icon/prayer.png' },
  
  ]
     if(this.timePeriod=="AM"){
  
      }else if(this.timePeriod=="PM"){
       return  localStorage.getItem('lang') === 'ar' ?[
 
    { name: "إتمام القرآن",  title: 'آخر قراءة للقرآن: ', number: 55, per: "4%", image: 'assets/icon/islamic.png' },
    { name: "أذكار المساء", title: 'آخر أذكار تم قراءتها:', number: 6, per: "76%", image: 'assets/icon/prayer.png' },
    { name: "اختبار حفظ القرآن", title: 'آخر أذكار تم قراءتها:', number: 66, per: "90%", image: 'assets/icon/prayer.png' }
  
  ]:[
    { name: "Quran Completion", title: 'Last Read Al-Quran : ', number: 55, per: "4%", image: 'assets/icon/islamic.png' },
    { name: "Evening Adhkar", title: 'Last Read Evening remembrance : ', number: 77, per: '23%', image: 'assets/icon/exam.png' },
    { name: "Quran Memorization Test", title: 'Last entry for Quran Memorization :', number: 66, per: "90%", image: 'assets/icon/prayer.png' }
  ]}
     }
  /*list_card(){
     if(this.timePeriod=="AM"){
   return  localStorage.getItem('lang') === 'ar' ? [
    { name: "إتمام القرآن", title: 'آخر قراءة للقرآن: ', number: 55, per: "4%", image: 'assets/icon/islamic.png' },
    { name: "أذكار الصباح", title: 'آخر أذكار تم قراءتها:', number: 6, per: "76%", image: 'assets/icon/prayer.png' },
    { name: "اختبار حفظ القرآن", title: 'آخر مشاركة في اختبار الحفظ: 06-03-2025', number: null, per: "90%", image: 'assets/icon/prayer.png' }
  ]:[
    { name: "Quran Completion", title: 'Last Read Al-Quran : ', number: 55, per: "4%", image: 'assets/icon/islamic.png' },
    { name: "Morning Adhkar", title:'Last Read Morning remembrance : ', number: 6, per: "76%", image: 'assets/icon/prayer.png' },
    { name: "Quran Memorization Test", title: 'Last entry for Quran Memorization :', number: 66, per: "90%", image: 'assets/icon/prayer.png' }
  ]
      }else if(this.timePeriod=="PM"){
       return  localStorage.getItem('lang') === 'ar' ?[
 
    { name: "إتمام القرآن",  title: 'آخر قراءة للقرآن: ', number: 55, per: "4%", image: 'assets/icon/islamic.png' },
    { name: "أذكار المساء", title: 'آخر أذكار تم قراءتها:', number: 6, per: "76%", image: 'assets/icon/prayer.png' },
    { name: "اختبار حفظ القرآن", title: 'آخر أذكار تم قراءتها:', number: 66, per: "90%", image: 'assets/icon/prayer.png' }
  
  ]:[
    { name: "Quran Completion", title: 'Last Read Al-Quran : ', number: 55, per: "4%", image: 'assets/icon/islamic.png' },
    { name: "Evening Adhkar", title: 'Last Read Evening remembrance : ', number: 77, per: '23%', image: 'assets/icon/exam.png' },
    { name: "Quran Memorization Test", title: 'Last entry for Quran Memorization :', number: 66, per: "90%", image: 'assets/icon/prayer.png' }
  ]}
     }*/
  
async prayer_times() {
  try {
    console.log(localStorage.getItem('lang'));

    // استخدام await لانتظار البيانات من الخدمة
    const data: any = await this.service.prayer_times({
      country: this.country_api,
      city: this.city_api
    }).toPromise(); // تحويل الـ Observable إلى Promise

    // استخراج أسماء الصلوات
    this.prayer_name = Object.keys(data);

    // استخراج أوقات الصلوات
this.prayer_timee = Object.values(data);

// نأخذ التاريخ (سواء "4-4-2025" أو "24 Sep 2025")
const rawDate = this.prayer_timee[6];

// نصنع كائن Date
const dateValue = new Date(rawDate);

// لو كان التاريخ مكتوب بصيغة غير مفهومة من Date (مثلاً "4-4-2025" يفسرها شهر 4 يوم 4)

if (rawDate.includes("-") && rawDate.split("-").length === 3) {
  const [day, month, year] = rawDate.split("-");
  // ننتبه: الأشهر تبدأ من 0
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  this.prayer_timee[6] = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(parsed);
} else {
  if(localStorage.getItem('lang') === 'ar'){  this.prayer_timee[6] = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(dateValue);}
  // إذا كان التاريخ أصلاً مفهوم (زي Sep أو غيره)

}
    const options = {
    day: 'numeric',
   month: 'long',
   year: 'numeric'
   };

    // حفظ كامل البيانات
    this.i = data;

    // تفريغ المصفوفة قبل إعادة تعبئتها
    this.times = [];

    // تعبئة أول 6 صلوات فقط مع الصور
    Object.keys(data).forEach((key, index) => {
      if (index < 6) {
        this.times.push({
          name: key,
          time: data[key],
          image: this.list_time1[index]
        });
      }
    });

    console.log('أوقات الصلاة:', this.times);

  } catch (error) {
    console.error('حدث خطأ أثناء جلب أوقات الصلاة:', error);
  }
}

  async checkLocationEnabledt() {
  // 1. عرض رسالة توضيحية أولاً
  const infoAlert = await this.alertController.create({
    header: 'طلب إذن الموقع',
    message: 'يحتاج التطبيق للوصول إلى موقعك لتحديد المدينة الحالية.',
    buttons: [
      {
        text: 'موافق',
        handler: async () => {
          // بعد الضغط على موافق نطلب الصلاحية
          const permission = await Geolocation.requestPermissions();

          if (permission.location !== 'granted') {
            await this.showAlertno('تم رفض إذن الموقع. يرجى تفعيله من إعدادات التطبيق.');
            return;
          }

        try {
            this.position = await Geolocation.getCurrentPosition();
            this.latitude = this.position.coords.latitude;
            this.longitude = this.position.coords.longitude;

            console.log('📍 Location:', this.latitude, this.longitude);

            await this.getCityFromCoordinates(this.latitude, this.longitude);
          } catch (error: any) {
            console.error('❌ Error getting location', error);
            await this.showAlertno('تعذر الحصول على الموقع. تحقق من GPS أو الأذونات.');
          }
        },
      },
    ],
  });

  await infoAlert.present();
}

async checkLocationEnabledغ() {
  // 1. نعرض تنبيه للمستخدم لطلب الموافقة المبدئية
  const confirmAlert = await this.alertController.create({
    header: 'طلب إذن الموقع',
    message: 'يحتاج التطبيق للوصول إلى موقعك لتحديد المدينة الحالية. هل تسمح بذلك؟',
    buttons: [
      {
        text: 'لا',
        role: 'cancel',
        handler: () => {
          console.log('❌ المستخدم رفض السماح');
        },
      },
      {
        text: 'نعم',
        handler: async () => {
          // 2. إذا وافق، نطلب الصلاحية من النظام
          const permission = await Geolocation.requestPermissions();

          if (permission.location !== 'granted') {
            await this.showAlertno('تم رفض إذن الموقع. يرجى تفعيله من إعدادات التطبيق.');
            return;
          }

          // 3. نحصل على الموقع
          try {
            this.position = await Geolocation.getCurrentPosition();
            this.latitude = this.position.coords.latitude;
            this.longitude = this.position.coords.longitude;

            console.log('📍 Location:', this.latitude, this.longitude);

            await this.getCityFromCoordinates(this.latitude, this.longitude);
          } catch (error: any) {
            console.error('❌ Error getting location', error);
            await this.showAlertno('تعذر الحصول على الموقع. تحقق من GPS أو الأذونات.');
          }
        },
      },
    ],
  });

  await confirmAlert.present();
}

 async checkLocationEnabled() {
  try {
    const perm = await Geolocation.checkPermissions();

    if (perm.location !== 'granted') {
      const req = await Geolocation.requestPermissions();
      if (req.location !== 'granted') {
        return this.showAlertno('تحتاج إذن الموقع.');
      }
    }

    if (await this.locationAccuracy.canRequest()) {
      await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    }

    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    console.log('📍', pos.coords.latitude, pos.coords.longitude, '±', pos.coords.accuracy, 'm');

    if (pos.coords.accuracy > 30) {
      console.warn('الدقة منخفضة –', pos.coords.accuracy, 'م');
    }

    this.latitude = pos.coords.latitude;
    this.longitude = pos.coords.longitude;
    //this.latitude=32.0728;
    //this.longitude=36.0870;
     //this.latitude=29.5267;
    //this.longitude=35.0078;
    await this.getCityFromCoordinates(this.latitude, this.longitude);

  } catch (error) {
    console.error('❌ Error getting location', error);
    if (localStorage.getItem('lang') === 'ar') {this.text="موافق";this.loc='الموقع'; this.showAlertno('تعذر الحصول على الموقع. تحقق من الأذونات وإعدادات GPS.');}else{this.text="ok";
      this.loc='Location';
      await this.showAlertno('Failed to get location. Check permissions and GPS settings.');}
   
  }
}

async checkLocationEnabled1() {
    try {
      console.log('🔍 Requesting current position...');
      this.position = await Geolocation.getCurrentPosition();

      this.latitude = this.position.coords.latitude;
      this.longitude = this.position.coords.longitude;

      console.log('📍 Location:', this.latitude, this.longitude);
const alert = await this.alertController.create({
  header: 'الموقع',
  message: 'هل توافق على السماح للتطبيق بالوصول إلى موقعك؟',
  buttons: [
    {
      text: 'لا',
      handler: async () => {
        console.log('❌ المستخدم رفض الوصول');
        await this.showAlertno('تم رفض إذن الوصول للموقع.');
      }
    },
    {
      text: 'مفوافق',
      handler: async () => {
        console.log('✅ المستخدم وافق على الوصول');
        await this.getCityFromCoordinates(this.latitude, this.longitude);
       
        this.afterOkPressed();
      }
    }
  ]
});

await alert.present();




      

    } catch (error: any) {
      console.error('❌ Error getting location', error);
      await this.showAlertno('تعذر الحصول على الموقع. تحقق من الأذونات.');
    }
  }
  // ✅ استرجاع اسم المدينة من الإحداثيات
getCityFromCoordinates(latitude: number, longitude: number) {      console.log('this.citDDDDDDDDDDDDDDDDDDDDDDy');
  const apiKey = '0c9ea507ed234dfeae819d5aa377bfb3'; // استبدل بـ API Key الخاص بك
 const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=${localStorage.getItem('lang')}&apiKey=${apiKey}`;
;

  this.http.get(url).subscribe((response: any) => {
    if (response && response.features && response.features.length > 0) {
      const props = response.features[0].properties;
      console.log(props);
      const city = props.state || 'غير معروف';
      const country = props.country || 'غير معروف';

      this.city_api = this.removeDiacritics(city);
      this.country_api = this.removeDiacritics(country);
      this.city = `${this.city_api}, ${this.country_api}`;
       this.prayer_times();
      console.log(this.city);

      //this.prayer_times();
    } else {
      this.city = 'الموقع غير معروف';
    }
  }, (error) => {
    console.error('🌐 Geoapify API error:', error);
    this.city = 'تعذر الحصول على معلومات المدينة';
  });
}


  // ✅ عرض تنبيه


async showAlertno(message: string) {
  const alert = await this.alertController.create({
    header:this.loc,
    message: message, //backdropDismiss: false, 
    buttons: [
      {
        text: this.text,
        handler: () => {
         this.checkLocationEnabled();
          console.log('تم الضغط على OK');

          // مثال: استدعاء دالة أخرى
          this.afterOkPressed();
        }
      }
    ],
  });

  await alert.present();
}
async showAlertyes(message: string) {
  const alert = await this.alertController.create({
    header: localStorage.getItem('lang') === 'ar' ? 'الموقع' : 'Location',

    message: message,
    buttons: [
      {
        text: 'OKkk',
        handler: () => {
         this.checkLocationEnabled();
          console.log('تم الضغط على OK');

          // مثال: استدعاء دالة أخرى
          this.afterOkPressed();
        }
      }
    ],
  });

  await alert.present();
}
afterOkPressed() {
  // كود إضافي يتم تنفيذه بعد الضغط على OK
  console.log('تم تنفيذ الكود بعد الضغط على OK');
}


  // ✅ تنبيه بسيط بلغة المستخدم
  async presentAlert() {
    const message = 'this.name';
    const buttons = [localStorage.getItem('lang') === 'ar' ? 'موافق' : 'ok'];
    const alert = await this.alertController.create({
      message,
      buttons
    });
    await alert.present();
  }

  // ✅ طلب إذن الوصول للموقع
  async requestLocationPermission() {
    const alert = await this.alertController.create({
      header: 'الصلاحيات المطلوبة',
      message: 'نحتاج للوصول إلى موقعك لتوفير معلومات دقيقة.',
      buttons: [
        {
          text: 'السماح',
          handler: () => {
            this.getLocation();
          },
        },
        {
          text: 'رفض',
          handler: () => {
            console.log('تم رفض الوصول إلى الموقع من قبل المستخدم.');
            this.city = 'تم رفض الوصول إلى الموقع';
          },
        },
      ],
    });

    await alert.present();
  }

  // ✅ استخدام Capacitor لتحديد الموقع
  async getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      this.city = 'تم الحصول على الموقع';
    } catch (error) {
      console.error('❌ Error getting location', error);
      this.city = 'حدث خطأ في تحديد الموقع';
      this.presentAlert();
    }
  }

  // ✅ تسجيل الخروج
  logout() {
    localStorage.setItem('login', 'false');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.router.navigate(['/login']);
  }

  // ✅ تنقل بين الصفحات
  nav(num: any) {
    if (num === 1 || num === 2) {
      this.router.navigate(['/rest-password']);
    } else if (num === 3) {
      this.router.navigate(['/setting']);
    }
  }
   removeDiacritics(text: string): string {
  // Unicode range for Arabic diacritics: 064B–0652
  return text.replace(/[\u064B-\u0652]/g, "");
}
style_image2() {
  if (this.keyboardOpen) {
    return 'display: none;';
  }

  const baseStyle = 'width: 34%; position: fixed; bottom: 0; z-index: 10;';
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + ' right: 0;';
  } else {
    return baseStyle + ' left: 0;';
  }
}
style_image3() {
  if (this.keyboardOpen) {
    return 'display: none;';
  }

  const baseStyle = 'width: 50%; position: fixed; bottom: 0; z-index: 10;';
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + 'left : 0;';
  } else {
    return baseStyle + 'right: 0;';
  }
}
sp(){const baseStyle = 'width:3vw; height:3vh; ';
   const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + 'transform:rotate(-180deg); ';
  } else {
    return baseStyle;
  }
}prayerName(){ 
  if(localStorage.getItem('lang')=='ar'){
  return [
  "الفجر",
  "الشروق",
  "الظهر",
  "العصر",
  "المغرب",
  "العشاء"
];
}else{return [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha"
]}}
list_prayer=[]
img(){
 if(this.user.gender=='MALE'){
  console.log('this.user.gender');
  return 'assets/icon/man3.png';
 } else{return 'assets/icon/moslem-woman.png'}
}
prayer() {
  const myMap = new Map<string, string>();
  myMap.set('Fajr', 'الفجر');
  myMap.set('Sunrise', 'الشروق');
  myMap.set('Dhuhr', 'الظهر');
  myMap.set('Asr', 'العصر');
  myMap.set('Maghrib', 'المغرب');
  myMap.set('Isha', 'العشاء');

  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    for (const name of Array.from(myMap.keys())) {
      if (name === this.prayer_timee[8]) {
        return myMap.get(name); // ✅ استخدم get بدلاً من [name]
      }
    }
  } else {
    return this.prayer_timee[8];
  }
}val(v: string) {console.log(v);
  if (v === 'Tesbeeh' || v === 'التسبيح') {
    this.router.navigate(['/tasbeeh']);
  } else if (v === 'Al-Quran' || v === 'القرآن الكريم') {
    this.router.navigate(['/quran']);
  } else if (v === 'AL-Hadith' || v === 'الحديث الشريف') {
   
  } else if (v === 'Tafsir' || v === 'التفسير') {
  
  } else if (v === 'Dua' || v === 'الدعاء') {
    this.router.navigate(['/Supplications']);
  } else if (v === 'Adhkar' || v === 'الاذكار') {
   
  } else if (v === 'Test' || v === 'اختبار') {
   
  }
}
val1(v){
  if(v=='Quran Completion'||v=="إتمام القرآن"){}else if(v=='Evening Adhkar'||v== "أذكار المساء"){this.router.navigate(['/morning-adhkar']);}else if(v=='Quran Memorization Test'||v=="اختبار حفظ القرآن"){this.router.navigate(['/quran']);}
  else if(v=="Morning Adhkar"||v=="أذكار الصباح"){this.router.navigate(['/quran']);}
}
}

interface Model {
  name: string;
  time: string;
  image: string
}