import { FC } from 'react';
import './Success.scss';
import SUCCESS from '../../../images/success-image.svg';

export const Success: FC = () => {
  return (
    <div className="success">
      <h3 className="success__title">
        User successfully registered
      </h3>

      <div className="success__image-box">
        <img
          src={SUCCESS}
          alt="successfully registrated"
          className="success__image"
        />
      </div>
    </div>
  );
};
