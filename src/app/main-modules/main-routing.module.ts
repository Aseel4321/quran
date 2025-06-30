import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from '../auth/components/splash-screen/splash-screen.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { ProfileComponent } from '../components/profile/profile.component';



const routes: Routes = [ 
  { path: 'home-page', component: HomePageComponent },
 {path:'profile',component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
 