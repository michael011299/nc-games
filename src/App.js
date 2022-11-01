import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Categories from "./Components/Categories";
import ReviewPageBody from "./Components/ReviewPageBody";
import SingleReview from "./Components/SingleReview";

const App = () => {
  const [reviewCategory, setReviewCategory] = useState("");
  const [reviewID, setReviewID] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://michaels-back-end-project-22.herokuapp.com/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
      });
  }, [reviews]);

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Categories
                setReviewCategory={setReviewCategory}
                reviewCategory={reviewCategory}
              />
            }
          />
          <Route
            path={`/${reviewCategory}/reviews`}
            element={
              <ReviewPageBody
                reviews={reviews}
                reviewCategory={reviewCategory}
                setReviewID={setReviewID}
              />
            }
          />
          <Route
            path={`/reviews/${reviewID}/`}
            element={<SingleReview reviews={reviews} reviewID={reviewID} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
