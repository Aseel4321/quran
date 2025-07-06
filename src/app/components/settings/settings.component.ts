import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

// في TypeScript
selectedCity: string = '';
notificationsEnabled: boolean = true;
toggleChanged(event: any) {
  console.log('Toggle value:', event.detail.checked);
}


  ngOnInit() {}

}
