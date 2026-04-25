# User Troubleshooting Guide - Smart Cooking Assistant

Welcome to your hands-free kitchen! If you're experiencing issues with the app, this guide will help you resolve them quickly.

---

## 1. Common Problems & Solutions

### **Voice Commands Not Working**
*   **Cause:** App doesn't have microphone permission or background noise is too high.
*   **Solution:**
    1.  Ensure you granted **Microphone Permission** when the app first launched.
    2.  Check if your phone is in "Silent" or "Do Not Disturb" mode.
    3.  Reduce background noise (e.g., loud exhaust fans or running water).
    4.  Speak clearly and wait for the "Listening..." indicator to pulse.

### **Recipe Extraction Failed**
*   **Cause:** Invalid YouTube URL or poor internet connection.
*   **Solution:**
    1.  Verify the URL starts with `https://www.youtube.com/` or `https://youtu.be/`.
    2.  Check your Wi-Fi or Mobile Data.
    3.  Try a different recipe video; some videos may have restricted access.

### **Instruction Audio (TTS) is Silent**
*   **Cause:** Media volume is muted or system voice is not installed.
*   **Solution:**
    1.  Turn up your **Media Volume** (not just the Ringer volume).
    2.  Go to your phone's **Settings > Accessibility > Text-to-Speech** and ensure a voice engine (like Google Speech) is active.

---

## 2. Error Messages and Meanings

| Error Message | What it Means |
| :--- | :--- |
| **"Invalid YouTube URL format"** | The link you pasted is not a recognized YouTube link. |
| **"Cloud extraction failed"** | The app couldn't reach the server to process the video. Check your internet. |
| **"Database initialization failed"** | There is an issue with your phone's storage. Try restarting the app. |
| **"Command not recognized"** | The app heard you but didn't understand the keyword. Try saying "Next Step". |

---

## 3. Component Status Check
To check if your app is working correctly:
1.  **Pantry Check:** Add an item. Close the app and reopen it. If the item is still there, **Database storage is working.**
2.  **Voice Check:** Say "Repeat" during a recipe. If the app speaks the step again, **Voice recognition is working.**
3.  **Extraction Check:** Click "Extract Mock Recipe". If 6 steps appear, **Extraction logic is working.**

---

## 4. Reset & Reinstall
If the app is behaving unexpectedly:
1.  **Clear Cache:** Go to Android Settings > Apps > Smart Chef > Storage > Clear Cache.
2.  **Reset Data:** (Warning: This deletes your saved recipes and pantry!) Go to Settings > Apps > Smart Chef > Clear Data.
3.  **Reinstall:** Uninstall the app, then download and install the latest version from your source.

---

## 5. FAQ
**Q: Can I use the app offline?**
A: Yes! Once a recipe is extracted, it is saved to your phone. You only need internet for the initial extraction.

**Q: Does it support languages other than English?**
A: Currently, voice recognition is optimized for English, but you can change the Text-to-Speech language in the Settings screen.

**Q: Why does the screen turn off while I'm cooking?**
A: The app tries to keep the screen on during Cooking Mode, but please check your phone's "Auto-Lock" settings if it continues to dim.
