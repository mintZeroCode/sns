import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import Loading from "../loading/Loading";

import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PROFILE_REQUEST } from "../../reducers/user";
import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { BsExclamationTriangle } from "react-icons/bs";
import styled from "styled-components";

const Styledp = styled.p`
  font-size: 25px;

  @media (max-width: 992px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
`;

const Styledinput = styled.input`
  width: 250px;
  @media (max-width: 992px) {
    width: 200px;
  }
  @media (max-width: 772px) {
    width: 190px;
  }
  @media (max-width: 600px) {
    width: 190px;
  }
  @media (max-width: 600px) {
    width: 140px;
  }
`;

const NotReviseAlert = () => {
  const [] = useState();
  const [] = useState();
  const [] = useState();

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="tooltip-disabled">수정할 수 없어요.</Tooltip>}
      >
        <span className="d-inline-block">
          <BsExclamationTriangle />
        </span>
      </OverlayTrigger>
    </>
  );
};

const Profile = () => {
  const { id, email, nickname, createdAt } = useSelector(
    (state) => state.user.user
  );
  const {
    changeProfileDone,
    changeProfileError,
    changeProfileLoading,
  } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [introduceValue, setIntroduceValue] = useState();
  const [shereLinkValue, setShereLinkValue] = useState("http://www.");
  const [whereValue, setWhereValue] = useState();

  const dispatch = useDispatch();

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <td>
              <Styledp>닉네임</Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                value={nicknameValue}
                onChange={(e) => {
                  setNicknameValue(e.target.value);
                }}
              ></Styledinput>
            </td>
          </tr>
          <tr>
            <td>
              <Styledp>
                이메일 <NotReviseAlert />
              </Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                value={email}
                readOnly
                disabled
              ></Styledinput>
            </td>
          </tr>
          <tr>
            <td>
              <Styledp>
                가입일 <NotReviseAlert />
              </Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                value={createdAt}
                disabled
                readOnly
              ></Styledinput>
            </td>
          </tr>

          <tr>
            <td>
              <Styledp>소개</Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                onChange={(e) => {
                  setIntroduceValue(e.target.value);
                }}
              ></Styledinput>
            </td>
          </tr>
          <tr>
            <td>
              <Styledp>링크</Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                onChange={(e) => {
                  setShereLinkValue(e.target.value);
                }}
                onClick={(e) => {
                  if (e.target.value != "http://www.") {
                    e.target.value = shereLinkValue;
                  } else {
                    e.target.value = "http://www.";
                  }
                }}
              ></Styledinput>
            </td>
          </tr>
          <tr>
            <td>
              <Styledp>사는 곳</Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                onChange={(e) => {
                  setWhereValue(e.target.value);
                }}
              ></Styledinput>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button
                variant="primary"
                className=" float-right"
                onClick={() => {
                  dispatch({
                    type: CHANGE_PROFILE_REQUEST,
                    data: {
                      id,
                      nicknameValue,
                      introduceValue,
                      shereLinkValue,
                      whereValue,
                    },
                  });
                }}
              >
                반영
              </Button>
              {changeProfileLoading && <Loading />}
              {changeProfileDone && <p>반영이 완료되었습니다.</p>}
              {changeProfileError && <p>에러가 발생했습니다.</p>}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default Profile;
