import { baseApi } from '../baseApi';

export const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: () => ({
                url: '/Admin/students',
                method: 'GET',
            }),
            providesTags: ['Students'],
        }),
        approveStudent: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/approve-student/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Students'],
        }),
        rejectStudent: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/reject-student/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Students'],
        }),
    }),
});

export const { 
    useGetAllStudentsQuery, 
    useApproveStudentMutation, 
    useRejectStudentMutation 
} = studentApi;