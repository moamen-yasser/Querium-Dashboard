import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
    subjectImage: yup
        .mixed()
        .required('Subject Image is required')
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return false; // Ensure a file is uploaded
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        }),
    subjectTitle: yup.string().required('Subject Title is required'),
    subjectDescription: yup.string().required('Subject Description is required'),
    chapters: yup
        .array()
        .of(
            yup.object().shape({
                chapterTitle: yup.string().required('Chapter Title is required'),
                chapterDescription: yup.string().required('Chapter Description is required'),
                chapterFile: yup
                    .mixed()
                    .required('Chapter File is required')
                    .test('fileType', 'Only PDF files are allowed', (value) => {
                        if (!value) return false; // Ensure a file is uploaded
                        return value.type === 'application/pdf';
                    }),
            })
        )
        .min(1, 'At least one chapter is required'), // Ensure at least one chapter is added
});

export default ValidationSchema;