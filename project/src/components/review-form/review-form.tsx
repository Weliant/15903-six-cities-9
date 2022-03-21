import React from 'react';
import { FormEvent, ChangeEvent, useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { ReviewFormProp } from '../../types/review-form';

function ReviewForm(props: ReviewFormProp) : JSX.Element {
  const {sendReview, error, isLoaded} = props;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [disable, setDisable] = useState(false);

  const formRef = useRef<null | HTMLFormElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!disable) {
      sendReview(comment, +rating);
    }
  };

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleRadioButtonChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  useEffect(() => {
    if (isLoaded) {
      setDisable(false);

      if (!error) {
        const refElement = formRef.current;
        refElement?.reset();

        setRating('');
        setComment('');
      }
    } else {
      setDisable(true);
    }

  }, [dispatch, error, isLoaded]);

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit} ref={formRef}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" ref={inputRef} onChange={handleRadioButtonChange} disabled={disable}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" ref={inputRef} onChange={handleRadioButtonChange} disabled={disable}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" ref={inputRef} onChange={handleRadioButtonChange} disabled={disable}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" ref={inputRef} onChange={handleRadioButtonChange} disabled={disable}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" ref={inputRef} onChange={handleRadioButtonChange} disabled={disable} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextareaChange}
        value={comment}
        disabled={disable}
        ref={textAreaRef}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={comment.length < 50 || !rating || disable}>Submit</button>
      </div>
    </form>
  );
}

export default React.memo(ReviewForm, (prevProps, nextProps) => prevProps.isLoaded === nextProps.isLoaded);
