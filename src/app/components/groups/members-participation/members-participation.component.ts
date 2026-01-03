import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-participation',
  templateUrl: './members-participation.component.html',
  styleUrls: ['./members-participation.component.scss'],
})
export class MembersParticipationComponent implements OnInit {
list = [
  'All','Unread','Read',
];
  constructor() { }

  ngOnInit() {}

}
