import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentsByReviewID, getReviewByID } from "../APIcalls";

const SingleReview = () => {
  const { reviewID } = useParams();
  const [singularReview, setSingularReview] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getReviewByID(reviewID)
      .then((review) => {
        setSingularReview(review);
        setCount(review.votes);
      })
      .catch((err) => {
        if (err.response.status)
          setError(
            `Ooops, ${err.response.request.status}, ${err.response.request.statusText}, please try again`
          );
      });
  }, [reviewID]);

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
    <div>
      {error ? (
        <div id="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>Review #{singularReview.review_id}</h2>
          <div id="reviewpage">
            <Card id="reviewCard" key={singularReview.review_id}>
              <Card.Title id="Title">{singularReview.title}</Card.Title>
              <Card.Text id="cardCat">{singularReview.category}</Card.Text>
              <Card.Text>{singularReview.review_body}</Card.Text>
              <Card.Text>Owner: {singularReview.owner}</Card.Text>
              <Button
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                Votes: {count}
              </Button>
            </Card>
          </div>
          <h3>Review #{singularReview.review_id} comments :</h3>
          <div id="commentPage">
            {comments.map((comment) => {
              return (
                <Card className="singleCommentCard" id={comment.comment_id}>
                  <Card.Title>Author: {comment.author}</Card.Title>
                  <Card.Text>Comment: {comment.body}</Card.Text>
                  <Button>Votes: {comment.votes}</Button>
                  <Card.Text>{comment.created_at}</Card.Text>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleReview;
