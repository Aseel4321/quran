import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {

  constructor() { }
  slides = [
    { title: 'Slide 1', description: 'This is the first slide' },
    { title: 'Slide 2', description: 'This is the second slide' },
    { title: 'Slide 3', description: 'This is the third slide' },
  ];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    
    loop: true
  };
  ngOnInit() {}

}
