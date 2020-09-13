const dotenv = require("dotenv");
dotenv.config();

export default {
    expo: {
      name: "Faceup",
      slug: "Faceup",
      platforms: [
        "ios",
        "android",
        "web"
      ],
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "cover",
        backgroundColor: "#ffffff"
      },
      updates: {
        fallbackToCacheTimeout: 0
      },
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.toutenm.faceup",
        buildNumber: "1.0.0"
      },
      android: {
        package: "com.toutenm.faceup",
        versionCode: 1
      },
      extra: {
        backendURL: process.env.REACT_NATIVE_BACKEND_URL
      }
    }
}