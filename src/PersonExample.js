import { useObserver } from 'editor-core-components-app/src/observer/Observer';
import React, { useCallback } from 'react';
import PersonState from './PersonState';

export const PersonExampleInput = () => {
  const onFirstNameChange = useCallback((ev) => {
    const firstName = ev.target.value;

    PersonState.update(draft => draft.firstName = firstName);
  }, []);

  const onSecondNameChange = useCallback((ev) => {
    const secondName = ev.target.value;

    PersonState.update(draft => draft.secondName = secondName);
  }, []);

  const onAgeChange = useCallback((ev) => {
    const age = ev.target.value;

    PersonState.update(draft => draft.details.age = age);
  }, []);

  return (
    <div>
      <label>First N</label>
      <input name='firstName' onChange={onFirstNameChange} />

      <label>Second N</label>
      <input name='secondName' onChange={onSecondNameChange} />

      <label>Age</label>
      <input name='age' type='number' onChange={onAgeChange} />
    </div>
  );
};

const personComparer = (prev, next) => prev.firstName !== next.firstName || prev.secondName !== next.secondName;

export const PersonUpperCaseDisplay = () => {
  const [{ firstName, secondName }] = useObserver(PersonState, personComparer);

  return <div>
    {firstName.toUpperCase()}
    {secondName.toUpperCase()}
  </div>;
};

const personAgeComparer = (prev, next) => prev.details.age !== next.details.age;

export const PersonAgeDisplay = () => {
  const [{ details: { age } }] = useObserver(PersonState, personAgeComparer);

  return <div>
    {age > 40 ? `${age}? You are old...` : `You are only ${age}`}
  </div>;
};