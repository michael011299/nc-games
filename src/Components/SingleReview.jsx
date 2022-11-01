import { Card } from "react-bootstrap";

const SingleReview = ({ reviews, reviewID }) => {
  return (
    <div>
      <h2>Review #{reviewID}</h2>
      {reviews.map((review) => {
        if (reviewID === review.review_id) {
          return (
            <div>
              <Card id="singleReviewCard" key={review.review_id}>
                <Card.Title>{review.title}</Card.Title>
                <Card.Text>Category: {review.category}</Card.Text>
                <Card.Text>{review.review_body}</Card.Text>
                <Card.Text>Owner: {review.owner}</Card.Text>
              </Card>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SingleReview;
