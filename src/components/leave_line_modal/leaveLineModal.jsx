import { Modal, Button } from "react-bootstrap";
const LeaveLineModal = (props) => {
  const leaveLine = () => {
    props.confirmLeaving(true);
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" className="pt-5">
      <Modal.Header closeButton>
        <Modal.Title>Leaving Line</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Leaving the line means losing your spot. Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          No
        </Button>
        <Button variant="primary" onClick={leaveLine}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeaveLineModal;
