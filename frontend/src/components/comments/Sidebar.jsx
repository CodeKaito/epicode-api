import React from "react";
import { Container } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommentArea from "../comments/comment-area/CommentArea";
import "./styles.css";
import CommentList from "./comment-list/CommentList";

const Sidebar = ({ isVisible, handleClose, postId }) => {
  return (
    <div
      className="sidebar-comments"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      <Container>
        <div>
          <div className="fatimes-container">
            <div className="close-btn p-2" onClick={handleClose}>
              <FaTimes className="fatimes pointer" />
            </div>
          </div>

          <div className="comment-area-container d-flex p-2">
            <div className="p-3">
              <CommentArea postId={postId} />
            </div>
          </div>
        </div>
      </Container>
      <hr />
      <Container>
        <div className="comment-list-container d-flex p-2">
          <div className="p-3">
            <CommentList postId={postId} />
            <div className="my-5 d-flex justify-content-center">
              <p>End of the comments</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Sidebar;
