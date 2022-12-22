import {
  FC, useState, useEffect, Fragment, useCallback, memo,
} from 'react';
import cn from 'classnames';
import { getPositions } from '../../../Api/api';
import { InputFields } from '../../../types/Input.enum';
import { Position } from '../../../types/Position';
import { NewUser } from '../../../types/User';
import './Form.scss';
import { Input } from './Input';
import { InputFile } from './InputFile';
import { Button } from '../../Button';

type Props = {
  handleSubmit: (
    user: NewUser,
    event: React.FormEvent<HTMLFormElement>,
  ) => void,
  errorMessage: string,
};

const emptyUser = {
  name: '',
  email: '',
  phone: '',
  position_id: 0,
  photo: null,
};

export const Form: FC<Props> = memo(({
  handleSubmit, errorMessage,
}) => {
  const [user, setUser] = useState<NewUser>(emptyUser);
  const [positions, setPositions] = useState<Position[]>([]);
  const [userPosition, setUserPosition] = useState(0);
  const [isOff, setIsOff] = useState(true);

  const loadPositions = useCallback(async () => {
    try {
      const positionsFromApi = await getPositions('positions');

      setPositions(positionsFromApi);
    } catch (error) {
      throw new Error();
    }
  }, []);

  const addProperty = useCallback((property: InputFields, value: string) => {
    switch (property) {
      case InputFields.NAME:
        setUser(current => {
          return {
            ...current,
            name: value,
          };
        });
        break;

      case InputFields.EMAIL:
        setUser(current => {
          return {
            ...current,
            email: value,
          };
        });
        break;

      case InputFields.PHONE:
        setUser(current => {
          return {
            ...current,
            phone: value,
          };
        });
        break;

      case InputFields.POSITION:
        setUser(current => {
          return {
            ...current,
            position_id: +value,
          };
        });
        break;

      default:
        break;
    }
  }, []);

  const addFile = useCallback((file: File | null) => {
    setUser(current => {
      return {
        ...current,
        photo: file,
      };
    });
  }, []);

  const changeValue = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedPosition = positions
      .find(position => position.name === event.target.value);

    if (selectedPosition) {
      setUserPosition(selectedPosition.id);
      addProperty(InputFields.POSITION, `${selectedPosition.id}`);
    }
  }, [positions]);

  const checkUserData = useCallback(() => {
    const haveSomeEmptyFields = Object
      .values(user).some(value => value === null || value.length === 0);

    setIsOff(haveSomeEmptyFields);
  }, [user]);

  useEffect(() => {
    loadPositions();
  }, []);

  useEffect(() => {
    checkUserData();
  }, [user]);

  return (
    <form
      method="post"
      className="form"
      onSubmit={event => handleSubmit(user, event)}
    >

      <Input
        property={InputFields.NAME}
        label="Your Name"
        message="Username should contain 2-60 characters"
        addProperty={addProperty}
        isLast={false}
      />

      <Input
        property={InputFields.EMAIL}
        label="Email"
        message="example@gmail.com"
        addProperty={addProperty}
        isLast={false}
      />

      <Input
        property={InputFields.PHONE}
        label="Phone"
        message="+38 (XXX) XXX - XX - XX"
        addProperty={addProperty}
        isLast
      />

      <div
        className="form__radio"
      >
        <p className="form__radio-title">
          Select your position
        </p>

        {positions.map(({ id, name }) => {
          const isSelected = userPosition === id;

          return (
            <Fragment key={id}>
              <input
                className="form__radio-input"
                type="radio"
                id={name}
                name="position"
                value={name}
                checked={isSelected}
                onChange={changeValue}
              />

              <label
                htmlFor={name}
                className={cn(
                  'form__radio-label',
                  {
                    'form__radio-label--checked': isSelected,
                    'form__radio-label--unchecked': !isSelected,
                  },
                )}
              >
                {name}
              </label>
            </Fragment>
          );
        })}
      </div>

      <InputFile
        label="Upload your photo"
        addFile={addFile}
      />

      <Button
        className="button"
        type="submit"
        disabled={isOff}
      >
        Sign Up
      </Button>
      <br />
      <p className="form__error">{errorMessage}</p>
    </form>
  );
});
