
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alphajoy.kids.app',
  appName: 'AlphaJoy Kids',
  webDir: 'out',
  
  // bundledWebRuntime is deprecated. It can be safely removed.
  // bundledWebRuntime: false, 

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
    // This allows Capacitor to override the default WebView behavior.
    allowMixedContent: true, 
  }
};

export default config;
