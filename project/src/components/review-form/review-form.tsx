import React from 'react';
import { FormEvent, ChangeEvent, useState, useEffect, useRef } from 'react';
import { RATING_OFFER } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { ReviewFormProp } from '../../types/review-form';
import RatingItem from '../rating-item/rating-item';

function ReviewForm(props: ReviewFormProp) : JSX.Element {
  const {sendReview, error, isLoaded} = props;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const arrayRating = Array.from({length: RATING_OFFER}, (_,i)=> RATING_OFFER - i);

  const formRef = useRef<null | HTMLFormElement>(null);
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isLoaded) {
      sendReview(comment, +rating);
    }
  };

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const sendRating = (item: string) => {
    setRating(item);
  };

  useEffect(() => {
    if (isLoaded) {
      if (!error) {
        const refElement = formRef.current;
        refElement?.reset();

        setRating('');
        setComment('');
      }
    }

  }, [dispatch, error, isLoaded]);

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit} ref={formRef}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {arrayRating.map((item: number, index: number)=>(
          <RatingItem key={index.toString()} sendRating={(ratingNew) => {sendRating(ratingNew);}} disable={!isLoaded} value={item} />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextareaChange}
        value={comment}
        disabled={!isLoaded}
        ref={textAreaRef}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={comment.length < 50 || !rating || !isLoaded}>Submit</button>
      </div>
    </form>
  );
}

export default React.memo(ReviewForm, (prevProps, nextProps) => prevProps.isLoaded === nextProps.isLoaded);
