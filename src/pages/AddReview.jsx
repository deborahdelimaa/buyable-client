import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewService from "../services/review.service";
import { AuthContext } from "../context/auth.context";

function AddReview() {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const { id } = useParams();

  const handleComment = (e) => setComment(e.target.value);
  const handleRating = (e) => setRating(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { comment, rating };
    try {
      await ReviewService.createReview(body, id);
      setComment();

      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="formdiv">
      <form
        style={{ marginTop: "15vh", width: "30vw" }}
        className="form"
        onSubmit={handleSubmit}
      >
        <p>Create Review:</p>

        <input
          className="main-input"
          type="text"
          name="comment"
          id="comment"
          onChange={handleComment}
          placeholder="Your review here"
        />
        <input type="number" name="rating" onChange={handleRating} />

        <button
          style={{ marginRight: "0.5vw" }}
          required="true"
          className="submit"
          type="submit"
        >
          Create Review.
        </button>
      </form>
    </section>
  );
}

export default AddReview;
