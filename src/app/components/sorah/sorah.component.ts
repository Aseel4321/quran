import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorah',
  templateUrl: './sorah.component.html',
  styleUrls: ['./sorah.component.scss'],
})
export class SorahComponent  {i:any='.';lang = 'en';slideOpts = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 1, // كل شريحة تعرض عنصر واحد
  direction: 'horizontal', // يمكنك تغييرها إلى vertical إذا أحببت
};
list1 = [
    'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ',
    'الـحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    'الرَّحْمَـٰنِ الرَّحِيمِ',
    'مَالِكِ يَوْمِ الدِّينِ',
    'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ',
    'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
]
 list = [ 
    "hhhh1",'hhhhhhhhdf2','gggdfdg3','ffffff fffffffff ffffff ffffffffff4','dfsaedsedfaaaa sfsddddd ddfsdf5','fff hhhhhh ff6'
]
click(i:number){
 this.i=i;
 
 

console.log(this.i);
}
isSheetOpen = false;

openSheet() {
  this.isSheetOpen = true;
}
closeSheet() {
  this.isSheetOpen = false;
  
}
 open = false;


toggle() {
  this.open = true;
}
Style(i){
if(i===this.i){
  return { 
  'font-size': '7vw',
  'background-color':'rgb(233, 233, 193)',
 'margin-inline-end': '1vw','margin-inline-start': '-1vw',
    }; 
}else{ return {
  'font-size': '7vw','margin-inline-end': '1vw','margin-inline-start': '-1vw',
    };}
}
onclick(){
  this.i='.';this.open=false;
}
Style_r(i) {
  if (i === this.i) {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
  // ← هذا يجعل المربع يكون في نهاية السطر
      width: '15vw',
      height: '4vh',
      backgroundColor: '#4caf50',
      borderRadius: '10px',
      alignItems: 'center',
   

    };
  } else {
    return { display: 'none' };
  }
}

}
