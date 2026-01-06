import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-members',
  templateUrl: './select-members.component.html',
  styleUrls: ['./select-members.component.scss'],
})
export class SelectMembersComponent implements OnInit {
list = [
  'All','Unread','Read',
];
  constructor() { }

  ngOnInit() {}

}
 