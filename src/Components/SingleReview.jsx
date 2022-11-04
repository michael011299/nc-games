import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { decreaseVote, getReviewByID, increaseVote } from "../APIcalls";
import GetComments from "./GetComments";
import Spinner from "react-bootstrap/Spinner";

const SingleReview = () => {
  const { reviewID } = useParams();
  const [singularReview, setSingularReview] = useState({});
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getReviewByID(reviewID)
      .then((review) => {
        setSingularReview(review);
        setCount(review.votes);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status)
          setError(
            `Ooops, ${err.response.request.status}, ${err.response.request.statusText}, please try again`
          );
      });
  }, [reviewID]);

  if (Loading) {
    return (
      <div>
        <Spinner id="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

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
            <Card
              id={singularReview.review_id}
              key={singularReview.review_id}
              className="reviewCard"
            >
              <Card.Title id="Title">{singularReview.title}</Card.Title>
              <Card.Text id="cardCat">{singularReview.category}</Card.Text>
              <Card.Text>{singularReview.review_body}</Card.Text>
              <Card.Text>Owner: {singularReview.owner}</Card.Text>
              <Card.Text>
                Comment count: {singularReview.comment_count}
              </Card.Text>
              <Card.Text>Votes: {count}</Card.Text>
              <Button
                id="increaseVote"
                onClick={() => {
                  setCount(count + 1);
                  increaseVote(singularReview.review_id);
                }}
              >
                Vote for me here 😀
              </Button>
              <Button
                id="decreaseVote"
                onClick={() => {
                  setCount(count - 1);
                  decreaseVote(singularReview.review_id);
                }}
              >
                Remove a vote 🙃
              </Button>
            </Card>
          </div>
          <GetComments singularReview={singularReview} />
        </div>
      )}
    </div>
  );
};

export default SingleReview;
