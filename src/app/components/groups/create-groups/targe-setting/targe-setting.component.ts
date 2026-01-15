import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-targe-setting',
  templateUrl: './targe-setting.component.html',
  styleUrls: ['./targe-setting.component.scss'],
})
export class TargeSettingComponent{
isOpen = false;
selectedMethod = '';

toggleDropdown() {
  this.isOpen = !this.isOpen;
}
// dropdown
 
  readingMethod: string | null = null;

  // selections
  dailyTarget = 'pages';
  duration = 'weeks';
  difficulty = 'intermediate';

  

  selectDailyTarget(value: string) {
    this.dailyTarget = value;
  }

  selectDuration(value: string) {
    this.duration = value;
  }

  selectDifficulty(value: string) {
    this.difficulty = value;
  }

  continue() {
    const data = {
      readingMethod: this.readingMethod,
      dailyTarget: this.dailyTarget,
      duration: this.duration,
      difficulty: this.difficulty
    };

    console.log(data);
  }selectOption(type: string) {
  this.selectedMethod = type;
  this.isOpen = false; // تغلق القائمة بعد الاختيار
}


}

