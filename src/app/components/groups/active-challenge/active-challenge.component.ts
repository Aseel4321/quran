import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-challenge',
  templateUrl: './active-challenge.component.html',
  styleUrls: ['./active-challenge.component.scss'],
})
export class ActiveChallengeComponent implements OnInit {
completion = 30;

members = [
  { name: 'Ahmad', progress: 50 },
  { name: 'Omar', progress: 70 }
];

stats = {
  active: 4,
  missed: 3,
  completed: 23
};

  constructor() { }

  ngOnInit() {}

}
