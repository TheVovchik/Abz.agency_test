import {
  FC, useState, memo, useCallback,
} from 'react';
import cn from 'classnames';
import './Input.scss';
import { InputFields } from '../../../../types/Input.enum';
import { EmailPattern } from '../../../../utils/EmailPattern';
import { NumberPattern } from '../../../../utils/NumberPattern';

type Props = {
  property: InputFields,
  label: string,
  message: string,
  isLast: boolean,
  addProperty: (property: InputFields, value: string) => void,
};

export const Input: FC<Props> = memo(({
  property,
  label,
  message,
  isLast,
  addProperty,
}) => {
  const [value, setValue] = useState('');
  const [isValueError, setIsValueError] = useState(false);
  const [isValueLabel, setIsValueLabel] = useState(false);

  const checkName = useCallback(() => {
    let isValid;

    switch (property) {
      case InputFields.NAME:
        isValid = value.length > 1 && value.length <= 60;
        break;

      case InputFields.EMAIL:
        isValid = EmailPattern.test(value);
        break;

      case InputFields.PHONE:
        isValid = NumberPattern.test(value);
        break;

      default:
        return;
    }

    if (isValid) {
      addProperty(property, value);
    } else {
      addProperty(property, '');
    }

    setIsValueError(!isValid);
    setIsValueLabel(true);
  }, [value]);

  const handleInput = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;

    setValue(newValue);
    setIsValueError(false);
    setIsValueLabel(true);
  }, []);

  return (
    <div className={cn(
      'input',
      { 'input--margin-bottom': isLast },
    )}
    >
      {isValueLabel && (
        <p
          className={cn(
            'input__label',
            { 'input__label--color-red': isValueError },
          )}
        >
          {label}
        </p>
      )}
      <input
        className={cn(
          'input__field',
          { 'input__field--border-danger': isValueError },
        )}
        placeholder={label}
        value={value}
        onChange={handleInput}
        onBlur={checkName}
        type="text"
      />
      {isValueError && (
        <p className="input__error">{message}</p>
      )}
    </div>
  );
});
