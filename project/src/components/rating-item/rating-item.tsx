import { ChangeEvent } from 'react';
import { RatingProp } from '../../types/review-form';

function RatingItem(props: RatingProp) : JSX.Element {
  const {sendRating, disable, value} = props;
  const idInput = `${value}-stars`;

  const handleRadioButtonChange = (evt: ChangeEvent<HTMLInputElement>) => {
    sendRating(evt.target.value);
  };

  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={idInput} type="radio" onChange={handleRadioButtonChange} disabled={disable}/>
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingItem;
