import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getReviews } from "../APIcalls";
import { useEffect, useState } from "react";

const ReviewSorting = ({ sortUrl, setReviewID }) => {
  const [Loading, setLoading] = useState(true);
  const { reviewCategory } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getReviews(sortUrl)
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
                  <Card.Text>
                    Posted on: {review.created_at.slice(0, 10)}
                  </Card.Text>
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
      )}
    </div>
  );
};

export default ReviewSorting;
