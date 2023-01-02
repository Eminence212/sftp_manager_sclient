import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./detailModal.css";
const DetailModal = (props) => {
  const { name, contact, showDetail, handleCloseDetail, children } = props;

  return (
    <Modal
      show={showDetail}
      onHide={handleCloseDetail}
      backdrop="static"
      keyboard={false}
      animation={true}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-bg">
        <Modal.Title> {name} </Modal.Title>
        <Modal.Title>{contact} </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="modal-bg">
        <Button
          className="validate-btn"
          variant="primary"
          onClick={handleCloseDetail}
        >
          Quitter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailModal;
