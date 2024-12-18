import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    View,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import { TextInput, Button, Card, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setQuery, resetSearch } from '../redux/slices/searchSlice';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const logoImage = require('../../assets/brand-logo.png'); 

const SearchComponent = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [query, setLocalQuery] = useState('');
    const [error, setError] = useState(null);

    const { isLoading } = useSelector((state) => state.search);

    const handleSubmit = async () => {
        if (query.trim()) {
            setError(null); // Clear previous errors
            dispatch(resetSearch());
            dispatch(setQuery(query));
            try {
                const result = await dispatch(fetchUsers(query)).unwrap();
                if (result.length === 0) {
                    setError('No users found for the provided username.');
                } else {
                    navigation.navigate('Results');
                }
            } catch (err) {
                if (err.response?.status === 403) {
                    setError('API rate limit exceeded. Please try again later.');
                } else {
                    setError('Something went wrong. Please try again.');
                }
            }
        } else {
            setError('Please enter a valid username.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Card style={[styles.card, { backgroundColor: colors.surface }]}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.logoContainer}>
                            <Image 
                                source={logoImage} 
                                style={styles.logo} 
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            label="Enter login"
                            mode="outlined"
                            value={query}
                            onChangeText={setLocalQuery}
                            style={styles.input}
                            error={!!error}
                        />
                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={styles.button}
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Searching...' : 'Search'}
                        </Button>
                        {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
                    </Card.Content>
                </Card>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        padding: 16,
        borderRadius: 12,
        elevation: 5,
    },
    cardContent: {
        alignItems: 'center',
        width: '100%',
    },
    logoContainer: {
        width: 150,
        height: 100, 
        marginBottom: 8, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        maxWidth: 150,
        maxHeight: 120, 
    },
    input: {
        width: '100%',
        marginBottom: 16,
    },
    button: {
        width: '100%',
        borderRadius: 25,
        paddingVertical: 5,
    },
    errorText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 14,
        width: '100%',
    },
});

export default SearchComponent;