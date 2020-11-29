import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import {
  DELETE_TRASHPOST_REQUEST,
  RESTORE_TRASHPOST_REQUEST,
} from "../../reducers/post";
import { useSelector, useDispatch } from "react-redux";

import {
  AiFillDropboxSquare,
  AiFillCloseCircle,
  AiFillBackward,
} from "react-icons/ai";

import { Card, Dropdown, DropdownButton, Spinner } from "react-bootstrap";

import { backUrl } from "../../config/config";

const TrashPostForm = ({
  postContents,
  postId,
  onlyReadMy,
  PostImgSrcs,
  PostVideoSrcs,
  date,
}) => {
  const dispatch = useDispatch();
  const { id, nickname } = useSelector((state) => state.user.user);
  const { deletePostLoading, loadTrashDone } = useSelector(
    (state) => state.post
  );

  const dateSet = <Moment format="YYYY/MM/DD">{date}</Moment>;

  return (
    <div>
      <Card style={{ marginBottom: "15px" }}>
        <Card.Header
          style={{
            backgroundColor: "white",
            padding: "5px",
            lineHeight: "40px",
          }}
        >
          {nickname}
          <DropdownButton
            variant="light"
            className="float-right"
            title={<AiFillDropboxSquare />}
            drop="left"
            menuAlign="right"
          >
            <Dropdown.Item
              onClick={() => {
                dispatch({
                  type: RESTORE_TRASHPOST_REQUEST,
                  data: { postId },
                });
              }}
            >
              <AiFillBackward /> 복원
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                dispatch({
                  type: DELETE_TRASHPOST_REQUEST,
                  data: { postId },
                });
              }}
            >
              <AiFillCloseCircle /> 삭제
            </Dropdown.Item>
          </DropdownButton>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <h3>{postContents}</h3>
            {PostImgSrcs && (
              <img
                src={`${backUrl}/${PostImgSrcs}`}
                alt={PostImgSrcs}
                style={{
                  maxWidth: "40vw",
                  maxHeight: "auto",
                  marginBottom: "20px",
                }}
              />
            )}
            {PostVideoSrcs && (
              <video
                controls
                alt={`${PostVideoSrcs}`}
                src={`${backUrl}/${PostVideoSrcs}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "auto",
                  marginBottom: "20px",
                }}
              />
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer
          style={{
            backgroundColor: "white",
            textAlign: "center",
            padding: "5px",
          }}
        >
          {dateSet}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default TrashPostForm;
