import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit {
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  selectedCountryCode = '+962';

  countries = [
    { name: 'السعودية', dial_code: '+966' },
    { name: 'مصر', dial_code: '+20' },
    { name: 'الإمارات', dial_code: '+971' },
    { name: 'الأردن', dial_code: '+962' }
  ];

  @ViewChild('nameInput', { static: false }) nameInputRef!: IonInput;
  @ViewChild('emailInput', { static: false }) emailInputRef!: IonInput;
  @ViewChild('phoneInput', { static: false }) phoneInputRef!: IonInput;

  ngAfterViewInit() {
    this.addBlurOnReadonlyFocus(this.nameInputRef);
    this.addBlurOnReadonlyFocus(this.emailInputRef);
    this.addBlurOnReadonlyFocus(this.phoneInputRef);
  }

  addBlurOnReadonlyFocus(input: IonInput) {
    input.getInputElement().then((el: HTMLInputElement) => {
      el.addEventListener('focus', () => {
        if (el.readOnly) {
          el.blur();
        }
      });
    });
  }

  enableInput(field: string) {
    let inputRef: IonInput | undefined;

    if (field === 'name') inputRef = this.nameInputRef;
    else if (field === 'email') inputRef = this.emailInputRef;
    else if (field === 'phone') inputRef = this.phoneInputRef;

    if (inputRef) {
      inputRef.getInputElement().then((el: HTMLInputElement) => {
        if (document.activeElement === el) {
          el.blur();
        }

        setTimeout(() => {
          if (!el.readOnly) return;

          el.readOnly = false;

          setTimeout(() => {
            el.focus();
          }, 50);

          if (!el.dataset.blurSet) {
            el.dataset.blurSet = 'true';
            el.addEventListener('blur', () => {
              setTimeout(() => {
                el.readOnly = true;
              }, 200);
            });
          }
        }, 50);
      });
    }
  }
}

