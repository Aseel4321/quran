
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { IonSlides, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import SwiperCore, { Swiper, SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-supplications',
  templateUrl: './supplications.component.html',
  styleUrls: ['./supplications.component.scss'],
})
export class SupplicationsComponent   implements OnInit{
 
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
  constructor(private platform: Platform,private cdr: ChangeDetectorRef,private router: Router,private location: Location,){}
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

  const baseStyle = 'width:33%; position: fixed; bottom: 0; z-index: 10;';
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

  const baseStyle = ' position: fixed; bottom:7%; z-index: 10;';
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