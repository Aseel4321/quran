import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
user=['t','f']
  constructor(private location: Location,private router: Router,) { }

goBack() {
  this.router.navigate(['/setting']);
}
title() {
  if (localStorage.getItem('lang') === 'ar') {
    return {
      'font-family': '"El Messiri", sans-serif',
      'font-weight': '600',
      'text-align': 'center',
      'margin-top': '1vh'
    };
  } else {
    return {
      'font-family': '"Lucida Console", Monaco, monospace', 'font-weight': '600',
      'text-align': 'center',
      'margin-top': '1vh'
    };
  }
}
}
