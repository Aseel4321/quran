import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import Swiper from 'swiper/types/swiper-class';

import { ScreenOrientation } from '@capacitor/screen-orientation';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
@Component({
  selector: 'app-home-page-page',
  templateUrl: './home-page-page.component.html',
  styleUrls: ['./home-page-page.component.scss'],
})
export class HomePagePageComponent

 {

   cards = [
    { text: 'Morning Supplications', image: 'assets/icon/morning.png' },
    { text: 'Evening Supplications', image: 'assets/icon/evning.png' },
    { text: 'Supplications before Sleep', image: 'assets/icon/sleep.png' },
    { text: 'Supplications upon Waking Up', image: 'assets/icon/waking-up.png' },
    { text: 'Supplications after Prayer', image: 'assets/icon/prayerr.png' }
  ];
  list_type() {
  return localStorage.getItem('lang') === 'ar'
    ? [
        { text: 'أذكار الصباح', image: 'assets/icon/morning.png' },
        { text: 'أذكار المساء', image: 'assets/icon/evning.png' },
        { text: 'أذكار النوم', image: 'assets/icon/sleep.png' },
        { text: 'أذكار الاستيقاظ', image: 'assets/icon/waking-up.png' },
        { text: 'أذكار بعد الصلاة', image: 'assets/icon/prayerr.png' },
      ]
    : [
        { text: 'Morning Supplications', image: 'assets/icon/morning.png' },
        { text: 'Evening Supplications', image: 'assets/icon/evning.png' },
        { text: 'Supplications before Sleep', image: 'assets/icon/sleep.png' },
        { text: 'Supplications upon Waking Up', image: 'assets/icon/waking-up.png' },
        { text: 'Supplications after Prayer', image: 'assets/icon/prayerr.png' },
      ];
}title() {
  if (localStorage.getItem('lang') === 'ar') {
    return {
        'font-family': '"El Messiri", sans-serif',
      'font-weight': '500',
      'text-align': 'center',
      'margin-top': '5vw',
    'font-size': '8vw'
    };
  } else {
   return {
  'font-family': '"Jomolhari", serif',  // تغيير الخط هنا
  'font-weight': '500',
  'text-align': 'center',
  'margin-top': '5vw',
  'font-size': '7vw'
};

  }
}
    initialHeight: number = window.innerHeight;
keyboardOpen: boolean = false;
 isKeyboardOpen: boolean = false;
swiperRef!: Swiper;
  totalSlides: number = 0;
  currentSlide: number = 0;
  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
private lockInProgress = false;
  constructor(private platform: Platform,private cdr: ChangeDetectorRef,private router: Router,private servicea: AuthService ){}
  ngOnInit(): void {
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

 goBack() {
  this.router.navigate(['/home-page']);
}
style_image2() {
  if (this.keyboardOpen) {
    return 'display: none;';
  }

  const baseStyle = 'width:38%; position: fixed; bottom: 0; z-index: 10;';
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + ' right: 0;';
  } else {
    return baseStyle + ' left: 0;';
  }
}style_image3(){
  if (this.keyboardOpen) {
    return 'display: none;';
  }

  const baseStyle = ' position: fixed; bottom:7%; z-index: 10;width:25%;';
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + ' left: 0;';
  } else {
    return baseStyle + ' right: 0;';
  }
}
c1_image(){
  if (this.keyboardOpen) {
    return 'display: none;';
  }

  const baseStyle = 'width:33%; position: fixed; bottom: 0; z-index: 10;';
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + ' right: 0;';
  } else {
    return baseStyle + ' left: 0;';
  }
}
c2_image(){
  
  if (this.keyboardOpen) {
    return 'display: none;';
  }

  
  const lang = localStorage.getItem('lang');
  if (lang === 'ar') {
    return  'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);margin-top: 7%;height: 13vw;width: 13vw;margin-inline-start: 20vw;position: absolute;margin-top:3vw';
  } else {
    return 'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);margin-top: 7%;height: 13vw;width:13vw;margin-inline-end: 20vw;position: absolute;margin-top:3vw';
  }

}
c3_image(){
  if (this.keyboardOpen) {
    return 'display: none;';
  }

 
  const lang = localStorage.getItem('lang');

   if (lang === 'ar') {
    return  'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);margin-top: 7%;height: 13vw;width: 13vw;margin-inline-start: 20vw;width:50%;position: absolute;margin-top:3vw';
  } else {
    return 'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);margin-top: 7%;height: 13vw;width: 13vw;margin-inline-end: 20vw;position: absolute;margin-top:3vw';
  }
}
  
  
}


