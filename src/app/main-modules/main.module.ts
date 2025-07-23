import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MainRoutingModule } from './main-routing.module';
import { ProfileDetailsComponent } from '../components/profile-details/profile-details.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { DeleteAccountComponent } from '../components/delete-account/delete-account.component';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AddCalendarComponent } from '../components/add-calendar/add-calendar.component';
 

@NgModule({
  declarations: [HomePageComponent,ProfileComponent,ProfileDetailsComponent,SettingsComponent,DeleteAccountComponent,AddCalendarComponent ],
  imports: [  CommonModule,
      IonicModule,
      FormsModule,
      ReactiveFormsModule,
      TranslateModule,
      NgxIntlTelInputModule,
      BrowserAnimationsModule,
      MainRoutingModule
   
  ],  providers: [LocationAccuracy,
    Geolocation
  ],
})
export class MainModule { }
