import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { showNotification } from '../utils/notification';

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://querim.runasp.net/api";

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl,
        responseHandler: async (response) => {
            const data = await response.json();
            if (!response.ok) {
                // showNotification.error(data.message || 'An error occurred');
                throw new Error(data.message);
            }
            // showNotification.success('Operation completed successfully');
            return data;
        },
    }),
    tagTypes: ['Auth', 'Students', 'Subjects'],
    endpoints: () => ({}),
});