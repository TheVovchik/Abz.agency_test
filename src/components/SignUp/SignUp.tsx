import { AxiosError } from 'axios';
import { FC, useState, useCallback } from 'react';
import { getToken, postUser } from '../../Api/api';
import { ApiError } from '../../types/ApiError';
import { NewUser } from '../../types/User';
import { Loader } from '../Loader';
import { Form } from './Form';
import './SignUp.scss';
import { Success } from './Success';

type Props = {
  isForm: boolean,
  changeFormState: (state: boolean) => void,
  goTo: (id: string) => void,
  handleUsersLoad: () => void,
};

export const SignUp: FC<Props> = ({
  isForm,
  changeFormState,
  goTo,
  handleUsersLoad,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (
    user: NewUser,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    setIsSuccess(false);
    setIsLoading(true);
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append('position_id', `${user.position_id}`);
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('phone', user.phone);
      if (user.photo) {
        formData.append('photo', user.photo);
      }

      const token = await getToken();

      await postUser('users', formData, token);

      setErrorMessage('');
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        changeFormState(false);
        goTo('userSection');
        handleUsersLoad();
      }, 2500);
    } catch (error) {
      const err = error as AxiosError;

      const apiMessage = err.response?.data as ApiError;
      const apiStatus = err.response?.status;

      if (apiMessage && apiStatus) {
        setErrorMessage(apiMessage.message);
      }
    }

    setIsLoading(false);
  }, []);

  return (
    <div className="sign-up">
      <h2 id="formElement" className="sign-up__title">
        Working with POST request
      </h2>

      {isLoading && <Loader />}

      {isSuccess && isForm && !isLoading && <Success />}

      {!isSuccess && isForm && !isLoading && (
        <Form
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
