import { Modal, Button } from "react-bootstrap";
const LeaveLineModal = (props) => {
  const leaveLine = () => {
    props.confirmLeaving(true);
    props.onHide();
  };
  const stayInLine = () => {
    if (props.replace) {
      props.confirmLeaving(false);
    }
    props.onHide();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      className="pt-5"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Leaving Line</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.replace && (
          <p>
            You're currentline in another line. Getting in a new one means
            losing your spot in the first. Are you sure you want to replace your
            ticket?
          </p>
        )}
        {!props.replace && (
          <p>Leaving the line means losing your spot. Are you sure?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={stayInLine}>
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
