import { configureStore } from '@reduxjs/toolkit'
import ajaxCall from '../lib/ajax';
import account from './account';
import app from './app';
import department from './department';

export default configureStore({
    reducer: {
        account,
        app,
        department
    },
    middleware: getDefaultMiddleware => [
        ajaxCall,
        ...getDefaultMiddleware(),
    ]
})