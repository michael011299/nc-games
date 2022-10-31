// import { useState } from "react";
// import { useEffect } from "react";
// import { Card } from "react-bootstrap";

// const ReviewPageBody = () => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetch("https://michaels-back-end-project-22.herokuapp.com/api/reviews")
//       .then((response) => response.json())
//       .then((data) => {
//         setReviews(data.reviews);
//       });
//   }, [reviews]);

//   return (
//     <div id="display">
//       <h2>Reviews</h2>
//       <div>
//         {reviews.map((review) => {
//           return (
//             <Card id="reviewCard">
//               <Card.Title>{review.title}</Card.Title>
//               <Card.Text>Category: {review.category}</Card.Text>
//               <Card.Text>{review.review_body}</Card.Text>
//               <Card.Text>Owner: {review.owner}</Card.Text>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ReviewPageBody;