import { Modal, Button, Text } from '@mantine/core';

export function ConfirmModal({
  opened,
  close,
  title,
  description,
  handleConfirm,
  actionText,
  isLoading
}) {
  return (
    <Modal
      opened={opened}
      onClose={() => {}} 
      title="Confirm Action"
      centered
      size="lg"
      withCloseButton={false} 
      closeOnClickOutside={false}
      closeOnEscape={false} 
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3
      }}
    >
      <div className="space-y-2">
          <Text className="!text-base !font-semibold">
            {title}
          </Text>
          <Text className="!text-sm !bg-gray-100 !p-2 !font-medium !text-gray-600">
            {description}            
          </Text>        
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              className="!border-gray !text-gray"
              disabled={isLoading}
              onClick={close}
            >
              No, Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              color={actionText === "Approve" ? "#09C648" : "red" }
              loading={isLoading}
              loaderProps={{
                  color: 'white',
                  size: 'sm',
                  type: 'dots'
              }} 
            >
              Yes, {actionText}
            </Button>
          </div>
      </div>
    </Modal>
  );
}