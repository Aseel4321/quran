import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-progress-tracking',
  templateUrl: './member-progress-tracking.component.html',
  styleUrls: ['./member-progress-tracking.component.scss'],
})
export class MemberProgressTrackingComponent implements OnInit {
members = [
 1,2,3
];
  constructor() { }

  ngOnInit() {}

}
