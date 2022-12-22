import { FC, memo, useCallback } from 'react';
import Logo from '../../images/Logo.svg';
import { Button } from '../Button';
import './Header.scss';

type Props = {
  handleUsersLoad: () => void,
  changeFormState: (state: boolean) => void,
  goTo: (id: string) => void,
};

export const Header: FC<Props> = memo(({
  handleUsersLoad,
  changeFormState,
  goTo,
}) => {
  const showUser = useCallback(() => {
    goTo('userSection');
    handleUsersLoad();
  }, []);

  const showSignUp = useCallback(() => {
    goTo('formElement');
    changeFormState(true);
  }, []);

  return (
    <header className="root__header header">
      <div className="header__logo">
        <img src={Logo} alt="test task" className="header__logo-img" />
      </div>

      <div className="header__buttons">
        <Button
          className="button"
          onClick={showUser}
        >
          Users
        </Button>

        <Button
          className="button"
          onClick={showSignUp}
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
});
