import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {time_now:any;
  constructor(
    private platform: Platform,
    private translate: TranslateService
  ) { 
    this.initializeApp();
  }

  ngOnInit(): void {}

  initializeApp() {
  this.platform.ready().then(() => {
    const deviceLang = navigator.language?.split('-')[0] || 'en';
    const supportedLangs = ['en', 'ar'];
    const lang = localStorage.getItem('lang');
    if (!lang) {
  const langToUse =supportedLangs.includes(deviceLang) ? deviceLang : 'en';
localStorage.setItem('lang',langToUse);
    //this.translate.setDefaultLang('ar');
    this.translate.use(langToUse);  if (langToUse === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
}else{ const langToUse =localStorage.getItem('lang');
localStorage.setItem('lang',langToUse);
    //this.translate.setDefaultLang('ar');
    this.translate.use(langToUse);  if (langToUse === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }}
    


  
    /*if (langToUse === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }*/

    // إخفاء شاشة البداية
    SplashScreen.hide();
  });
}
}
