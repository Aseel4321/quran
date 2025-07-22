import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(private translate: TranslateService,private router: Router,private cdRef: ChangeDetectorRef){}
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
iconDirection: string = 'arrow-forward';

onCityChange(event: any) {
  const city = event.detail.value;

  if (city === 'en') {
    this.lang = this.lang_en;
    this.selectedCity = 'en';
    this.iconDirection = 'arrow-forward';  // سهم لليمين للإنجليزية
    document.documentElement.dir = 'ltr';
  } else {
    this.lang = this.lang_ar;
    this.selectedCity = 'ar';
    this.iconDirection = 'arrow-back';  // سهم لليسار للعربية
    document.documentElement.dir = 'rtl';
  }

  localStorage.setItem('lang', city);
  this.translate.use(city);
}
icon(){
     if(localStorage.getItem('lang')=='ar'){ return 'arrow-back';}else{return 'arrow-forward';}
 }
  ngOnInit() {//this.lang_text="en";
  this.lang_text= localStorage.getItem('lang');
  if(this.lang_text=='ar'){this.selectedCity='ar';
this.lang=this.lang_ar;
  }else{this.selectedCity='en'; this.lang=this.lang_en;}
  console.log(this.lang_text=='ar');
  }
logout(){ console.log(localStorage.getItem('login'));
 localStorage.setItem('login','false'); 
 console.log(localStorage.getItem('login'));
 const user = JSON.parse(localStorage.getItem('user') || '{}');
 this.router.navigate(['/login']);

}
}
