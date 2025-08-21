import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { SplashScreen } from '@capacitor/splash-screen';
import { SplashScreenComponent } from '../components/splash-screen/splash-screen.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { ForgotPasswordEmailComponent } from '../components/forgot-password-email/forgot-password-email.component';
import { ForgotPasswordPhoneComponent } from '../components/forgot-password-phone/forgot-password-phone.component';
import { OtpPhoneComponent } from '../components/otp-phone/otp-phone.component';
import { OtpEmailComponent } from 'src/app/auth/components/otp-email/otp-email.component';
import { RestPasswordComponent } from '../components/rest-password/rest-password.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { NewPasswordComponent } from '../components/new-password/new-password.component';






const routes: Routes = [ 
       { path: '', component:ProfileComponent},
       { path: 'login', component:LoginComponent},
       { path: 'signup', component: SignupComponent },
       { path: 'splash-screen', component: SplashScreenComponent },
       {path:'Forgot-Password-Email',component:ForgotPasswordEmailComponent},
       {path:'Forgot-Password-Phone',component:ForgotPasswordPhoneComponent},
       {path:'otp-phone',component:OtpPhoneComponent},
       {path:'otp-email',component:OtpEmailComponent},
       {path:'rest-password',component:RestPasswordComponent},
       {path:'new-password',component:NewPasswordComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
