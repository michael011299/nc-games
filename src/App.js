import "./App.css";
import Header from "./Components/Header";
import Categories from "./Components/Categories";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPageBody from "./Components/ReviewPageBody";
import { useState } from "react";

const App = () => {
  const [reviewCategory, setReviewCategory] = useState("");

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
            element={<ReviewPageBody reviewCategory={reviewCategory} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
