import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl,
        responseHandler: async (response) => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            return data;
        },
    }),
    tagTypes: ['Auth', 'Students', 'Subjects'],
    endpoints: () => ({}),
});