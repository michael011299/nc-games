import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getReviews } from "../APIcalls";
import Image from "react-bootstrap/Image";
import ReviewSorting from "./ReviewSorting";

const ReviewPageBody = ({ setReviewID }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { reviewCategory } = useParams();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getReviews()
      .then((reviews) => {
        setReviews(reviews);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status)
          setError(
            `Ooops, ${err.response.request.status}, ${err.response.request.statusText}, please try again`
          );
      });
  }, []);

  if (Loading) {
    return <div id="spinner">Loading...</div>;
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
          <div>
            <h2>{reviewCategory} - reviews</h2>
            <ReviewSorting />
          </div>
          <div id="reviewpage">
            {reviews.map((review) => {
              if (reviewCategory === review.category) {
                return (
                  <Card
                    className="reviewCard"
                    key={review.review_id}
                    id={review.review_id}
                  >
                    <Card.Title id="Title">{review.title}</Card.Title>
                    <Card.Text id="cardCat">{review.category}</Card.Text>
                    <Image
                      id="reviewImg"
                      alt={`user ${review.review_id}`}
                      src={review.review_img_url}
                    ></Image>
                    <Card.Text>{review.review_body}</Card.Text>
                    <Card.Text>Owner: {review.owner}</Card.Text>
                    <Card.Text>Votes: {review.votes}</Card.Text>
                    <Card.Text>Comments: {review.comment_count}</Card.Text>
                    <Link to={`/reviews/${review.review_id}`}>
                      <Button
                        id="reviewButton"
                        onClick={() => setReviewID(review.review_id)}
                      >
                        Leave comments and vote on reviews here ➡️
                      </Button>
                    </Link>
                  </Card>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPageBody;
