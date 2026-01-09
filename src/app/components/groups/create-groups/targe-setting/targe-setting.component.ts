import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-targe-setting',
  templateUrl: './targe-setting.component.html',
  styleUrls: ['./targe-setting.component.scss'],
})
export class TargeSettingComponent implements OnInit {
isOpen = false;
selectedMethod = '';

toggleDropdown() {
  this.isOpen = !this.isOpen;
}

selectOption(type: string) {
  this.selectedMethod = type;
  this.isOpen = false; // تغلق القائمة بعد الاختيار
}

  constructor() { }

  ngOnInit() {}

}
