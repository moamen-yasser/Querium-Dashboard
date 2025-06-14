import { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import { useApproveFileMutation, useGetAllFilesQuery, useRejectFileMutation } from "../../Service/Apis/approveApi";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "../../utils/notification";
import FileModal from "./FileModal";
import FileApprove from "./FileApprove";
import PropTypes from 'prop-types';

// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Approve", link: "/dashboard/approve" },
];

const Approve = ({isMobileScreen, isSidebarOpen, setIsSidebarOpen }) => {
    const {data: getAllFiles, isLoading: isLoadingGetAllFiles, refetch} = useGetAllFilesQuery();
    const [Approve] = useApproveFileMutation();
    const [Reject] = useRejectFileMutation();
    const [loadingStudentId, setLoadingStudentId] = useState(null);
    const [loadingAction, setLoadingAction] = useState(null);
    const [opened, setOpened] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const handleAction = async (id, action) => {
        try {
            setLoadingStudentId(id);
            setLoadingAction(action);
            if (action === "approve") {
                const response = await Approve({id}).unwrap(); 
                refetch();
                showNotification.success(response);
            } else if (action === "reject") {
                const response = await Reject({id}).unwrap(); 
                refetch();
                showNotification.success(response);
            }
        } catch (error) {
            showNotification.error(error);
        } finally {
            setLoadingStudentId(null);
            setLoadingAction(null);
        }
    };

    const openFileModal = (relativeUrl) => {
        const baseUrl = import.meta.env.VITE_FILE_BASE_URL;
        const fullUrl = `${baseUrl}${relativeUrl}`;
        setFileUrl(fullUrl);
        setOpened(true);
        console.log(fullUrl)
    };

    const closeModal = () => {
        setOpened(false);
        setFileUrl("");
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

            <FileModal 
                opened={opened}
                closeModal={closeModal}
                fileUrl={fileUrl}
            />

            <FileApprove 
                isMobile={isMobile}
                isTablet={isTablet}
                getAllFiles={getAllFiles}
                isLoadingGetAllFiles={isLoadingGetAllFiles}
                loadingStudentId={loadingStudentId}
                loadingAction={loadingAction}
                handleAction={handleAction}
                openFileModal={openFileModal}
            />
        </>
    );
};

Approve.propTypes = {
    isMobileScreen: PropTypes.bool.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    setIsSidebarOpen: PropTypes.func.isRequired
};

export default Approve;
