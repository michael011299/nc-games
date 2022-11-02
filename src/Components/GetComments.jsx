import { getCommentsByReviewID } from "../APIcalls";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const GetComments = () => {
  const { reviewID } = useParams();
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByReviewID(reviewID)
      .then((data) => setComments(data))
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
        <div id="commentPage">
          {comments.map((comment) => {
            return (
              <Card
                key={comment.comment_id}
                className="singleCommentCard"
                id={comment.comment_id}
              >
                <Card.Title>Author: {comment.author}</Card.Title>
                <Card.Text>Comment: {comment.body}</Card.Text>
                <Button>Votes: {comment.votes}</Button>
                <Card.Text>{comment.created_at}</Card.Text>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default GetComments;
