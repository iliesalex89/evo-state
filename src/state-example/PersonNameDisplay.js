import { useObserver } from '../state/Observer';
import React from 'react';
import PersonState from './PersonState';

const personComparer = (prev, next) => prev.firstName !== next.firstName || prev.secondName !== next.secondName;

export const PersonaNameDisplay = () => {
  const [{ firstName, secondName }] = useObserver(PersonState, personComparer);

  return <div>
    {`${firstName.toUpperCase()} ${secondName.toUpperCase()}`}
  </div>;
};
