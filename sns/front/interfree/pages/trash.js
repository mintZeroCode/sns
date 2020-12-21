import React from "react";

import { LOAD_TRASH_REQUEST } from "../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";

import { useDispatch, useSelector } from "react-redux";

import HorizontalNav from "../components/layout/HorizontalNav";
import TrashPostAlert from "../components/trash/TrashPostAlert";
import TrashPostForm from "../components/trash/TrashPostForm";
import VerticalNav from "../components/layout/VerticalNav";

import { Row, Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const trash = () => {
  const { trashPosts } = useSelector((state) => state.post);
  return (
    <div style={{ paddingTop: "75px", backgroundColor: "#F5F5F5" }}>
      <HorizontalNav />
      <VerticalNav />
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0px auto",
        }}
      >
        <Col md={7}>
          <TrashPostAlert />
          {trashPosts.map((element, index) => (
            <TrashPostForm
              key={index}
              postContents={element.contents}
              postId={element.postId}
              onlyReadMy={element.onlyReadMy}
              PostImgSrcs={element.imgSrc}
              PostVideoSrcs={element.videoSrc}
              date={element.createdAt}
            />
          ))}
        </Col>
      </Row>
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
      type: LOAD_TRASH_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default trash;
