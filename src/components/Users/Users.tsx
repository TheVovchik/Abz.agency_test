import {
  FC, useState, useCallback, memo,
} from 'react';
import { User } from '../../types/User';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { Card } from './Card/Card';
import './Users.scss';

type Props = {
  users: User[],
  isLoaded: boolean,
  isError: boolean,
};

const step = 6;

export const Users: FC<Props> = memo(({
  users, isLoaded, isError,
}) => {
  const [usersToShow, setUsersToShow] = useState(step);
  const [isMore, setIsMore] = useState(true);

  const handleCardsQuantityChange = useCallback(() => {
    const moreUsers = usersToShow + step;

    setUsersToShow(moreUsers);
    if (moreUsers > users.length) {
      setIsMore(false);
    }
  }, [usersToShow]);

  return (
    <section className="root__users users">
      <h2 id="userSection" className="users__title">
        Working with GET request
      </h2>

      {isError && (
        <h2>Something went wrong</h2>
      )}

      {isLoaded && <Loader />}

      {!isError && (
        <div className="users__cards">
          {users.slice(0, usersToShow).map(user => (
            <Card user={user} key={user.id} />
          ))}
        </div>
      )}

      {isMore && users.length > 0 && (
        <Button
          className="button"
          onClick={handleCardsQuantityChange}
        >
          Show more
        </Button>
      )}
    </section>
  );
});
