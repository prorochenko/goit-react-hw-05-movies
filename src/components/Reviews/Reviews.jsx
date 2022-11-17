import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMoviesReviews } from '../Services/API';

const Reviews = () => {
  const { movieID } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMoviesReviews(movieID).then(setReviews);
  }, [movieID]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h2>{author}</h2>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>{`Sorry, there are no reviews yet :(`}</p>
      )}
    </div>
  );
};

export default Reviews;
