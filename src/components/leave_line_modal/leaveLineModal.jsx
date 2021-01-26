import { Modal, Button } from "react-bootstrap";
const LeaveLineModal = (props) => {
  const leaveLine = () => {
    props.confirmLeaving(true);
    props.onHide();
  };

  return (
    <Modal {...props} size="lg" className="pt-5">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Leaving Line
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Leaving the line means losing your spot. Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={leaveLine}>Yes</Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeaveLineModal;
