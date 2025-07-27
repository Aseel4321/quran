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
import { QuranComponent } from '../quran/quran.component';




const routes: Routes = [ 
  { path: 'home-page', component: HomePageComponent },
 {path:'profile',component:ProfileComponent},
 {path:'profile-details',component:ProfileDetailsComponent},
 {path:'setting',component:SettingsComponent},
 {path:'delete',component:DeleteAccountComponent},
 {path:'add-calendar',component:AddCalendarComponent},
 {path:'quran',component:QuranComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
 