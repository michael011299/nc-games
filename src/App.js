import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Categories from "./Components/Categories";
import ReviewPageBody from "./Components/ReviewPageBody";
import SingleReview from "./Components/SingleReview";
import { getReviews } from "./APIcalls";

const App = () => {
  const [reviewCategory, setReviewCategory] = useState("");
  const [reviewID, setReviewID] = useState("");

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
                reviewCategory={reviewCategory}
                setReviewID={setReviewID}
              />
            }
          />
          <Route path={`/reviews/:reviewID`} element={<SingleReview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
