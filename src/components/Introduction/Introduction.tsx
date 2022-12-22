/* eslint-disable react/no-unescaped-entities */
import { FC, useCallback, memo } from 'react';
import { Button } from '../Button';
import './Introduction.scss';

type Props = {
  changeFormState: (state: boolean) => void,
  goTo: (id: string) => void,
};

export const Introduction: FC<Props> = memo(({
  changeFormState, goTo,
}) => {
  const showSignUp = useCallback(() => {
    goTo('formElement');
    changeFormState(true);
  }, []);

  return (
    <section className="root__introduction introduction">
      <h2 className="introduction__title">
        Test assignment for front-end developer
      </h2>
      <p className="introduction__description">
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>

      <Button
        className="introduction__button button"
        onClick={showSignUp}
      >
        Sign Up
      </Button>
    </section>
  );
});
