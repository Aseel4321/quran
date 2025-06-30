import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "io.ionic.demo.pg.cap.ng",
  appName: "Msar Al Quran",
  bundledWebRuntime: false,
  //npmClient: "npm",
  webDir: "www",
  plugins: {
    Keyboard: {
      resize: "ionic"  // أو "body" حسب الحاجة
    }
  }
};

export default config;
