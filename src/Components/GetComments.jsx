import { deleteComment, getCommentsByReviewID } from "../APIcalls";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PostComments from "./PostComments";

const GetComments = () => {
  const { reviewID } = useParams();
  const [error, setError] = useState(null);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    getCommentsByReviewID(reviewID)
      .then((data) => {
        setCommentList(data);
      })
      .catch((err) => {
        if (err.response.status)
          setError(
            `Ooops, ${err.response.request.status}, ${err.response.request.statusText}, please try again`
          );
      });
  }, [reviewID]);

  return (
    <>
      {error ? (
        <div id="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <div>
            <PostComments setCommentList={setCommentList} />
          </div>
          <div id="commentPage">
            {commentList.map((comment) => {
              return (
                <Card
                  key={comment.comment_id}
                  className="singleCommentCard"
                  id={comment.comment_id}
                >
                  <Card.Title>Author: {comment.author}</Card.Title>
                  <Card.Text>Comment: {comment.body}</Card.Text>
                  <Button>Votes: {comment.votes}</Button>
                  <Card.Text>Posted: {comment.created_at}</Card.Text>
                  <Button
                    id="deleteComment"
                    onClick={() => deleteComment(comment.comment_id)}
                  >
                    Delete This Comment ❌
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default GetComments;
