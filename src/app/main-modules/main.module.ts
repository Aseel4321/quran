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



@NgModule({
  declarations: [HomePageComponent,ProfileComponent, ],
  imports: [  CommonModule,
      IonicModule,
      FormsModule,
      ReactiveFormsModule,
      TranslateModule,
      NgxIntlTelInputModule,
      BrowserAnimationsModule,
      MainRoutingModule
   
  ]
})
export class MainModule { }
