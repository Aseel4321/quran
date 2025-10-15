import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { IonSlides, Platform } from '@ionic/angular';
import Swiper from 'swiper';
import { Keyboard } from '@capacitor/keyboard';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-mornin-adhkar',
  templateUrl: './mornin-adhkar.component.html',
  styleUrls: ['./mornin-adhkar.component.scss'],
})
export class MorninAdhkarComponent implements OnInit {
  @ViewChild(IonSlides) slides!: IonSlides;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
  };

  slide: string[] = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'];
  num = 0;
  initialHeight: number = window.innerHeight;
  keyboardOpen: boolean = false;
  isKeyboardOpen: boolean = false;
  swiperRef!: Swiper;
  totalSlides: number = 0;
  currentSlide: number = 0;
  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
  private lockInProgress = false;

  constructor(private platform: Platform, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.lockInProgress = false;

    this.platform.ready().then(() => {
      this.initialHeight = window.innerHeight;

      if (Capacitor.isNativePlatform() && !this.lockInProgress) {
        this.lockInProgress = true;
        setTimeout(() => {
          ScreenOrientation.lock({ orientation: 'portrait' })
            .then(() => console.log('Orientation locked'))
            .catch((err) => console.error('Lock failed', err));
        }, 150);
      }

      window.addEventListener('resize', () => {
        const currentHeight = window.innerHeight;
        this.keyboardOpen = currentHeight < this.initialHeight - 100;

        const img = document.querySelector('.login-image2') as HTMLElement;
        if (img) {
          img.style.cssText = this.style_image2();
        }
      });
    });

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      this.isKeyboardOpen = true;
    });

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      this.isKeyboardOpen = false;
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && typeof activeElement.blur === 'function') {
        activeElement.blur();
      }
    });
  }

  show = 'surah';
  i: any = 0;
  color: string = '#1a1a1a';
  list: any = ['Surah', 'Part', 'Page'];

  click(i: number) {
    this.i = i;
    if (i == 0) {
      this.show = 'surah';
    } else if (i == 1) {
      this.show = 'part';
    } else {
      this.show = 'page';
    }
  }

  style(i: number) {
    if (i == this.i) {
      return {
        color: '#2e2e2e',
        cursor: 'pointer',
        textDecoration: 'underline',
      };
    } else {
      return {
        color: '#000000ff',
        cursor: 'pointer',
      };
    }
  }

  style_image2() {
    if (this.keyboardOpen) {
      return 'display: none;';
    }

    const baseStyle = 'width:33%; position: fixed; bottom: 0; z-index: 10;';
    const lang = localStorage.getItem('lang');

    if (lang === 'ar') {
      return baseStyle + ' right: 0;';
    } else {
      return baseStyle + ' left: 0;';
    }
  }

  style_image3() {
    if (this.keyboardOpen) {
      return 'display: none;';
    }

    const baseStyle = 'position: fixed; bottom:5%; z-index: 10;';
    const lang = localStorage.getItem('lang');

    if (lang === 'ar') {
      return baseStyle + ' left: 0;';
    } else {
      return baseStyle + ' right: 0;';
    }
  }

  c1_image() {
    if (this.keyboardOpen) {
      return 'display: none;';
    }

    const baseStyle = 'width:33%; position: fixed; bottom: 0; z-index: 10;';
    const lang = localStorage.getItem('lang');

    if (lang === 'ar') {
      return baseStyle + ' right: 0;';
    } else {
      return baseStyle + ' left: 0;';
    }
  }

  c2_image() {
    if (this.keyboardOpen) {
      return 'display: none;';
    }

    const lang = localStorage.getItem('lang');
    if (lang === 'ar') {
      return 'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);height: 13vw;width: 13vw;margin-inline-start: 20vw;position: absolute;margin-top:3vw';
    } else {
      return 'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);height: 13vw;width:13vw;margin-inline-end: 20vw;position: absolute;margin-top:3vw';
    }
  }

  c3_image() {
    if (this.keyboardOpen) {
      return 'display: none;';
    }

    const lang = localStorage.getItem('lang');
    if (lang === 'ar') {
      return 'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);height: 13vw;width: 13vw;margin-inline-start: 20vw;position: absolute;margin-top:3vw';
    } else {
      return 'border-radius: 50%;background-color: hsla(0, 0%, 85%, 1);height: 13vw;width: 13vw;margin-inline-end: 20vw;position: absolute;margin-top:3vw';
    }
  }

  slid = ['A', 'B', 'C', 'D', 'E', 'Y'];
  list1 = [1, 2, 3];

  onSwiper(swiper: Swiper) {
    this.swiperRef = swiper;
    this.totalSlides = swiper.params.loop
      ? swiper.slides.length - 2
      : swiper.slides.length;

    this.currentSlide = 0;
    console.log('init:', this.currentSlide);
  }

  onSlideChange() {
    this.slides.getActiveIndex().then((index) => {
      this.currentSlide = index;
      this.num = 0;
      console.log('Current slide:', this.currentSlide);
    });
  }

  Color(i: number) {
    let bgColor = 'rgb(216, 222, 222)';

    if (this.currentSlide === 0 && this.currentSlide === i) {
      bgColor = 'hsla(39, 100%, 73%, 1)';
    } else if (this.currentSlide < this.slid.length - 1 && this.currentSlide > 0 && i === 1) {
      bgColor = 'hsla(39, 100%, 73%, 1)';
    } else if (this.slid.length - 1 === this.currentSlide && i === 2) {
      bgColor = 'hsla(39, 100%, 73%, 1)';
    }

    return {
      width: '8vw',
      height: '1vw',
      'margin-inline-end': '10%',
      'background-color': bgColor,
    };
  }

  count() {
    this.num = this.num + 1;
  }
}


