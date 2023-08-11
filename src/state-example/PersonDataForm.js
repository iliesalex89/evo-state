import React, { useCallback } from 'react';
import PersonState from './PersonState';

export const PersonDataForm = () => {
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
      <div className='inputExample'>
        <label>First Name</label>
        <input name='firstName' onChange={onFirstNameChange} />
      </div>

      <div className='inputExample'>
        <label>Second Name</label>
        <input name='secondName' onChange={onSecondNameChange} />
      </div>

      <div className='inputExample'>
        <label>Age</label>
        <input name='age' type='number' onChange={onAgeChange} />
      </div>
    </div>
  );
};
