import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./formModal.css";
const FormModal = (props) => {
  const { title, show, handleClose, handleSubmit, children } = props;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form autoComplete="off">
        <Modal.Header>
          <Modal.Title> {title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button
            className="cancel-btn"
            variant="secondary"
            onClick={handleClose}
          >
            Annuler
          </Button>
          <Button
            className="validate-btn"
            variant="primary"
            onClick={handleSubmit}
          >
            Valider
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormModal;
