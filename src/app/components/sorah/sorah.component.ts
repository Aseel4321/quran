import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorah',
  templateUrl: './sorah.component.html',
  styleUrls: ['./sorah.component.scss'],
})
export class SorahComponent  {i:any='.';lang = 'en';flipStyle1 = {
  width: '12vw',
  cursor: 'pointer',
  userSelect: 'none',
  transform: 'scaleX(-1)'
};
flipStyle = {
  width: '12vw',
  cursor: 'pointer',
  userSelect: 'none',
};slideOpts = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 1, 
  direction: 'horizontal', 
};showItem = false;Tafsir(){this.showItem=true;}
list = [
    'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ',
    'الـحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    'الرَّحْمَـٰنِ الرَّحِيمِ',
    'مَالِكِ يَوْمِ الدِّينِ',
    'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ',
    'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
];list11 = [
    '1'
]
 list1 = [ 
    "aseel",'hadeel','ghaleb','aseellllll43rrrrr ghaleb hammad shitiwi','hadeel',"aseel",'hadeel','ghaleb','aseel ghaleb hammad shitiwi4ee','hadeel'
,"aseel hammad shitiwi",'hadeel hammad shitiwi','ghaleb','aseel ghaleb hammad shitiwi','hadeel','ghaleb','aseellllll43rrrrr ghaleb hammad shitiwi','hadeel',"aseel",'hadeel','ghaleb','aseel ghaleb hammad shitiwi4ee','hadeel'
,"aseel hammad shitiwi",'hadeel hammad shitiwi','ghaleb','aseel ghaleb hammad shitiwi aseel ghaleb hammad shitiwi ',

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
Style1(i){
if(i===this.i){
  return { 
  'font-size': '5.5vw',
  'background-color':'rgb(233, 233, 193)',
 'margin-inline-end': '1vw','margin-inline-start': '-1vw',
    }; 
}else{ return {
  'font-size': '5.5vw','margin-inline-end': '1vw','margin-inline-start': '-1vw',
    };}
}Style(i){
if(i===this.i){
  return { 
  'font-size': '4vw',
  'background-color':'rgb(233, 233, 193)',
 'margin-inline-end': '-20vw','margin-inline-start': '35vw',
    }; 
}else{ return {
  'font-size': '4vw','margin-inline-end': '1vw','margin-inline-start': '-1vw',
    };}
}
onclick(){
  this.i='.';
}
onclickclose(){
  this.open=false;
}
Style_r(i) {
  if (i === this.i) {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
flip(){
  const lang = localStorage.getItem('lang');

    if (lang === 'ar') {
      return this.flipStyle;
    } else {
      return this.flipStyle1;
    }
}flip1(){
  const lang = localStorage.getItem('lang');

    if (lang === 'ar') {
      return this.flipStyle1
    } else {
      return this.flipStyle;;
    }
}
}
