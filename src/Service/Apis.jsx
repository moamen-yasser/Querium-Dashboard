import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://querim.runasp.net/api" ;

export const Apis = createApi({
reducerPath: 'Api',
baseQuery: fetchBaseQuery({ baseUrl }),
tagTypes: [
    'Auth', 'Students',
],

endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
        query: (params) => ({
            url: '/Admin/login',
            method: 'POST',
            body: params,
            headers: {'Content-Type': 'application/json'},
        }),
        invalidatesTags: ['Auth'], 
    }),

    // Logout endpoint
    logout: builder.mutation({
        query: () => ({
            url: `/Admin/logout`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }),
        invalidatesTags: ['Auth'], 
    }),

    // Get All Students
    getAllStudents: builder.query({
        query: () => ({
            url: `/Admin/students`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }),
        providesTags: ['Students'], 
    }),

    approveStudent: builder.mutation({
        query: ({ id }) => ({
            url: `/admin/approve-student/${id}`, 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }),
        invalidatesTags: ['Students'], 
    }),

    rejectStudent: builder.mutation({
        query: ({ id }) => ({
            url: `/admin/reject-student/${id}`, 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }),
        invalidatesTags: ['Students'], 
    }),

}),
});

export const {
    useLoginMutation,
    useLogoutMutation,

    useGetAllStudentsQuery,
    useApproveStudentMutation,
    useRejectStudentMutation,


} = Apis;