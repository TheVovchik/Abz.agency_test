import { FC, memo } from 'react';
import { User } from '../../../types/User';
import EmptyPhoto from '../../../images/photo-cover.svg';
import './Card.scss';
import { ToolTip } from '../../Tooltip';

type Props = {
  user: User,
};

export const Card: FC<Props> = memo(({ user }) => {
  const {
    name,
    email,
    phone,
    position,
    photo,
  } = user;

  return (
    <div className="card">
      <div className="card__photo-box">
        <img
          src={photo || EmptyPhoto}
          alt="empty"
          className="card__photo"
        />
      </div>

      <ToolTip tooltip={name}>
        <p className="card__name">
          {name}
        </p>
      </ToolTip>

      <div className="card__info">
        <ToolTip tooltip={position}>
          <p className="card__position">
            {position}
          </p>
        </ToolTip>

        <ToolTip tooltip={email}>
          <p className="card__email">
            {email}
          </p>
        </ToolTip>

        <ToolTip tooltip={phone}>
          <p className="card__phone">
            {phone}
          </p>
        </ToolTip>

      </div>
    </div>
  );
});
