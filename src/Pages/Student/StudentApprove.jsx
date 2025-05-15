import React, { useState } from "react";
import { Table, Button, ScrollArea } from "@mantine/core";
import { useGetAllStudentsQuery, useApproveStudentMutation, useRejectStudentMutation,} from "../../Service/Apis/studentApi";
import Loader from "../../Components/Loader";
import { format } from "date-fns";
import { showNotification } from "../../utils/notification";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useMediaQuery } from "@mantine/hooks";

// Table header
const header = ["Student Name", "Email", "College ID", "National ID", "Created At", "Status", "Actions"];

// Mobile Card Component
const MobileStudentCard = ({ student, handleAction, isLoadingApprove, isLoadingReject }) => {
    const formattedDate = format(new Date(student?.createdAt), "yyyy-MM-dd HH:mm:ss");
    
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-bold text-main mb-2">{student?.fullName}</h3>
            
            <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center border-b pb-1">
                    <span className="text-gray-600 text-sm">Email:</span>
                    <span className="text-main font-medium text-sm">{student?.email}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-1">
                    <span className="text-gray-600 text-sm">College ID:</span>
                    <span className="text-main font-medium text-sm">{student?.universityIDCard}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-1">
                    <span className="text-gray-600 text-sm">National ID:</span>
                    <span className="text-main font-medium text-sm">{student?.nationalIDCard}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-1">
                    <span className="text-gray-600 text-sm">Created At:</span>
                    <span className="text-main font-medium text-sm">{formattedDate}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-1">
                    <span className="text-gray-600 text-sm">Status:</span>
                    <span className={`font-medium text-sm ${
                        student.status === "Approved"
                            ? "text-green-600"
                            : student.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                    }`}>
                        {student?.status}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Actions:</span>
                    <div className="flex justify-end gap-3">
                        <Button
                            className={`!bg-transparent !w-fit !p-0 !m-0
                                ${student?.status !== "Pending" ? "!opacity-50 !cursor-not-allowed" : ""}`}
                            onClick={() => handleAction(student?.universityIDCard, "approve")}
                            disabled={student?.status !== "Pending" || isLoadingApprove || isLoadingReject}
                            loading={isLoadingApprove || isLoadingReject}
                            loaderProps={{ color: "#023336", type: "dots" }}
                        >
                            <AiFillCheckCircle color="#09C648" size={28} />
                        </Button>
                        <Button
                            className={`!bg-transparent !w-fit !p-0 !m-0
                                ${student?.status !== "Pending" ? "!opacity-50 !cursor-not-allowed" : ""}`}
                            onClick={() => handleAction(student?.universityIDCard, "reject")}
                            disabled={student?.status !== "Pending" || isLoadingApprove || isLoadingReject}
                            loading={isLoadingReject || isLoadingApprove}
                            loaderProps={{ color: "#023336", type: "dots" }}
                        >
                            <AiFillCloseCircle color="red" size={28} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
                        loaderProps={{ color: "#023336", type: "dots" }}
                    >
                        <AiFillCheckCircle color="#09C648" size={28} />
                    </Button>
                    <Button
                        className={`!bg-transparent !w-fit !p-0 !m-0
                            ${student?.status !== "Pending" ? "!opacity-50 !cursor-not-allowed" : ""}`}
                        onClick={() => handleAction(student?.universityIDCard, "reject")}
                        disabled={student?.status !== "Pending" || isLoadingApprove || isLoadingReject}
                        loading={isLoadingReject || isLoadingApprove}
                        loaderProps={{ color: "#023336", type: "dots" }}
                    >
                        <AiFillCloseCircle color="red" size={28} />
                    </Button>
                </div>
            </td>
        </tr>
    );
};

// Empty State Component
const EmptyState = ({ colSpan, isMobile }) => (
    isMobile ? (
        <div className="p-4 text-center bg-white rounded-lg shadow-md text-gray-500 font-medium">
            No Students Found.
        </div>
    ) : (
        <tr>
            <td colSpan={colSpan} className="p-4 text-center text-gray-500 font-medium">
                No Students Found.
            </td>
        </tr>
    )
);

const StudentApprove = () => {
    const {data: getAllStudents, isLoading: isLoadingGetAllStudents} = useGetAllStudentsQuery();
    const [Approve] = useApproveStudentMutation();
    const [Reject] = useRejectStudentMutation();
    const [loadingStudentId, setLoadingStudentId] = useState(null);
    const [loadingAction, setLoadingAction] = useState(null);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

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
            <section className={`${isMobile ? 'px-3' : isTablet ? 'px-5' : 'px-8'} mb-4`}>
                <div className={`w-full py-3 bg-white mt-8 ${!isMobile && 'px-2'} rounded-md shadow-sm`}>
                    {/* Title */}
                    <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-textSecondColor mb-4 px-4`}>
                        Approve Student
                    </h1>

                    {/* Loading State */}
                    {isLoadingGetAllStudents && (
                        <div className="flex justify-center items-center p-8">
                            <Loader isLoading={true} />
                        </div>
                    )}

                    {/* Mobile View */}
                    {!isLoadingGetAllStudents && isMobile && (
                        <div className="px-3">
                            {getAllStudents?.length > 0 ? (
                                getAllStudents.map((student) => (
                                    <MobileStudentCard
                                        key={student.id}
                                        student={student}
                                        handleAction={handleAction}
                                        isLoadingApprove={loadingStudentId === student.universityIDCard && loadingAction === 'approve'}
                                        isLoadingReject={loadingStudentId === student.universityIDCard && loadingAction === 'reject'}
                                    />
                                ))
                            ) : (
                                <EmptyState isMobile={true} />
                            )}
                        </div>
                    )}

                    {/* Desktop/Tablet View */}
                    {!isLoadingGetAllStudents && !isMobile && (
                        <ScrollArea>
                            <Table className="w-full text-left">
                                <TableHeader />
                                <tbody>
                                    {getAllStudents?.length > 0 ? (
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
                                        <EmptyState colSpan={7} isMobile={false} />
                                    )}
                                </tbody>
                            </Table>
                        </ScrollArea>
                    )}
                </div>
            </section>
        </>
    );
};

export default StudentApprove;