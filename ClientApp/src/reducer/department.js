import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'deparment',
    initialState: {
        items: []
    },
    reducers: {
        setItems: (state, action) => {
            state.items = [
                ...action.payload.data
            ]
        }
    },
})

export const actions = slice.actions

export default slice.reducer