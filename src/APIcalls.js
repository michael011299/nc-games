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

export const increaseVote = (reviewID) => {
  return gamesApi
    .patch(`/reviews/${reviewID}`, { inc_votes: 1 })
    .then((response) => {
      return response;
    });
};

export const decreaseVote = (reviewID) => {
  return gamesApi
    .patch(`/reviews/${reviewID}`, { inc_votes: -1 })
    .then((response) => {
      return response;
    });
};

export const getCommentsByReviewID = (reviewID) => {
  return gamesApi
    .get(`/reviews/${reviewID}/comments`)
    .then((response) => response.data.comments);
};

export const postComments = (reviewID, newComments) => {
  console.log(newComments);
  return gamesApi
    .post(`/reviews/${reviewID}/comments`, newComments)
    .then((response) => {
      return response;
    });
};
