
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alphajoy.kids.app',
  appName: 'AlphaJoy Kids',
  webDir: 'out',
  
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#3B82F6",
    },
  },
  android: {
    allowMixedContent: true,
    iconPath: 'public/icons/icon-512x512.png'
  }
};

export default config;
