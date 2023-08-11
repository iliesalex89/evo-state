
import {ObservableState} from '../state/ObservableState';

class PersonState extends ObservableState {
  getInitialContext() {
    return {
      firstName: '',
      secondName: '',
      details: {
        age: -1,
        identifier: ''
      }
    };
  }

  updateName = (firstName, secondName) => {
    this.update(draft => {
      draft.firstName = firstName;
      draft.secondName = secondName;
    });
  };

  get fullName() {
    const { firstName, secondName } = this.context;

    return `${firstName} ${secondName}`;
  }
}

export default new PersonState();