import { configureStore } from '@reduxjs/toolkit';
import { Apis } from './Apis';

export const Store = configureStore({
    reducer: {
        [Apis.reducerPath]: Apis.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(Apis.middleware), 
});

export default Store;