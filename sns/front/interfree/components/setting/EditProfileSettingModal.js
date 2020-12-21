import React from "react";

import Profile from "./Profile";

import { Table, Button, Modal } from "react-bootstrap";

const EditProfileSettingModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            프로필 설정
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Profile />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfileSettingModal;