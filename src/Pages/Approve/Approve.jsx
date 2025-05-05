import React from "react";
import { Table, Button } from "@mantine/core";
import Breadcrumb from "../../Components/Breadcrumb";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

// Table header
const header = ["Student Name", "File Name", "Uploaded At", "Status", "Actions"];

// Sample data
const mockPDFData = [
    {
        id: 1,
        studentName: "John Doe",
        fileName: "computer-vision.pdf",
        uploadedAt: "2023-10-01 14:30",
        status: "Pending",
    },
    {
        id: 2,
        studentName: "Jane Smith",
        fileName: "machine-learning.pdf",
        uploadedAt: "2023-10-02 10:15",
        status: "Pending",
    },
];

// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Approve", link: "/dashboard/approve" },
];

// Table Header Component
const TableHeader = () => (
    <thead className="border-b border-gray-500">
        <tr>
            {header?.map((head) => (
                <th key={head} className="p-3 min-w-[80px] text-left text-textSecondColor font-bold text-lg">
                    {head}
                </th>
            ))}
        </tr>
    </thead>
);

// Table Row Component
const TableRow = ({ pdf, handleAction }) => (
    <tr key={pdf.id} className='border-b border-gray text-left'>
        <td className="px-4 py-2">{pdf.studentName}</td>
        <td className="px-4 py-2">{pdf.fileName}</td>
        <td className="px-4 py-2">{pdf.uploadedAt}</td>
        <td
            className={
                `px-4 py-2 ${
                    pdf.status === "Approved"
                        ? "text-green-600"
                        : pdf.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                }`
            }
        >
        {pdf.status}
        </td>
        <td className="px-4 py-2">
            <div className="flex justify-start gap-2">
                <Button
                    className={`!bg-transparent !w-fit !p-0 !m-0
                        `}
                    // onClick={() => handleAction(student?.universityIDCard, "approve")}
                    // disabled={student?.status !== "Pending" || isLoadingApprove || isLoadingReject}
                    // loading={isLoadingApprove || isLoadingReject}
                    loaderProps={{ type: "dots" }}
                >
                    <AiFillCheckCircle color="#09C648" size={28} />
                </Button>
                <Button
                    className={`!bg-transparent !w-fit !p-0 !m-0
                        `}
                    // onClick={() => handleAction(student?.universityIDCard, "reject")}
                    // disabled={student?.status !== "Pending" || isLoadingApprove || isLoadingReject}
                    // loading={isLoadingReject || isLoadingApprove}
                    loaderProps={{ type: "dots" }}
                >
                    <AiFillCloseCircle color="red" size={28} />
                </Button>
            </div>
        </td>
    </tr>
);

// Empty State Component
const EmptyState = ({ colSpan }) => (
    <tr>
        <td colSpan={colSpan} className="p-4 text-center text-gray-500 font-medium">
            No PDFs found.
        </td>
    </tr>
);

const Approve = () => {
    const handleAction = (id, action) => {
        // Update the status of the PDF in the mock data (replace with API call in real app)
        const updatedData = mockPDFData?.map((pdf) =>
            pdf.id === id ? { ...pdf, status: action === "approve" ? "Approved" : "Rejected" } : pdf
        );
        console.log(updatedData); 
    };

    return (
        <>
            <Breadcrumb title={"Approve PDFs"} items={breadcrumbItems} />

            <section className="px-12">
                <div className="w-full px-6 py-3 bg-white mt-16">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-textSecondColor mb-6">
                        Approve Uploaded PDFs
                    </h1>

                    {/* Table */}
                    <Table className="w-full text-left">
                        <TableHeader />
                        <tbody>
                            {mockPDFData?.length > 0 ? (
                                mockPDFData?.map((pdf) => (
                                    <TableRow key={pdf?.id} pdf={pdf} handleAction={handleAction} />
                                ))
                            ) : (
                                <EmptyState colSpan={5} />
                            )}
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    );
};

export default Approve;