import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import StepperForm from './StepperForm';

// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Upload", link: "/dashboard/upload" },
    ];

const Upload = () => {
    return (
        <>
            <Breadcrumb title={"Upload Content"} items={breadcrumbItems} />
            <section className='px-12 mb-5'>
                <StepperForm />
            </section>
        </>
    )
}

export default Upload
