import { useState } from "react";
import { postComments } from "../APIcalls";
import { useParams } from "react-router-dom";

const PostComments = () => {
  // const [newUsername, setUserName] = useState("");
  const [newComment, setNewComment] = useState("");
  const { reviewID } = useParams();

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postComments(reviewID, newComment);
    setNewComment("");
    // setUserName("");
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
          <button onClick={handleSubmit} type="submit">
            Add
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default PostComments;

//   const handleUserNameChange = (event) => {
//     setUserName(event.target.value);
//   };

/* <label>Username: </label>
          <input
            id="username"
            type="text"
            value={newUsername}
            onChange={handleUserNameChange}
          /> */
