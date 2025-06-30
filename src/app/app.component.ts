import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
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
    const langToUse = supportedLangs.includes(deviceLang) ? deviceLang : 'en';
localStorage.setItem('lang',langToUse);
    //this.translate.setDefaultLang('ar');
    this.translate.use(langToUse);

    // ✅ تعيين الاتجاه RTL أو LTR بناءً على اللغة
    if (langToUse === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    // إخفاء شاشة البداية
    SplashScreen.hide();
  });
}
}
