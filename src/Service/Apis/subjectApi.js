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
            query: ({body, id}) => ({
                // url: `/Admin/subjects/${id}/upload-chapter`,
                url: `/FileUpload/upload`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Subjects'],
        }),
    }),
});

export const { useGetSubjectsMutation, useUploadSubjectMutation  } = subjectApi;