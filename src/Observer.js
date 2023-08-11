import StringUtils from 'editor-utils-app/src/StringUtils';
import React, { useCallback, useEffect, useState } from 'react';
import { usePrevious } from '../common/CommonHooks';

const getStateSetterKey = (key) => `set_${key}`;

export function observer(Comp, contexts, displayName) {
  const ObserverComponent = class extends React.Component {
    constructor(props) {
      super(props);

      const contextInstances = {};

      for (let key in contexts) {
        contextInstances[key] = contexts[key].instance.getContext();

        this[getStateSetterKey(key)] = this.onContextChange(key);

        contexts[key].instance.subscribe(this[getStateSetterKey(key)]);
      }

      this.state = contextInstances;
    }

    onContextChange = (key) => (newContext, prevContext) => {
      if (!this._isMounted) return;

      if (contexts[key].comparer && !contexts[key].comparer(newContext, prevContext, this.props)) return;

      this.setState((state) => ({ ...state, [key]: newContext }));
    };

    componentDidMount() {
      this._isMounted = true;
    }

    render() {
      return <Comp {...this.props} {...this.state} />;
    }

    componentWillUnmount() {
      this._isMounted = false;

      for (let key in contexts) {
        contexts[key].instance.unsubscribe(this[getStateSetterKey(key)]);
      }
    }
  };

  if (!StringUtils.isNullOrEmpty(displayName)) {
    ObserverComponent.displayName = `${displayName}_Observer`;
  }

  return ObserverComponent;
}

export const useObserver = (instance, comparer) => {
  const [values, setValues] = useState(instance.context);
  const previousValues = usePrevious(values);

  const contextCallback = useCallback(() => {
    setValues(instance.context);
  }, [instance]);

  useEffect(() => {
    setValues(instance.context);
    instance.subscribe(contextCallback, comparer);

    return () => {
      instance.unsubscribe(contextCallback);
    };
  }, [instance, contextCallback, comparer]);

  return [values, previousValues];
};
