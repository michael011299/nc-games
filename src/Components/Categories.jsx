import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../APIcalls";

const Categories = ({ setReviewCategory }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => {
        if (err.response.status)
          setError(
            `Ooops, ${err.response.request.status}, ${err.response.request.statusText}, please try again`
          );
      });
  }, [categories]);

  return (
    <div>
      {error ? (
        <div id="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>Categories</h2>
          <div id="mainpage">
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
        </div>
      )}
    </div>
  );
};

export default Categories;
