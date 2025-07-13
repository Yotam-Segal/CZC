# CZC - Closed Zoom Captions: Export Zoom Recorded Chats 💬

[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/blob/main/LICENSE)

## About the Project

**CZC - Closed Zoom Captions** is a Chrome extension designed to **seamlessly export chat content** from recorded Zoom meetings where the transcript feature is enabled. This tool is especially useful for anyone looking to document, analyze, or archive discussions that occurred in the chat during recorded sessions, offering flexible options to include speaker names and timestamps.

## Features ✨

- **Comprehensive Chat Export**: Extracts all messages from the Zoom recording's chat window.
- **Flexible Export Settings**:
  - Option to include the **speaker's name** for each message.
  - Option to include the **timestamp** (time of message submission).
- **Smart Filenaming**: Automatically generates a filename based on the recording's topic and date, ensuring invalid characters are removed.
- **One-Click Download**: Allows for easy download of a text file (`.txt`) directly from the extension's popup.
- **Chat Load Detection**: Waits for the chat to fully load before initiating the export, ensuring data integrity.

## Installation 🚀

This extension is not currently available on the Chrome Web Store. You can install it manually using "Developer mode":

1.  **Download the Extension Files**:
    - [Download the latest release as a ZIP file from here](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/archive/main.zip) (or click on `Code` then `Download ZIP` at the top of the page).
    - Extract the ZIP file to a convenient folder on your computer.
2.  **Open Chrome Extensions Page**:
    - Launch your Chrome browser.
    - Navigate to: `chrome://extensions`
    - Alternatively, click the **three-dot menu** (Chrome menu) -> **More tools** -> **Extensions**.
3.  **Enable "Developer mode"**: In the top-right corner of the Extensions page, toggle on the "**Developer mode**" switch.
    ![Chrome Extensions Developer Mode](https://i.imgur.com/screenshot_of_developer_mode_toggle.png)
4.  **Load the Extension**:
    - Click the **"Load unpacked"** button that now appears in the top-left corner.
    - In the file dialog, select the **full project folder** you extracted in Step 1 (the folder containing the `manifest.json` file).
5.  **The extension will now be installed and active**.

## Usage Guide 📖

1.  Navigate to the Zoom recording page where the transcribed chat is displayed.
2.  Click on the **"CZC - Closed Zoom Captions"** extension icon in your Chrome toolbar.
3.  In the popup window, you can choose whether to include the **speaker's name** and **message timestamp** in the exported file.
4.  Click the "**Save and Download Chat**" button.
5.  The extension will wait for the chat to fully load (if necessary) and automatically download a `.txt` file containing the entire chat content.

## Contributing 🤝

Contributions are welcome! If you'd like to contribute to this project:

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact 📧

If you have any questions or suggestions, feel free to open an Issue on the GitHub repository.
