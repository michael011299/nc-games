import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://michaels-back-end-project-22.herokuapp.com/api",
});

export const getReviews = () => {
  return gamesApi.get(`/reviews`).then((response) => {
    return response.data.reviews;
  });
};

export const getReviewByID = (reviewID) => {
  return gamesApi
    .get(`/reviews/${reviewID}`)
    .then((response) => response.data.review);
};

export const getCategories = () => {
  return gamesApi.get(`/categories`).then((response) => {
    return response.data.categories;
  });
};
