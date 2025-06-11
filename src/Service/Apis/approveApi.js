import { baseApi } from '../baseApi';

export const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFiles: builder.query({
            query: () => ({
                url: '/AdminApprove/uploads/pending',
                method: 'GET',
            }),
            providesTags: ['AllFiles'],
        }),
        approveFile: builder.mutation({
            query: ({ id }) => ({
                url: `/AdminApprove/uploads/${id}/approve`,
                method: 'POST',
            }),
            invalidatesTags: ['ApproveFile'],
        }),
        rejectFile: builder.mutation({
            query: ({ id }) => ({
                url: `/AdminApprove/uploads/${id}/reject`,
                method: 'POST',
            }),
            invalidatesTags: ['RejectFile'],
        }),
    }),
});

export const { 
    useGetAllFilesQuery, 
    useApproveFileMutation, 
    useRejectFileMutation ,
} = studentApi;