import { Button, Modal } from "react-bootstrap";

const SignOutModal = ({
  showSignOutConfirmModal,
  setShowSignOutConfirmModal,
  handleSignOut,
}) => {
  return (
    <Modal
      show={showSignOutConfirmModal}
      onHide={() => {
        setShowSignOutConfirmModal(false);
      }}
    >
      <Modal.Body>Are you sure you want to log out?</Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleSignOut();
          }}
        >
          Log Out
        </Button>
        <Button
          onClick={() => {
            setShowSignOutConfirmModal(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignOutModal;
