import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ReviewPageBody = ({ reviews, reviewCategory, setReviewID }) => {
  return (
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
                  <Button
                    onClick={() => {
                      return setReviewID(review.review_id);
                    }}
                  >
                    Review
                  </Button>
                </Link>
              </Card>
            );
        })}
      </div>
    </div>
  );
};

export default ReviewPageBody;
