import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewByID } from "../APIcalls";

const SingleReview = () => {
  const { reviewID } = useParams();
  const [singularReview, setSingularReview] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    getReviewByID(reviewID)
      .then((review) => setSingularReview(review))
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
          <div>
            <Card id="singleReviewCard" key={singularReview.review_id}>
              <Card.Title>{singularReview.title}</Card.Title>
              <Card.Text>Category: {singularReview.category}</Card.Text>
              <Card.Text>{singularReview.review_body}</Card.Text>
              <Card.Text>Owner: {singularReview.owner}</Card.Text>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleReview;
