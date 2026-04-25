# Developer Debugging Guide - Smart Cooking Assistant

This guide is for developers maintaining the React Native (Android) application and the HTML Prototype.

---

## 1. Accessing Logs

### **Android (React Native)**
*   **Metro Bundler:** Run `npx expo start`. Console logs from `App.js`, services, and hooks will appear in the terminal window.
*   **ADB Logs:** For native issues (Voice/SQLite), use:
    ```bash
    adb logcat *:S ReactNative:V ReactNativeJS:V
    ```
*   **In-App Debugging:** Use `console.error` to trigger the RedBox error screen during development.

### **HTML Prototype**
*   **Browser Console:** Press `F12` or `Ctrl+Shift+I` and go to the **Console** tab to see extraction logs and state updates.

---

## 2. Data Storage Locations

### **React Native (Android 9+)**
*   **SQLite DB:** `cooking_assistant.db`.
    *   Path: `/data/data/com.smartcookingapp/databases/` (Root access required on physical device).
    *   Tool: Use **Flipper** or **SQLite Browser** to inspect the `.db` file.
*   **Config:** `app.json` contains native permissions and plugin configurations.

### **HTML Prototype**
*   **LocalStorage:** Open Browser DevTools > Application > Local Storage. Key: `pantry`.

---

## 3. Verifying Components (Unit Testing)

### **Database Service (`src/services/database.js`)**
1.  Run `initDatabase()`.
2.  Call `saveRecipe(mockData)` and verify `getAllRecipes()` returns the correct count.

### **State Management (`src/store/useStore.js`)**
1.  Verify `isCooking` is `false` by default.
2.  Confirm `nextStep()` does not increment `currentStepIndex` beyond `steps.length - 1`.

### **Voice Service (`src/services/voiceHandler.js`)**
1.  Test `speakInstruction("Test")` and verify system audio trigger.
2.  Verify `stopSpeaking()` immediately kills the audio queue.

---

## 4. Common Development Issues

| Issue | Potential Cause | Fix |
| :--- | :--- | :--- |
| **Native Module Missing** | Library not linked | Run `npx expo prebuild` or `npx expo run:android`. |
| **SQLite "Table Not Found"** | Migration failure | Delete the app from the device and run `initDatabase()` again. |
| **Voice "Not Initialized"** | Permissions missing | Ensure `RECORD_AUDIO` is in `app.json` and requested at runtime. |

---

## 5. Adding New Features Safely

### **Adding a New Screen**
1.  Create the file in `src/screens/`.
2.  Add a new state variable in `useStore.js` (e.g., `currentScreen`).
3.  Add conditional rendering in `App.js`.
4.  Update the `testing_checklist.md` with new test cases.

### **Adding a New Data Field**
1.  Update the SQL string in `database.js` (inside `initDatabase`).
2.  Increment the `version` in `app.json` if using migrations (or clear app data during dev).
3.  Update the Mock Data in `youtubeApi.js` to include the new field for testing.

---

## 6. Architecture Reference
*   **Frontend:** React Native (Functional Components + Hooks).
*   **State:** Zustand (Atomic, no boilerplate).
*   **Storage:** Local-first SQLite.
*   **Voice:** Hybrid TTS (Local) + STT (Native).
