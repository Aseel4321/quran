import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MainRoutingModule } from './main-routing.module';
import { ProfileDetailsComponent } from '../components/profile-details/profile-details.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { DeleteAccountComponent } from '../components/delete-account/delete-account.component';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AddCalendarComponent } from '../components/add-calendar/add-calendar.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuranComponent } from '../components/quran/quran/quran.component';
import { PartComponent } from '../components/quran/part/part.component';
import { SurahComponent } from '../components/quran/surah/surah.component';
import { PageComponent } from '../components/quran/page/page.component';
import { NotificationsComponent } from '../components/notification/notifications/notifications.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { CalendarModule } from 'ion2-calendar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TasbeehComponent } from '../components/tasbeeh/tasbeeh.component';
import { SwiperModule } from 'swiper/angular';
import { MorninAdhkarComponent } from '../components/mornin-adhkar/mornin-adhkar.component';
import { SupplicationsComponent } from '../components/supplications/supplications.component';
import { SorahComponent } from '../components/sorah/sorah.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { HomePageListComponent } from '../components/home-page-list/home-page-list.component';
import { HomePagePageComponent } from '../components/home-page-page/home-page-page.component';
import { ReadComponent } from '../components/notification/read/read.component';
import { UnreadComponent } from '../components/notification/unread/unread.component';
import { ChatsComponent } from '../components/chats/chats.component';
import { MessagesPageComponent } from '../components/messages-page/messages-page.component';


@NgModule({
  declarations: [MessagesPageComponent,ChatsComponent,SorahComponent,UnreadComponent,ReadComponent,HomePagePageComponent,HomePageListComponent,SorahComponent,SupplicationsComponent,MorninAdhkarComponent,TasbeehComponent,CalendarComponent,NotificationsComponent,PageComponent,SurahComponent,PartComponent,QuranComponent,HomePageComponent,ProfileComponent,ProfileDetailsComponent,SettingsComponent,DeleteAccountComponent,AddCalendarComponent ],
  imports: [ CalendarModule, CommonModule,
      IonicModule,
      FormsModule,SwiperModule,
      ReactiveFormsModule,
      TranslateModule,
      NgxIntlTelInputModule,
      BrowserAnimationsModule,
      MainRoutingModule
     
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],  providers: [LocationAccuracy,
    Geolocation
  ],
})
export class MainModule { }
