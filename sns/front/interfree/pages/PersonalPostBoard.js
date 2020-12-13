import React, { useCallback, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Avatar from "react-avatar";
import Router from "next/router";

import Menu from "../components/firstSeePage/Menu";

import NonePostAlert from "../components/post/NonePostAlert";
import PostBoardLoading from "../components/loading/PostBoardLoading";
import PreviewProfileModal from "../components/post/PreviewProfileModal";
import VerticalNav from "../components/layout/VerticalNav";
import ScrollButton from "../components/layout/ScrollButton";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import { useDispatch, useSelector } from "react-redux";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_POST_REQUEST } from "../reducers/post";

import { Row, Col, Tabs, TabContainer, Button, Nav } from "react-bootstrap";

import { BsBookmarksFill, BsFillBarChartFill } from "react-icons/bs";
import { GoOrganization } from "react-icons/go";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";
import { backUrl } from "../config/config";

// 컴포넌트 시작
const PersonalPostBoard = () => {
  const { user } = useSelector((state) => state.user);
  const { loadPostDone } = useSelector((state) => state.post);

  const { posts, loadOneuserChartdataDone } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Menu />
      <PreviewProfileModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div
        className="col-md-8 container justify-content-center"
        style={{ backgroundColor: "#EFF2F5", paddingTop: "75px" }}
      >
        <Row></Row>
      </div>
      <div className="container justify-content-center">
        <Row>
          <Col md={3}>
            <VerticalNav />
          </Col>
          <Col md={7}>{loadOneuserChartdataDone && <OneuserChartPage />}</Col>
          <PostBoardLoading />
        </Row>
      </div>

      <FloatingButton />
      <ScrollButton />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default PersonalPostBoard;
