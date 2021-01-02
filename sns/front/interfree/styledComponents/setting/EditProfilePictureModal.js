import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col } from "react-bootstrap";

export const ProfileImg = styled.img`
  min-width: 180px;
  min-height: 180px;
  max-width: 180px;
  max-height: 180px;
  cursor: pointer;
`;

export const ProfileDiv = styled.div`
  width: 180px;
  height: 180px;
  background-color: #dcdcdc;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  border-radius: 50%;
  cursor: pointer;
`;

export const NicknameP = styled.p`
  font-size: 70px;
  font-weight: 600;
  margin: 0px;
`;