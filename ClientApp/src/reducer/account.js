import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'account',
    initialState: {
        account: null,
        token: null,
        tokenChecked: false
    },
    reducers: {
        setProfile: (state, action) => {
            state.account = {
                ...state.account,
                ...action.payload.data
            }
            state.loggedIn = true;
        },
        checkToken: (state, action) => {
            let token = localStorage.getItem('token');
            if (token) {
                state.token = token;
            }
            state.loggedIn = false;
            state.tokenChecked = true;
        },
        setToken: (state, action) => {
            state.account = {
                ...state.account,
                ...action.payload.data.user
            };
            state.token = action.payload.data.accessToken;
            state.loggedIn = true;
            localStorage.setItem('token', state.token);
        },
        logout: (state) => {
            state.account = null;
            state.token = null;
            state.loggedIn = false;
            localStorage.removeItem('token');
        }
    }
})

// Action creators are generated for each case reducer function
export const actions = slice.actions

export default slice.reducer