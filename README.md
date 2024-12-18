## {Bhargav Sai Gajula}'s GitHub User Search App

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

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/{your-username}/{your-name}-ios.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd {your-name}-ios
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Install CocoaPods (iOS Only):** (macOS only)

   ```bash
   sudo gem install cocoapods
   cd ios && pod install && cd ..
   ```

5. **Start the Metro Bundler:**

   ```bash
   npx react-native start
   # or
   yarn start
   ```

6. **Run the App:**

    - **Android:**

      ```bash
      npx react-native run-android
      # or
      yarn android
      ```

    - **iOS:** (macOS only)

      ```bash
      npx react-native run-ios
      # or
      yarn ios
      ```


**Further Notes**

- The code adheres to MVVM architecture with Redux for state management.
