import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://michaels-back-end-project-22.herokuapp.com/api",
});

export const getReviews = (
  sort_by = "created_at",
  order_by = "DESC",
  category
) => {
  return gamesApi
    .get(`/reviews`, { params: { sort_by, order_by, category } })
    .then((response) => {
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

export const postComments = (reviewID, newComment) => {
  return gamesApi
    .post(`/reviews/${reviewID}/comments`, {
      username: "tickle122",
      body: newComment,
    })
    .then((response) => {
      return response.data.comments;
    });
};

export const deleteComment = (comment_id) => {
  return gamesApi.delete(`/comments/${comment_id}`);
};
