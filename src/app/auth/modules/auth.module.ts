import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonLabel, IonSegment, IonSegmentButton } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SplashScreenComponent } from '../components/splash-screen/splash-screen.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { ForgotPasswordEmailComponent } from '../components/forgot-password-email/forgot-password-email.component';
import { ForgotPasswordPhoneComponent } from '../components/forgot-password-phone/forgot-password-phone.component';
import { OtpPhoneComponent } from '../components/otp-phone/otp-phone.component';
import { OtpEmailComponent } from 'src/app/auth/components/otp-email/otp-email.component';
import { RestPasswordComponent } from '../components/rest-password/rest-password.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component'; // ✅ إذا كنت تستخدمه هنا
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { MainModule } from 'src/app/main-modules/main.module';
import { NewPasswordComponent } from '../components/new-password/new-password.component';

@NgModule({
  declarations: [
    NewPasswordComponent,
    RestPasswordComponent,
    OtpEmailComponent,
    OtpPhoneComponent,
    ForgotPasswordPhoneComponent,
    ForgotPasswordEmailComponent,
    SplashScreenComponent,
    LoginComponent,
    SignupComponent,
   
  ],
  imports: [
    MainModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule
  ]
})
export class AuthModule {}
