import { Card } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const Categories = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://michaels-back-end-project-22.herokuapp.com/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
      });
  }, [reviews]);

  useEffect(() => {
    fetch("https://michaels-back-end-project-22.herokuapp.com/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, [categories]);

  return (
    <div id="mainpage">
      <h2>Categories</h2>
      {categories.map((category) => {
        return (
          <Card id="categories">
            <Card.Title id="catTitle">{category.slug}</Card.Title>
            <Card.Text>{category.description}</Card.Text>
            <div id="reviews">
              {reviews.map((review) => {
                if (review.category === category.slug) {
                  return (
                    <Card id="review">
                      <Card.Title id="reviewTitle">{review.title}</Card.Title>
                      <Card.Text id="reviewCategory">
                        {review.category}
                      </Card.Text>
                    </Card>
                  );
                }
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Categories;
