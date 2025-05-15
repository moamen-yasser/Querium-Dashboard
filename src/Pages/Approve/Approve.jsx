import React from "react";
import { Table, Button, ScrollArea } from "@mantine/core";
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

// Mobile Card Component
const MobilePDFCard = ({ pdf, handleAction }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <h3 className="text-lg font-bold text-main mb-2">{pdf.studentName}</h3>
    <div className="space-y-2 mb-3">
      <div className="flex justify-between items-center border-b pb-1">
        <span className="text-gray-600 text-sm">File Name:</span>
        <span className="text-main font-medium text-sm">{pdf.fileName}</span>
      </div>
      <div className="flex justify-between items-center border-b pb-1">
        <span className="text-gray-600 text-sm">Uploaded At:</span>
        <span className="text-main font-medium text-sm">{pdf.uploadedAt}</span>
      </div>
      <div className="flex justify-between items-center border-b pb-1">
        <span className="text-gray-600 text-sm">Status:</span>
        <span className={`font-medium text-sm ${
          pdf.status === "Approved"
            ? "text-green-600"
            : pdf.status === "Rejected"
            ? "text-red-600"
            : "text-yellow-600"
        }`}>
          {pdf.status}
        </span>
      </div>
      <div className="flex justify-between items-center border-b pb-1">
        <span className="text-gray-600 text-sm">Actions:</span>
        <div className="flex justify-end gap-3">
            <Button
                className="!bg-transparent !w-fit !p-0 !m-0"
                onClick={() => handleAction(pdf.id, "approve")}
                loaderProps={{ type: "dots" }}
            >
                <AiFillCheckCircle color="#09C648" size={28} />
            </Button>
            <Button
                className="!bg-transparent !w-fit !p-0 !m-0"
                onClick={() => handleAction(pdf.id, "reject")}
                loaderProps={{ type: "dots" }}
            >
                <AiFillCloseCircle color="red" size={28} />
            </Button>
        </div>
      </div>
    </div>
  </div>
);

const Approve = ({isMobileScreen, isSidebarOpen, setIsSidebarOpen }) => {
    const handleAction = (id, action) => {
        const updatedData = mockPDFData?.map((pdf) =>
            pdf.id === id ? { ...pdf, status: action === "approve" ? "Approved" : "Rejected" } : pdf
        );
        console.log(updatedData); 
    };

    return (
        <>
            <Breadcrumb 
                title={"Approve PDFs"} 
                items={breadcrumbItems} 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />

            <section className={`${isMobileScreen ? 'px-3' : 'px-12'} mb-8`}>
                <div className={`w-full ${isMobileScreen ? 'py-3 mt-8 px-2' : 'px-6 py-3 mt-16'} bg-white rounded-md shadow-sm`}>
                    <h1 className={`${isMobileScreen ? 'text-xl' : 'text-2xl'} font-bold text-textSecondColor mb-6`}>
                        Approve Uploaded PDFs
                    </h1>

                    {/* Mobile View */}
                    {isMobileScreen ? (
                        <div>
                            {mockPDFData?.length > 0 ? (
                                mockPDFData.map((pdf) => (
                                    <MobilePDFCard key={pdf.id} pdf={pdf} handleAction={handleAction} />
                                ))
                            ) : (
                                <div className="p-4 text-center bg-white rounded-lg shadow-md text-gray-500 font-medium">
                                    No PDFs found.
                                </div>
                            )}
                        </div>
                    ) : (
                        // Desktop/Tablet View
                        <ScrollArea>
                            <Table className="w-full text-left">
                                <TableHeader />
                                <tbody>
                                    {mockPDFData?.length > 0 ? (
                                        mockPDFData.map((pdf) => (
                                            <TableRow key={pdf.id} pdf={pdf} handleAction={handleAction} />
                                        ))
                                    ) : (
                                        <EmptyState colSpan={5} />
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

export default Approve;