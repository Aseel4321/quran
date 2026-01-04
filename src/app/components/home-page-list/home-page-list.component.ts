import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import Swiper from 'swiper/types/swiper-class';
import { AuthService } from '../../auth/auth-service/auth.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { MainServiceService } from '../../main-service/main/main-service.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-home-page-list',
  templateUrl: './home-page-list.component.html',
  styleUrls: ['./home-page-list.component.scss'],
})
export class HomePageListComponent  implements OnInit{list:[]=[];name:string;


  login(){
    this.service.remembrance(localStorage.getItem('lang') === 'ar'?'AR':'EN',this.service.name).subscribe(
      (data: any) => {
        this.list=data;
        console.log(data);
      },
      (e: HttpErrorResponse) => {  console.log('e');
        console.log(e); console.log('ee');
    
      }
    );   
  }
  delete(){console.log('fllowifng');
    this.service.following(
  2601042138368739
).subscribe((data:any)=>{ console.log('fllowing');console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{ }
    });
  
   } 
   delete4(){
   
    this.service.notifications_user().subscribe((data:any)=>{ console.log('ggggghhhhhhhhhhhhhhhhhhhhhhhhhdddddddddddddd');console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{  console.error(error); 
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
       
  
        }else{  }
    });
  
   }
   follow(){
    this.service.follow({
  "userId":2601042154758159,
 "targetUserId":2512150339932840
}).subscribe((data:any)=>{ console.log('follow');console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
        }else{console.error(error.error); }
    });
   }
  reject(){ 
    this.service.reject({
  "userId":'25112120553613034',
 "targetUserId":'25120423213215690'
}).subscribe((data:any)=>{ console.log('follodw');console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{    console.error(error.error); }
    });
  
   } 
   accept(){
   
   this.service.accept({
   userId:2601042343849858,
    targetUserId:2512150339932840
}).subscribe((data:any)=>{ console.log('follodw');console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{    console.error(error.error); }
    });
  
   }
  unfollow(){
    this.service.unfollow({
  "userId":'25120423213215690',
 "targetUserId":'25112120553613034'
}).subscribe((data:any)=>{ console.log('follodw');console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{    console.error(error.error); }
    });
  
   }
   cards = [
    { text: 'Morning Supplications', image: 'assets/icon/morning.png' },
    { text: 'Evening Supplications', image: 'assets/icon/evning.png' },
    { text: 'Supplications before Sleep', image: 'assets/icon/sleep.png' },
    { text: 'Supplications upon Waking Up', image: 'assets/icon/waking-up.png' },
    { text: 'Supplications after Prayer', image: 'assets/icon/prayerr.png' }
  ];
  list_type() {if(this.service.text_name!='AL-Hadith'){
 return localStorage.getItem('lang') === 'ar'
    ? [
        { text: 'أحاديث عن طلب العلم'},
        { text: 'أحاديث عن فضل القرآن'},
        { text: 'أحاديث عن الأخلاق'},
        { text: 'احاديث عن النية والإخلاص'},
     
      ]
    : [
        { text: 'Hadiths About Seeking Knowledge'},
        { text: 'Hadiths About the Virtue of the Qur’an'},
        { text: 'Hadiths About Good Manners'},
        { text: 'Hadiths About Intention and Sincerity'},
      ];
  }else{ return localStorage.getItem('lang') === 'ar'
    ? [
        { text: 'دعاء السفر', image: 'assets/icon/morning.png' },
        { text: 'دعاء الخروج من المنزل', image: 'assets/icon/evning.png' },
        { text: 'دعاء من أجل المتوفى', image: 'assets/icon/sleep.png' },
        { text: 'دعاء للقلق والحزن', image: 'assets/icon/waking-up.png' },
        { text: 'دعاء زيارة القبور', image: 'assets/icon/prayerr.png' },
      ]
    : [
        { text: 'Prayer for Travel', image: 'assets/icon/morning.png' },
        { text: 'Prayer When Leaving the House', image: 'assets/icon/evning.png' },
        { text: 'Prayer for the Deceased', image: 'assets/icon/sleep.png' },
        { text: 'Prayer for Worry and Sadness', image: 'assets/icon/waking-up.png' },
        { text: 'Prayer for Visiting Graves', image: 'assets/icon/prayerr.png' },
      ];}
 
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
  'font-family': '"Jomolhari", serif',  
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
  constructor(private platform: Platform,private cdr: ChangeDetectorRef,private router: Router,private servicea: AuthService,private service: MainServiceService ){}
  ngOnInit(): void {this.name=this.service.name;
    this.login(); this.follow();this.accept();this.delete();
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
click(v){console.log(v)
  this.service.name1=v;
  this.router.navigate(['/tasbeeh']);
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
