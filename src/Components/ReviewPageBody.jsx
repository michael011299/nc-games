import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getReviews } from "../APIcalls";

const ReviewPageBody = ({ setReviewID }) => {
  const { reviewCategory } = useParams();
  const [Loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [sortUrl, setSortUrl] = useState();
  const [orderUrl, setOrderUrl] = useState();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const handleToggle = () => {
    setSortMenuOpen(!sortMenuOpen);
  };

  useEffect(() => {
    setLoading(true);
    getReviews(sortUrl, orderUrl, reviewCategory)
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
  }, [sortUrl, orderUrl]);

  if (Loading) {
    return <div id="spinner">Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2 id="strategyh2">{reviewCategory} - Reviews</h2>
        <div id="orderby">
          <fieldset>
            <legend>Order Results:</legend>
            <div>
              <input
                type="radio"
                id="ascending"
                name="order"
                value="ascending"
                onClick={() => setOrderUrl(`ASC`)}
              />
              <label htmlFor="ascending">Ascending</label>
            </div>
            <div>
              <input
                type="radio"
                id="descending"
                name="order"
                value="descending"
                onClick={() => setOrderUrl(`DESC`)}
              />
              <label htmlFor="descending">Descending</label>
            </div>
          </fieldset>
        </div>
        <div id="sortpage">
          <DropdownButton
            id="dropdown-basic-button"
            title={sortMenuOpen ? "Open" : "Sort By"}
            onClick={handleToggle}
          >
            <Dropdown className={sortMenuOpen ? "Open" : "sortby"}>
              <Dropdown.Item
                className={sortMenuOpen ? "Open" : "sortby"}
                onClick={() => {
                  setSortUrl("title");
                }}
              >
                Title
                <br />
              </Dropdown.Item>
              <Dropdown.Item
                className={sortMenuOpen ? "Open" : "sortby"}
                onClick={() => {
                  setSortUrl("votes");
                }}
              >
                votes <br />
              </Dropdown.Item>
              <Dropdown.Item
                className={sortMenuOpen ? "Open" : "sortby"}
                onClick={() => {
                  setSortUrl("created_at");
                }}
              >
                Created at
                <br />
              </Dropdown.Item>
              <Dropdown.Item
                className={sortMenuOpen ? "Open" : "sortby"}
                onClick={() => {
                  setSortUrl("comment_count");
                }}
              >
                Comment count
                <br />
              </Dropdown.Item>
            </Dropdown>
          </DropdownButton>
        </div>
        <div id="reviewpage">
          {reviews.map((review) => {
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
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewPageBody;
