import Loader from "../../Components/Loader"
import NoDataFound from "../../Components/NoDataFound"
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Button, ScrollArea, Table } from "@mantine/core";
import { format } from "date-fns";
import PropTypes from 'prop-types';

// Table header
const header = ["Student Name", "File Name", "Uploaded At", "Status", "Actions"];

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

// Mobile Card Component
const MobileFileCard = ({ file, handleAction, isLoadingApprove, isLoadingReject, openFileModal }) => {
    const formattedDate = format(new Date(file?.uploadedAt), "yyyy-MM-dd HH:mm:ss");
    
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-bold text-main mb-2">{file?.studentName}</h3>
            
            <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center border-b pb-1">
                    <span className="text-gray-600 text-sm">FileName:</span>
                    <button 
                        onClick={() => openFileModal(file?.fileUrl)}
                        className="text-main font-medium text-sm hover:underline cursor-pointer"
                    >
                        {file?.fileName}
                    </button>
                </div>
                <div className="flex justify-between items-center border-b pb-1">
                    <span className="text-gray-600 text-sm">Created At:</span>
                    <span className="text-main font-medium text-sm">{formattedDate}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-1">
                    <span className="text-gray-600 text-sm">Status:</span>
                    <span className={`font-medium text-sm ${
                        file.status === "Approved"
                            ? "text-green-600"
                            : file.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                    }`}>
                        {file?.status}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Actions:</span>
                    <div className="flex justify-end gap-3">
                        <Button
                            className={`!bg-transparent !w-fit !p-0 !m-0
                                ${file?.status !== "Pending" ? "!opacity-50 !cursor-not-allowed" : ""}`}
                            onClick={() => handleAction(file?.id, "approve")}
                            disabled={file?.status !== "Pending" || isLoadingApprove || isLoadingReject}
                            loading={isLoadingApprove || isLoadingReject}
                            loaderProps={{ color: "#023336", type: "dots" }}
                        >
                            <AiFillCheckCircle color="#09C648" size={28} />
                        </Button>
                        <Button
                            className={`!bg-transparent !w-fit !p-0 !m-0
                                ${file?.status !== "Pending" ? "!opacity-50 !cursor-not-allowed" : ""}`}
                            onClick={() => handleAction(file?.id, "reject")}
                            disabled={file?.status !== "Pending" || isLoadingApprove || isLoadingReject}
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

// Table Row Component
const TableRow = ({ file, handleAction, isLoadingApprove, isLoadingReject, openFileModal  }) => {
    const formattedDate = format(new Date(file?.uploadedAt), "yyyy-MM-dd HH:mm:ss");

    return(
        <tr key={file?.id} className='border-b border-gray text-left'>
            <td className="px-2 py-2 text-main font-semibold">{file?.studentName}</td>
            <td className="px-2 py-2 text-main font-semibold">
                <button 
                    onClick={() => openFileModal(file?.fileUrl)}
                    className="hover:underline cursor-pointer"
                >
                    {file?.fileName}
                </button>
            </td>
            <td className="px-2 py-2 text-main font-semibold">{formattedDate}</td>
            <td
                className={
                    `px-2 py-2 font-semibold ${
                        file?.status === "Approved"
                            ? "text-green-600"
                            : file?.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                    }`
                }
            >
            {file?.status}
            </td>
            <td className="px-4 py-2">
                <div className="flex justify-start gap-2">
                    <Button
                        className={`!bg-transparent !w-fit !p-0 !m-0
                            ${file?.status !== "Pending" ? "!opacity-50 !cursor-not-allowed" : ""}`}
                        onClick={() => handleAction(file?.id, "approve")}
                        disabled={file?.status !== "Pending" || isLoadingApprove || isLoadingReject}
                        loading={isLoadingApprove || isLoadingReject}
                        loaderProps={{ color: "#023336", type: "dots" }}
                    >
                        <AiFillCheckCircle color="#09C648" size={28} />
                    </Button>
                    <Button
                        className={`!bg-transparent !w-fit !p-0 !m-0
                            ${file?.status !== "Pending" ? "!opacity-50 !cursor-not-allowed" : ""}`}
                        onClick={() => handleAction(file?.id, "reject")}
                        disabled={file?.status !== "Pending" || isLoadingApprove || isLoadingReject}
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

const FileApprove = ({isMobile, isTablet, getAllFiles, isLoadingGetAllFiles, handleAction, loadingStudentId, loadingAction, openFileModal}) => {
    return (
        <section className={`${isMobile ? 'px-3' : isTablet ? 'px-5' : 'px-8'} mb-4`}>
            {getAllFiles?.length <= 0 ? (
                <div className="w-full h-[60vh] flex justify-center items-center">
                    <NoDataFound />
                </div>
            ) : (
                <div className={`w-full py-3 bg-white mt-8 ${!isMobile && 'px-2'} rounded-md shadow-sm`}>
                    {/* Title */}
                    <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-textSecondColor mb-4 px-4`}>
                        Approve Student Files
                    </h1>

                    {/* Loading State */}
                    {isLoadingGetAllFiles && (
                        <div className="flex justify-center items-center p-8">
                            <Loader isLoading={true} />
                        </div>
                    )}

                    {/* Mobile View */}
                    {!isLoadingGetAllFiles && isMobile && (
                        <div className="px-3">
                            {getAllFiles?.length > 0 ? (
                                getAllFiles?.map((file) => (
                                    <MobileFileCard
                                        key={file?.id}
                                        file={file}
                                        handleAction={handleAction}
                                        isLoadingApprove={loadingStudentId === file?.id && loadingAction === 'approve'}
                                        isLoadingReject={loadingStudentId === file?.id && loadingAction === 'reject'}
                                        openFileModal={openFileModal}
                                    />
                                ))
                            ) : (
                                <EmptyState isMobile={true} />
                            )}
                        </div>
                    )}

                    {/* Desktop/Tablet View */}
                    {!isLoadingGetAllFiles && !isMobile && (
                        <ScrollArea>
                            <Table className="w-full text-left">
                                <TableHeader />
                                <tbody>
                                    {getAllFiles?.length > 0 ? (
                                        getAllFiles?.map((file) => (
                                            <TableRow 
                                                key={file?.id} 
                                                file={file} 
                                                handleAction={handleAction}
                                                isLoadingApprove={loadingStudentId === file?.id && loadingAction === 'approve'}
                                                isLoadingReject={loadingStudentId === file?.id && loadingAction === 'reject'}  
                                                openFileModal={openFileModal}          
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
            )}
        </section>
    )
}

// PropTypes for MobileFileCard
MobileFileCard.propTypes = {
    file: PropTypes.shape({
        id: PropTypes.string.isRequired,
        studentName: PropTypes.string.isRequired,
        fileName: PropTypes.string.isRequired,
        fileUrl: PropTypes.string.isRequired,
        uploadedAt: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired,
    handleAction: PropTypes.func.isRequired,
    isLoadingApprove: PropTypes.bool.isRequired,
    isLoadingReject: PropTypes.bool.isRequired,
    openFileModal: PropTypes.func.isRequired
};

// PropTypes for TableRow
TableRow.propTypes = {
    file: PropTypes.shape({
        id: PropTypes.string.isRequired,
        studentName: PropTypes.string.isRequired,
        fileName: PropTypes.string.isRequired,
        fileUrl: PropTypes.string.isRequired,
        uploadedAt: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired,
    handleAction: PropTypes.func.isRequired,
    isLoadingApprove: PropTypes.bool.isRequired,
    isLoadingReject: PropTypes.bool.isRequired,
    openFileModal: PropTypes.func.isRequired
};

// PropTypes for EmptyState
EmptyState.propTypes = {
    colSpan: PropTypes.number,
    isMobile: PropTypes.bool.isRequired
};

// PropTypes for FileApprove
FileApprove.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    isTablet: PropTypes.bool.isRequired,
    getAllFiles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            studentName: PropTypes.string.isRequired,
            fileName: PropTypes.string.isRequired,
            fileUrl: PropTypes.string.isRequired,
            uploadedAt: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired
        })
    ).isRequired,
    isLoadingGetAllFiles: PropTypes.bool.isRequired,
    handleAction: PropTypes.func.isRequired,
    loadingStudentId: PropTypes.string,
    loadingAction: PropTypes.string,
    openFileModal: PropTypes.func.isRequired
};

export default FileApprove;