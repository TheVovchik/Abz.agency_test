import { FC, useState, useCallback } from 'react';
import { getUsers } from '../Api/api';
import { Header } from '../components/Header';
import { Introduction } from '../components/Introduction';
import { SignUp } from '../components/SignUp';
import { Users } from '../components/Users';
import { User } from '../types/User';
import './App.scss';

export const App: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoaded(true);
    setUsers([]);

    try {
      const usersFromApi = await getUsers('users');
      const sortedUsersByRegistration = [...usersFromApi]
        .sort((userA, userB) => (
          userB.registration_timestamp - userA.registration_timestamp
        ));

      setUsers(sortedUsersByRegistration);
    } catch (error) {
      setIsError(true);
    }

    setIsLoaded(false);
  }, []);

  const handleUsersLoad = useCallback(() => {
    loadData();
  }, []);

  const changeFormState = useCallback((state: boolean) => {
    setIsForm(state);
  }, []);

  const goTo = useCallback((id: string) => {
    const target = document.getElementById(id);

    if (target) {
      setTimeout(() => window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      }), 500);
    }
  }, []);

  return (
    <div id="home" className="app">
      <Header
        handleUsersLoad={handleUsersLoad}
        changeFormState={changeFormState}
        goTo={goTo}
      />

      <Introduction
        changeFormState={changeFormState}
        goTo={goTo}
      />

      <Users
        users={users}
        isLoaded={isLoaded}
        isError={isError}
      />

      <SignUp
        isForm={isForm}
        changeFormState={changeFormState}
        goTo={goTo}
        handleUsersLoad={handleUsersLoad}
      />
    </div>
  );
};
