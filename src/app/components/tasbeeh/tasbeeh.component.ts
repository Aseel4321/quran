import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import SwiperCore, { Swiper, SwiperOptions } from 'swiper';


@Component({
  selector: 'app-tasbeeh',
  templateUrl: './tasbeeh.component.html',
  styleUrls: ['./tasbeeh.component.scss'],
})
export class TasbeehComponent  implements OnInit{
    initialHeight: number = window.innerHeight;
keyboardOpen: boolean = false;
 isKeyboardOpen: boolean = false;
swiperRef!: Swiper;
  totalSlides: number = 0;
  currentSlide: number = 0;
  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
private lockInProgress = false;
  constructor(private platform: Platform,private cdr: ChangeDetectorRef){}
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
  show="surah";i:any=0; color:string='#1a1a1a';
  list:any=['Surah','Part','Page'];
  click(i){
    this.i=i;
if(i==0){
this.show='surah';
}else if(i==1) {this.show='part';}else {this.show='page';}
  }
 style(i){
    if(i==this.i){
   return {
    color: '#2e2e2e',         // لون غامق
    cursor: 'pointer',        // لتغيير شكل المؤشر عند التحويم
           // مسافة داخلية
    textDecoration: 'underline'  // 🔴 تضيف خطًا تحت النص
  };
;
  
}else{return {
    color: '#000000ff',         // لون غامق
    cursor: 'pointer',        // لتغيير شكل المؤشر عند التحويم
           // مسافة داخلية
  // 🔴 تضيف خطًا تحت النص
  }}
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

  const baseStyle = ' position: fixed; bottom:5%; z-index: 10;';
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
    return  'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);margin-top: 7%;height: 13vw;width: 13vw;margin-inline-start: 20vw;width:50%;position: absolute;margin-top:3vw';
  } else {
    return 'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);margin-top: 7%;height: 13vw;width: 13vw;margin-inline-end: 20vw;position: absolute;margin-top:3vw';
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
  slides = ['A', 'B', 'C', 'D', 'E']; // يمكنك وضع أي بيانات بدلًا من A وB وC...
 

 list1 = [1, 2, 3,]; // بعدد السلايدات

onSwiper(swiper: Swiper) {
  this.swiperRef = swiper;
  this.totalSlides = swiper.params.loop
    ? swiper.slides.length - 2
    : swiper.slides.length;

  // ضبط البداية للـ first slide
  this.currentSlide = 0;

  console.log('init:', this.currentSlide);
}
  onSlideChange() {
    if (this.swiperRef) {
      this.currentSlide = this.swiperRef.realIndex;
      console.log('change:', this.currentSlide);this.cdr.detectChanges(); 
    }
  }
  Color(i: number) {;
    return {
      width: '8vw',
      height: '1vw',
      'margin-inline-end': '10%',
      'background-color':
        this.currentSlide === i
          ? 'hsla(39, 100%, 73%, 1)'
          : 'rgb(216, 222, 222)',
    };
  }
}



