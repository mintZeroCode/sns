import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import CommentForm from "./CommentForm";
import CommentBoard from "./CommentBoard";
import Loading from "../loading/Loading";

import { ADD_COMMENT_REQUEST } from "../../reducers/post";

import { Modal, Button, Form } from "react-bootstrap";

//props.postId,props.onHide
const CommentModal = (props) => {
  const { comments, loadCommentLoading, loadCommentDone } = useSelector(
    (state) => state.post
  );
  const postOneId = props.postId;
  const { id } = useSelector((state) => state.user.user);
  const [comment, SetComment] = useState();
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">댓글</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadCommentLoading ? (
            <Loading />
          ) : (
            comments.length == 0 && <p>작성된 댓글이 없습니다.</p>
          )}

          <div style={{ maxheight: "50px", overflow: "auto" }}>
            {comments.map((i, index) => (
              <CommentBoard
                // key={comments[index].id}

                id={comments[index].id}
                comments={comments[index].comment}
                nickname={comments[index].Post.User.nickname}
                date={comments[index].createdAt}
                writeUserId={comments[index].writeUserId}
                postId={props.postId}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer class="col-lg-12">
          <Form.Group>
            <Form.Label style={{ width: "100%" }}></Form.Label>
            <Form.Control
              class="col-lg-12"
              as="textarea"
              rows={2}
              placeholder="댓글 추가..."
              style={{
                resize: "none",
                marginTop: "1px",
                marginBottom: "12px",
              }}
              onChange={(e) => {
                SetComment(e.target.value);
              }}
            />
          </Form.Group>
          <Button onClick={props.onHide}>닫기</Button>
          <Button
            className="float-right"
            onClick={() => {
              dispatch({
                type: ADD_COMMENT_REQUEST,
                data: { comment, postOneId, id },
              });
            }}
            style={{
              marginTop: "1px",
              marginBottom: "12px",
            }}
          >
            추가
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CommentModal.propTypes = {
  props: PropTypes.object,
};

export default CommentModal;
