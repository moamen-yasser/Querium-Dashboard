import { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import { useApproveFileMutation, useGetAllFilesQuery, useRejectFileMutation } from "../../Service/Apis/approveApi";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { showNotification } from "../../utils/notification";
import FileModal from "./FileModal";
import FileApprove from "./FileApprove";
import PropTypes from 'prop-types';
import { ConfirmModal } from "../../Components/ConfirmModal";

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

    const [confirmModalOpened, { open: openConfirmModal, close: closeConfirmModal }] = useDisclosure(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [currentFileId, setCurrentFileId] = useState(null);

    const handleActionClick = (id, action) => {
        setCurrentFileId(id);
        setCurrentAction(action);
        openConfirmModal();
    };

    const handleConfirmAction = async () => {
        try {
            setLoadingStudentId(currentFileId);
            setLoadingAction(currentAction);
            
            if (currentAction === "approve") {
                const response = await Approve({id: currentFileId}).unwrap();
                refetch();
                showNotification.success(response);
            } else if (currentAction === "reject") {
                const response = await Reject({id: currentFileId}).unwrap();
                refetch();
                showNotification.success(response);
            }
        } catch (error) {
            showNotification.error(error);
        } finally {
            setLoadingStudentId(null);
            setLoadingAction(null);
            closeConfirmModal();
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

            <ConfirmModal 
                opened={confirmModalOpened}
                close={closeConfirmModal}
                title={currentAction === 'approve' ? "Approve File" : "Reject File"}
                description={currentAction === 'approve' 
                    ? "Are you sure you want to approve this file?" 
                    : "Are you sure you want to reject this file?"}
                handleConfirm={handleConfirmAction}
                actionText={currentAction === 'approve' ? "Approve" : "Reject"}
                isLoading={loadingStudentId === currentFileId && loadingAction === currentAction}
            />

            <FileApprove 
                isMobile={isMobile}
                isTablet={isTablet}
                getAllFiles={getAllFiles}
                isLoadingGetAllFiles={isLoadingGetAllFiles}
                loadingStudentId={loadingStudentId}
                loadingAction={loadingAction}
                handleAction={handleActionClick}
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
