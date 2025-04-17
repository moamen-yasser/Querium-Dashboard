import { configureStore } from '@reduxjs/toolkit';
import { studentApi } from './Apis/studentApi';
import { authApi } from './Apis/authApi';
import { subjectApi } from './Apis/subjectApi';

export const Store = configureStore({
    reducer: {
        [studentApi.reducerPath]: studentApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [subjectApi.reducerPath]: subjectApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            studentApi.middleware,
            authApi.middleware,
            subjectApi.middleware
        ),
});