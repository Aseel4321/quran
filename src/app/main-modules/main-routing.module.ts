import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from '../auth/components/splash-screen/splash-screen.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfileDetailsComponent } from '../components/profile-details/profile-details.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { DeleteAccountComponent } from '../components/delete-account/delete-account.component';
import { AddCalendarComponent } from '../components/add-calendar/add-calendar.component';
import { QuranComponent } from '../components/quran/quran/quran.component';
import { NotificationsComponent } from '../components/notification/notifications/notifications.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { TasbeehComponent } from '../components/tasbeeh/tasbeeh.component';
import { MorninAdhkarComponent } from '../components/mornin-adhkar/mornin-adhkar.component';
import { SupplicationsComponent } from '../components/supplications/supplications.component';
import { HomePageListComponent } from '../components/home-page-list/home-page-list.component';
import { HomePagePageComponent } from '../components/home-page-page/home-page-page.component';
import { SurahComponent } from '../components/quran/surah/surah.component';
import { SorahComponent } from '../components/sorah/sorah.component';
import { ChatsComponent } from '../chats/chats.component';






const routes: Routes = [{path:'sorah',component:SorahComponent},
  { path: 'home-page', component: HomePageComponent },
 {path:'profile',component:ProfileComponent},
 {path:'profile-details',component:ProfileDetailsComponent},
 {path:'setting',component:SettingsComponent},
 {path:'delete',component:DeleteAccountComponent},
 {path:'add-calendar',component:AddCalendarComponent},
 {path:'quran',component:QuranComponent},
 {path:'notifi',component:NotificationsComponent},
 {path:'calendar',component:CalendarComponent},{path:'tasbeeh',component:TasbeehComponent},{path:'morning-adhkar',component:MorninAdhkarComponent}, { path: 'Supplications', component: SupplicationsComponent },
 {path:"home-page-list",component:HomePageListComponent},{path:"home-page-list-page",component:HomePagePageComponent},{path:"chats",component:ChatsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
 