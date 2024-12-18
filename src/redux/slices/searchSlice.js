import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/users?q=';

export const fetchUsers = createAsyncThunk(
    'search/fetchUsers',
    async (query, { getState }) => {
        const { page } = getState().search;
        const response = await axios.get(`${BASE_URL}${query}+in:login&page=1&per_page=10`);
        return response.data.items;
    }
);

export const fetchMoreUsers = createAsyncThunk(
    'search/fetchMoreUsers',
    async (_, { getState }) => {
        const { query, page } = getState().search;
        const response = await axios.get(`${BASE_URL}${query}+in:login&page=${page + 1}&per_page=10`);
        return { data: response.data.items, page: page + 1 };
    }
);


const searchSlice = createSlice({
    name: 'search',
    initialState: { query: '', users: [], page: 1, isLoading: false },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        resetSearch(state) {
            state.query = '';
            state.users = [];
            state.page = 1;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.users = payload;
                state.page = 1;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchMoreUsers.fulfilled, (state, { payload }) => {
                state.users = [...state.users, ...payload.data];
                state.page = payload.page;
            });
    },
});

export const { setQuery, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
