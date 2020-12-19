import React, { useState, useMemo } from "react";

import AddIconModal from "./AddIconModal";

import { ADD_TIMELINE_CONTENTS_REQUEST } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, Form } from "react-bootstrap";

const AddTimelineContentsModal = (props) => {
  const { id } = useSelector((state) => state.post.timelineId);
  const { addTimelineSubjectError } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const [content, setContent] = useState();
  const [moment, setMoment] = useState();
  const [title, setTitle] = useState();

  const [addIconModalShow, setAddIconModalShow] = useState(false);

  return (
    <div>
      <AddIconModal
        show={addIconModalShow}
        onHide={() => setAddIconModalShow(false)}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            한 타임라인 박스 추가하기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ marginBottom: "50px" }}>
            <Form.Group>
              <Form.Control
                as="input"
                style={{
                  resize: "none",
                  boxShadow: "1px 1px 3px 3px #F8F8FF",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
                rows={1}
                multiple
                placeholder="타임아웃의 제목을 입력하세요."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Form.Control
                as="input"
                style={{
                  resize: "none",
                  boxShadow: "1px 1px 3px 3px #F8F8FF",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
                rows={1}
                multiple
                placeholder="타임아웃의 내용을 입력하세요."
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <Form.Control
                as="input"
                style={{
                  resize: "none",
                  boxShadow: "1px 1px 3px 3px #F8F8FF",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
                rows={1}
                multiple
                placeholder="시기를 입력하세요. 예) 2018-2020,2018년 5월 28일"
                onChange={(e) => {
                  setMoment(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer class="col-lg-12">
          <Button
            className="btn float-right"
            onClick={props.onHide}
            style={{
              margin: "15px",
            }}
          >
            닫기
          </Button>
          <Button
            className="btn float-right"
            onClick={props.onHide}
            style={{
              margin: "15px",
            }}
            onClick={() => {
              dispatch({
                type: ADD_TIMELINE_CONTENTS_REQUEST,
                data: {
                  title,
                  content,
                  moment,
                  id, //타임라인 id
                },
              });
            }}
          >
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTimelineContentsModal;
