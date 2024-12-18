import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Card, Title, Avatar, Chip, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoreUsers } from '../redux/slices/searchSlice';

const ResultsComponent = () => {
    const { users, isLoading } = useSelector((state) => state.search);
    const dispatch = useDispatch();
    const { colors } = useTheme();

    const loadMore = () => {
        dispatch(fetchMoreUsers());
    };

    const renderUser = ({ item }) => (
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <View style={styles.cardContent}>
                <Avatar.Image source={{ uri: item.avatar_url }} style={styles.avatar} size={50} />

                <View style={styles.infoContainer}>
               
                    <Title style={styles.username}>{item.login}</Title>

                
                    <Chip
                        style={[
                            styles.chip,
                            { backgroundColor: getBadgeColor(item.type) },
                        ]}
                        textStyle={styles.chipText}
                    >
                        {item.type}
                    </Chip>
                </View>
            </View>
        </Card>
    );

    const getBadgeColor = (type) => {
        switch (type) {
            case 'User':
                return '#4caf50'; 
            case 'Organization':
                return '#ff9800'; 
            default:
                return '#2196f3'; 
        }
    };

    return (
        <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUser}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                isLoading ? <ActivityIndicator style={styles.loader} /> : null
            }
            style={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 2,
        padding: 8,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    chip: {
        borderRadius: 12,
        height: 24,
        justifyContent: 'center',
        
    },
    chipText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#fff',
        lineHeight:13
    },
    list: {
        backgroundColor: '#f5f5f5',
    },
    loader: {
        marginVertical: 16,
    },
});

export default ResultsComponent;
