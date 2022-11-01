import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { getReviews } from "../APIcalls";

const ReviewPageBody = ({ reviewCategory, setReviewID }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReviews()
      .then((reviews) => {
        setReviews(reviews);
      })
      .catch((err) => {
        if (err.response.status)
          setError(
            `Ooops, ${err.response.request.status}, ${err.response.request.statusText}, please try again`
          );
      });
  }, []);

  return (
    <div>
      {error ? (
        <div id="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <div>
            <h2>{reviewCategory} - reviews</h2>
          </div>
          <div id="reviewpage">
            {reviews.map((review) => {
              if (reviewCategory === review.category)
                return (
                  <Card id="reviewCard" key={review.review_id}>
                    <Card.Title>{review.title}</Card.Title>
                    <Card.Text>Category: {review.category}</Card.Text>
                    <Card.Text>{review.review_body}</Card.Text>
                    <Card.Text>Owner: {review.owner}</Card.Text>
                    <Link to={`/reviews/${review.review_id}`}>
                      <Button onClick={() => setReviewID(review.review_id)}>
                        Review
                      </Button>
                    </Link>
                  </Card>
                );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPageBody;
