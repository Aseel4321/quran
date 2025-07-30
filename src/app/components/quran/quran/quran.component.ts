import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quran',
  templateUrl: './quran.component.html',
  styleUrls: ['./quran.component.scss'],
})
export class QuranComponent  {show="surah";i:any=0; color:string='#1a1a1a';
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
}
