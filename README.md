## GitHub User Search App

This React Native application allows users to search for GitHub users and displays the results in a user-friendly interface. It leverages the GitHub Search API and follows modern design principles.

**Features:**

- **Search Functionality:** Users can enter a username in the "Login" field and submit a search request.
- **Results Display:** User search results are displayed with details like avatar URL, username, and account type.
- **Pagination:** Results are paginated with 10 items per page, facilitating efficient scrolling for larger data.
- **Error Handling:** Handles API request errors gracefully and displays appropriate messages.

**Technologies:**

- **React Native:** Cross-platform framework for building the mobile app.
- **Redux:** State management library for maintaining application state.
- **Axios (or React Native Fetch API):** Makes HTTP requests to the GitHub Search API.
- **Jest:** Testing framework for unit testing.
- **React Native Testing Library:** Testing framework for component testing.
- **React Native Paper (or React Native Elements):** UI component library for a consistent and modern design.

**Setup and Running the App**

**Prerequisites:**

- Node.js and npm (or yarn) installed on your system.
- Android Studio for Android development (optional).
- Xcode for iOS development (macOS only).

**Instructions:**

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/bhargavsai2/Bhargavsai-gajula-ios.git
    ```

2.  **Navigate to the Project Directory:**

    ```bash
    cd Bhargavsai-gajula-ios
    ```

3.  **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Install CocoaPods (iOS Only):** (macOS only - Only needed if running directly without Expo)

    ```bash
    cd ios && pod install && cd ..
    ```

**Running the App:**

There are two main ways to run the app: using the React Native CLI directly (for native builds) or using Expo.

**Method 1: Using React Native CLI (Native Builds)**

This method creates native iOS and Android builds.

**Android:**

1.  **Start the Metro Bundler:**

    ```bash
    npx react-native start
    # or
    yarn start
    ```

2.  **Run on Android (emulator or device):**

    ```bash
    npx react-native run-android
    # or
    yarn android
    ```

**iOS:**

1.  **Start the Metro Bundler:**

    ```bash
    npx react-native start
    # or
    yarn start
    ```

2.  **Run on iOS (simulator or device):**

    ```bash
    npx react-native run-ios
    # or
    yarn ios
    ```

**Method 2: Using Expo (Easier for Quick Testing)**

This method uses the Expo Go app on your device for faster iteration.

1.  **Start the Expo Development Server:**

    ```bash
    npx expo start --clear
    # or
    yarn start --clear 
    ```
    The `--clear` flag is useful to clear any cached builds that might be causing issues.

2.  **Open the app on your device:**

    -   **Expo Go App:** Open the Expo Go app on your iOS or Android device.
    -   **Scan QR Code:** Scan the QR code displayed in your terminal or browser.
    -   **Or enter URL:** Alternatively, you can manually enter the URL provided in the terminal into the Expo Go app.

**Further Notes**

- The code adheres to MVVM architecture with Redux for state management.
