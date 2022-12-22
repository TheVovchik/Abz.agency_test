import { FC, memo } from 'react';
import './Button.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button: FC<Props> = memo(({ children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
    >
      {children}
    </button>
  );
});
