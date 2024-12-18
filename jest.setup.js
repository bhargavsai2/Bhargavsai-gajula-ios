import 'react-native';
import '@testing-library/jest-native/extend-expect';
import fetchMock from 'jest-fetch-mock';

// Mock fetch (if you're using it)
fetchMock.enableMocks();

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.Clock = () => ({ start: jest.fn(), stop: jest.fn() }); // Important for newer versions
    return Reanimated;
});

// Mock react-native-gesture-handler (if you're using it, which is likely with react-navigation)
jest.mock('react-native-gesture-handler', () => {});

// Mock react-native/Libraries/Animated/NativeAnimatedHelper
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(), // Mock goBack as well
            dispatch: jest.fn(), // Mock dispatch if you use it
        }),
        useRoute: () => ({ params: {} }), // Mock useRoute if you use it
        useFocusEffect: jest.fn(),
        createNavigationContainerRef: jest.fn(),
    };
});

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaView: ({ children }) => <View>{children}</View>,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('react-native-paper', () => {
    const reactNativePaper = jest.requireActual('react-native-paper');
    return {
        ...reactNativePaper,
        // Mock any specific components or modules from react-native-paper if needed, e.g.:
        // Button: () => <View testID="paper-button" />,
    };
});

// Mock react-native-screens if used
jest.mock('react-native-screens');