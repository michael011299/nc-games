import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = ({ setReviewCategory, reviewCategory }) => {
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
          <Card id="categories" key={category.slug}>
            <Card.Title id="catTitle">{category.slug}</Card.Title>
            <Card.Text>{category.description}</Card.Text>
            <Link to={`/${category.slug}/reviews`}>
              <Button
                id="selectCatButton"
                onClick={() => {
                  return setReviewCategory(category.slug);
                }}
              >
                ➡️
              </Button>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default Categories;
