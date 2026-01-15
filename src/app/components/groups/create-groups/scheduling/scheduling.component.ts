import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent implements OnInit {

  constructor() { }
 repeats: string[] = [
    'Daily',
    'every 2 days',
    'weekends only'
  ];

  selectedRepeat: string = 'Daily'; // القيمة الافتراضية

  selectRepeat(value: string) {
    this.selectedRepeat = value;
  }
  ngOnInit() {}

}
