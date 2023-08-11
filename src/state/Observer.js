import { useCallback, useEffect, useRef, useState } from 'react';

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

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
