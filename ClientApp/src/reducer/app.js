import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'app',
    initialState: {
        enums: []
    },
    reducers: {
        setEnums: (state, action) => {
            state.enums = [
                ...action.payload
            ]
        }
    },
})

export const actions = slice.actions

export default slice.reducer