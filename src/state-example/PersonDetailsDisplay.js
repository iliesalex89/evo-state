import { useObserver } from '../state/Observer';
import React from 'react';
import PersonState from './PersonState';

const personAgeComparer = (prev, next) => prev.details.age !== next.details.age;

export const PersonDetailsDisplay = () => {
  const [{ details: { age } }] = useObserver(PersonState, personAgeComparer);

  return <div>
    {age > 40 ? `${age}? You are old...` : `You are only ${age}`}
  </div>;
};