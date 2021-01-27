import { Modal, Button } from "react-bootstrap";
const NextInLineModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      className="pt-5"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Almost your turn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Two more numbers until your ticket! please return to the line.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NextInLineModal;
