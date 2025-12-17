import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quran',
  templateUrl: './quran.component.html',
  styleUrls: ['./quran.component.scss'],
})
export class QuranComponent implements OnInit {
    initialHeight: number = window.innerHeight;
keyboardOpen: boolean = false;
 isKeyboardOpen: boolean = false;
  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
private lockInProgress = false;
  constructor(private platform: Platform,private location: Location,private router: Router){}
  receiveMessage(msg: string) {
  console.log('القيمة من الابن:', msg);
}
  ngOnInit(): void {
    this.lockInProgress = false;

  this.platform.ready().then(() => {const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
      const width = this.platform.width();
      console.log('Screen Height:', height);
      console.log('Screen Width:', width);
    this.initialHeight = window.innerHeight; 
    
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
  }goBack() {
  this.router.navigate(['/home-page']);
}title() {
  if (localStorage.getItem('lang') === 'ar') {
    return {
        'font-family': '"El Messiri", sans-serif',
      'font-weight': '600',
      'text-align': 'center',
      'margin-top': '-3.5vw',
    'font-size': '7vw'
    };
  } else {
   return {
  'font-family': '"Jomolhari", serif',  // تغيير الخط هنا
  'font-weight': '500',
  'text-align': 'center',
  'margin-top': '-4vw',
  'font-size': '9.5vw'
};

  }
}
  show="surah";i:any=0; color:string='#1a1a1a';
  
  list(){ 
  if(localStorage.getItem('lang')=='ar'){
  return [
"سوره","جزء","صفحه"
];
}else{return ['Surah','Part','Page']}}
  click(i){
    this.i=i;
if(i==0){
this.show='surah';
}else if(i==1) {this.show='part';}else {this.show='page';}
  }
 style(i){
    if(i==this.i){
   return {
    color: '#9d9e97ff',         // لون غامق
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

  const baseStyle = 'width: 30%; position: fixed; bottom: 0; z-index: 10;';
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') {
    return baseStyle + 'left : 0;';
  } else {
    return baseStyle + 'right: 0;';
  }
}
style_image() {
 

  const baseStyle = "position: fixed; width: 60%;margin-inline-end: 90%;margin-top: 12%;margin-bottom: 0%;";
  const lang = localStorage.getItem('lang');

  if (lang === 'ar') { return baseStyle + ' transform: scaleX(-1);';
   
  } else {
     return baseStyle + 'left : 0;';
  }
}
}
