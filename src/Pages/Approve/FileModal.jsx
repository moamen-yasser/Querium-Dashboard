import { Button, Modal } from "@mantine/core"
import PropTypes from 'prop-types';

const FileModal = ({opened, closeModal, fileUrl}) => {
    return (
        <Modal
            opened={opened}
            onClose={closeModal}
            title="File Preview"
            size="xl"
            overflow="inside"
        >
            <div style={{ height: "70vh" }}>
                {fileUrl && (
                    <iframe 
                        src={`${fileUrl}#view=fitH`} 
                        width="100%" 
                        height="100%"
                        style={{ border: "none" }}
                        title="File Preview"
                    />
                )}
            </div>
            <div className="flex justify-end mt-4">
                <Button onClick={closeModal} color="gray">
                    Close
                </Button>
            </div>
        </Modal>
    )
}

FileModal.propTypes = {
    opened: PropTypes.bool.isRequired,
    closeModal: PropTypes.bool.isRequired,
    fileUrl: PropTypes.string.isRequired
};

export default FileModal