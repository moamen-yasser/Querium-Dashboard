import { baseApi } from '../baseApi';

export const subjectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubjects: builder.mutation({
            query: (body) => ({
                url: '/Admin/subjects/search',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Subjects'],
        }),

        uploadSubject: builder.mutation({
            query: ({body}) => ({
                url: `/upload/chapters`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Subjects'],
        }),

        uploadFile: builder.mutation({
            query: ({body, id}) => ({
                url: `/upload/upload/${id}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Subjects'],
        }),

        getChapters: builder.query({
            query: (id) => ({
                url: `/upload/subjects/${id}/chapters`,
                method: 'GET',
            }),
            providesTags: ['Chapters'],
        }),

        getQuestions: builder.query({
            query: (id) => ({
                url: `/upload/chapters/${id}/questions`,
                method: 'GET',
            }),
            providesTags: ['Questions'],
        }),
    }),
});

export const { 
    useGetSubjectsMutation, 
    useUploadSubjectMutation,
    useUploadFileMutation,
    useGetChaptersQuery,
    useGetQuestionsQuery,
} = subjectApi;