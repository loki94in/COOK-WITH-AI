# Android Distribution Guide - Cook With AI

This guide walks you through the final steps to build, sign, and distribute your production Android APK.

---

## STEP 1: PREPARE FOR RELEASE

### 1. Final Code Review Checklist
- [ ] **No Hardcoded URLs:** Ensure API endpoints are production URLs.
- [ ] **Proactive Try-Catch:** Verify all database and voice calls have error handling.
- [ ] **Zustand Persistence:** Verify state resets correctly on logout/exit.
- [ ] **Permissions:** Confirm `RECORD_AUDIO` is the only extra permission requested.

### 2. Remove Debug Logs
To keep the APK slim and secure, remove `console.log` statements automatically.
1. Install the transform plugin:
   ```bash
   npm install babel-plugin-transform-remove-console --save-dev
   ```
2. Update your `babel.config.js`:
   ```javascript
   module.exports = function(api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       env: {
         production: {
           plugins: ['transform-remove-console'],
         },
       },
     };
   };
   ```

### 3. Verify App Metadata (`app.json`)
- **Package Name:** `com.loki94in.cookwithai`
- **Version Name:** `1.0.0`
- **Version Code:** `1`
- **User Interface Style:** `dark` (Matches our kitchen theme)

---

## STEP 2: GENERATE SIGNING KEY

To distribute an APK, it must be signed with a keystore file. 

### 1. Create a New Keystore
Run the following command in your terminal (ensure `keytool` is in your PATH, usually part of Java JDK):

```bash
keytool -genkey -v -keystore cook-with-ai-release.keystore -alias cook-with-ai-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Signing Properties
During the command, you will be asked for:
- **Keystore Password:** (Choose a strong one)
- **First/Last Name:** Your Name
- **Organizational Unit:** Development
- **City/State/Country:** Your Location

### 3. CRITICAL: Secure Storage
> [!CAUTION]
> **DO NOT LOSE YOUR KEYSTORE FILE.**
> If you lose this file or forget the password, you will **never** be able to update your app on the Google Play Store. 
> - Backup the `.keystore` file in a secure password manager or encrypted drive.
> - Never commit this file to GitHub.

---

## STEP 3: BUILD THE APK (Recommended: EAS Build)

The most reliable way to build a React Native Expo app for production is using **EAS (Expo Application Services)**.

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Log in to Expo
```bash
eas login
```

### 3. Configure the Build
```bash
eas build:configure
```

### 4. Build the APK (for local distribution)
Run this command to get a downloadable APK file:
```bash
eas build -p android --profile preview
```
*Note: The `preview` profile generates an `.apk` that can be installed on any phone via a link or USB.*

### 5. Build the AAB (for Google Play Store)
```bash
eas build -p android --profile production
```
*This generates a `.aab` file, which is the required format for Play Store uploads.*

---

## STEP 4: FINAL INSTALLATION TEST
1. Download the generated `.apk`.
2. Transfer it to your phone.
3. Enable **"Install from Unknown Sources"** in Android settings.
4. Open the APK and verify the **Splash Screen** and **Voice Control** work as expected.
