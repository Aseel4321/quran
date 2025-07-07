import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(private translate: TranslateService){}
   lang_text='';
   lang=[];
lang_en:any = [{'code':'ar','lang':'Arabic'},{'code':'en','lang':'English'}];
lang_ar:any = [{'code':'ar','lang':'عربي'},{'code':'en','lang':'انجليزي'}];
// في TypeScript
selectedCity: string = '';
notificationsEnabled: boolean = true;
toggleChanged(event: any) {
  console.log('Toggle value:', event.detail.checked);
}
 onCityChange(event: any) { 
    const city = event.detail.value;
  
    if (city === 'en') { 
      this.lang=this.lang_en;
      this.selectedCity='en';
      localStorage.setItem('lang',city);
      //this.lang_text= localStorage.getItem(city);
       this.translate.use(city);

  // إذا كنت تستعمل اللغة العربية
  document.documentElement.dir = city === 'ar' ? 'rtl' : 'ltr';
    }else{localStorage.setItem('lang',city); this.selectedCity='ar';this.lang=this.lang_ar;  //
    // this.lang_text= localStorage.getItem(city);
       this.translate.use(city);

  // إذا كنت تستعمل اللغة العربية
  document.documentElement.dir = city === 'ar' ? 'rtl' : 'ltr';}
  }

  ngOnInit() {//this.lang_text="en";
  this.lang_text= localStorage.getItem('lang');
  if(this.lang_text=='ar'){this.selectedCity='ar';
this.lang=this.lang_ar;
  }else{this.selectedCity='en'; this.lang=this.lang_en;}
  console.log(this.lang_text=='ar');
  }

}
