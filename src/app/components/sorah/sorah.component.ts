import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorah',
  templateUrl: './sorah.component.html',
  styleUrls: ['./sorah.component.scss'],
})
export class SorahComponent implements OnInit {
list = ['بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ', 'الـحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', ' الرَّحْمَـٰنِ الرَّحِيمِ مَالِكِ يوم الدين','إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ'];
  constructor() { }

  ngOnInit() {}

}
