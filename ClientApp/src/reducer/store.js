import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './account';
import appReducer from './app';
import ajaxCall from '../lib/ajax';

export default configureStore({
    reducer: {
        account: accountReducer,
        app: appReducer,
    },
    middleware: getDefaultMiddleware => [
        ajaxCall,
        ...getDefaultMiddleware(),
    ]
})