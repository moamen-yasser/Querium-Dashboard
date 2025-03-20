import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb';
import StudentApprove from './StudentApprove';

// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Students", link: "/dashboard/student" },
];

const Students = () => {
    return (
        <>
            <Breadcrumb title={"Students"} items={breadcrumbItems} />
            <StudentApprove />
        </>
    )
}

export default Students