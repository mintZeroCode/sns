import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Title from "../../components/layout/Title";
import PostBoard from "../../components/post/PostBoard";

import { useSelector, useDispatch } from "react-redux";
import { LOAD_HASHTAGPAGE_REQUEST } from "../../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../../reducers/user";

import { SessionRow } from "../../styledComponents/layout/Session";

import { Button, Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import axios from "axios";

const HashtagPage = () => {
  const dispatch = useDispatch();
  const { Posts } = useSelector((state) => state?.post?.posts);
  const router = useRouter();

  const { tag } = router.query;

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_HASHTAGPAGE_REQUEST,
  //     data: tag,
  //   });
  // }, [tag]);

  return (
    <div className="container justify-content-center">
      <SessionRow>
        <Col md={7}>
          <Title title={"해시태그 페이지"} />

          {Posts?.length > 0 &&
            Posts.map((element, index) => (
              <PostBoard
                key={index}
                post={element.contents}
                postId={element.id}
                userId={element.UserId}
                profileImg={
                  element.User.ProfileImgSrcs.length > 0
                    ? element.User.ProfileImgSrcs[0].src
                    : false
                }
                nickname={element.User.nickname}
                like={element.like} //포스트 좋아요 수
                Likes={
                  element.Likes.length > 0 ? element.Likes[0].LikeUserId : false
                } //포스트 좋아요 했는지 확인
                reportCount={element.Reports}
                PostImgSrcs={element.PostImgSrcs}
                PostVideoSrcs={element.PostVideoSrcs}
                onlyReadMy={element.onlyReadMy}
                bookmarkId={
                  element.Bookmarks.length > 0
                    ? element.Bookmarks[0].UserId
                    : false
                }
                date={element.createdAt}
              />
            ))}
        </Col>
      </SessionRow>
      {/* <Button onClick={() => router.back()}>뒤로가기</Button> */}
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
      type: LOAD_HASHTAGPAGE_REQUEST,
      data: { tag: context.params.tag },
    });
    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default HashtagPage;
