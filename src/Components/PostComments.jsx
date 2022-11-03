import { useState } from "react";
import { postComments } from "../APIcalls";
import { useParams } from "react-router-dom";

const PostComments = ({ setCommentList }) => {
  const [newComment, setNewComment] = useState("");
  const { reviewID } = useParams();
  const [isUploading, setIsUploading] = useState(false);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsUploading(true);
    postComments(reviewID, newComment).then((response) => {
      setCommentList((currCommentList) => {
        setIsUploading(false);
        return [response, ...currCommentList];
      });
    });

    setNewComment("");
  };

  return (
    <div>
      <form id="addComment">
        <fieldset id="fieldset">
          <legend>Add Comment</legend>
          <label> Comment: </label>
          <input
            id="addToDo"
            type="text"
            value={newComment}
            onChange={handleCommentChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Add
          </button>
          <div>
            {isUploading ? <p id="isUploading">Uploading...</p> : <></>}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default PostComments;
