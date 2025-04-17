import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (params) => ({
                url: '/Admin/login',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Auth'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/Admin/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;