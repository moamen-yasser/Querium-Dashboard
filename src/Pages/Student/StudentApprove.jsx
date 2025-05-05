import React, { useState } from "react";
import { Table, Button } from "@mantine/core";
import { useGetAllStudentsQuery, useApproveStudentMutation, useRejectStudentMutation,} from "../../Service/Apis/studentApi";
import Loader from "../../Components/Loader";
import { format } from "date-fns";
import { showNotification } from "../../utils/notification";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

// Table header
const header = ["Student Name", "Email", "College ID", "National ID", "Created At", "Status", "Actions"];

// Table Header Component
const TableHeader = () => (
    <thead className="border-b border-gray-500">
        <tr>
            {header?.map((head) => (
                <th key={head} className="p-2 min-w-[80px] text-center text-textSecondColor font-bold text-lg">
                    {head}
                </th>
            ))}
        </tr>
    </thead>
);

// Table Row Component
const TableRow = ({ student, handleAction, isLoadingApprove, isLoadingReject }) => {
    const formattedDate = format(new Date(student?.createdAt), "yyyy-MM-dd HH:mm:ss");

    return(
        <tr key={student.id} className='border-b border-gray text-center'>
            <td className="px-2 py-2 text-main font-semibold">{student?.fullName}</td>
            <td className="px-2 py-2 text-main font-semibold">{student?.email}</td>
            <td className="px-2 py-2 text-main font-semibold">{student?.universityIDCard}</td>
            <td className="px-2 py-2 text-main font-semibold">{student?.nationalIDCard}</td>
            <td className="px-2 py-2 text-main font-semibold">{formattedDate}</td>
            <td
                className={
                    `px-2 py-2 font-semibold ${
                        student.status === "Approved"
                            ? "text-green-600"
                            : student.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                    }`
                }
            >
            {student?.status}
            </td>
            <td className="px-4 py-2">
                <div className="flex justify-center gap-2">
                    <Button
                        className={`!bg-transparent !w-fit !p-0 !m-0
                            ${student?.status !== "Pending" ? "!opacity-50 !cursor-not-allowed" : ""}`}
                        onClick={() => handleAction(student?.universityIDCard, "approve")}
                        disabled={student?.status !== "Pending" || isLoadingApprove || isLoadingReject}
                        loading={isLoadingApprove || isLoadingReject}
                        loaderProps={{ type: "dots" }}
                    >
                        <AiFillCheckCircle color="#09C648" size={28} />
                    </Button>
                    <Button
                        className={`!bg-transparent !w-fit !p-0 !m-0
                            ${student?.status !== "Pending" ? "!opacity-50 !cursor-not-allowed" : ""}`}
                        onClick={() => handleAction(student?.universityIDCard, "reject")}
                        disabled={student?.status !== "Pending" || isLoadingApprove || isLoadingReject}
                        loading={isLoadingReject || isLoadingApprove}
                        loaderProps={{ type: "dots" }}
                    >
                        <AiFillCloseCircle color="red" size={28} />
                    </Button>
                </div>
            </td>
        </tr>
    );
};

// Empty State Component
const EmptyState = ({ colSpan }) => (
    <tr>
        <td colSpan={colSpan} className="p-4 text-center text-gray-500 font-medium">
            No Students Found.
        </td>
    </tr>
);

const StudentApprove = () => {
    const {data: getAllStudents, isLoading: isLoadingGetAllStudents} = useGetAllStudentsQuery();
    const [Approve] = useApproveStudentMutation();
    const [Reject] = useRejectStudentMutation();
    const [loadingStudentId, setLoadingStudentId] = useState(null);
    const [loadingAction, setLoadingAction] = useState(null);

    const handleAction = async (id, action) => {
        try {
            setLoadingStudentId(id);
            setLoadingAction(action);
            if (action === "approve") {
                const response = await Approve({id}).unwrap(); 
                showNotification.success(response);
            } else if (action === "reject") {
                const response = await Reject({id}).unwrap(); 
                showNotification.success(response);
            }
        } catch (error) {
            showNotification.error(error);
        } finally {
            setLoadingStudentId(null);
            setLoadingAction(null);
        }
    };

    
    return (
        <>
            <section className="px-8 mb-4">
                <div className="w-full px-2 py-3 bg-white mt-16">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-textSecondColor mb-6">
                        Approve Student
                    </h1>

                    {/* Table */}
                    <Table className="w-full text-left">
                        <TableHeader />
                        <tbody>
                            {isLoadingGetAllStudents ? (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center">
                                        <Loader isLoading={true} />
                                    </td>
                                </tr>
                            ) : getAllStudents?.length > 0 ? (
                                getAllStudents.map((student) => (
                                    <TableRow 
                                        key={student.id} 
                                        student={student} 
                                        handleAction={handleAction}
                                        isLoadingApprove={loadingStudentId === student.universityIDCard && loadingAction === 'approve'}
                                        isLoadingReject={loadingStudentId === student.universityIDCard && loadingAction === 'reject'}            
                                    />
                                ))
                            ) : (
                                <EmptyState colSpan={7} />
                            )}
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    );
};

export default StudentApprove;