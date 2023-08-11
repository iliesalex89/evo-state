import { isNullOrUndefined } from 'editor-utils-app/src/Common';
import produce from 'immer';
import { Subject } from 'rxjs';

export class ObservableState {
  _shouldNotify = true;

  constructor() {
    this.isObservable = true;
    this.subscribers = [];

    if (typeof this.getInitialContext === 'function') {
      this._context = this.getInitialContext();
    }

    this._contextObservable = new Subject();
  }

  get internalObservable() {
    return this._contextObservable;
  }

  getInitialContext() {
    return {};
  }

  update(callback = _draft => { }) {
    if (this._shouldNotify) {
      this._prevContext = this._context || {};
    }

    this._context = produce(this._context, (draftContext) => {
      callback(draftContext);
    });

    this.notify();
  }

  set context(replaceValue) {
    this._prevContext = this.context;
    this._context = replaceValue;

    this.notify();
  }

  get context() {
    return this._context;
  }

  pauseSubscribersNotify = () => {
    this._shouldNotify = false;
    this._prevContext = this.context;
  };

  resumeSubscribersNotify = () => {
    if (this._shouldNotify) return;

    this._shouldNotify = true;
    this.notify();
  };

  resetToInitialContext = () => {
    this._context = this.getInitialContext();
  };

  subscribe(handler, comparer) {
    const subscription = this._contextObservable.subscribe(({ nextContext, prevContext }) => {
      if (!isNullOrUndefined(comparer) && comparer(prevContext, nextContext) === false) {
        return;
      }

      handler(nextContext, prevContext, this);
    });

    this.subscribers.push({ subscription, handler });
  }

  unsubscribe(handler) {
    const newSubscribers = [];

    for (const subscriber of this.subscribers) {
      if (subscriber.handler !== handler) {
        newSubscribers.push(subscriber);
        continue;
      }

      subscriber.subscription.unsubscribe();
    }

    this.subscribers = newSubscribers;
  }

  get notificationObject() {
    return {
      nextContext: this.context,
      prevContext: this._prevContext || this.getInitialContext()
    };
  };

  notify() {
    if (!this._shouldNotify) return;

    this._contextObservable.next(this.notificationObject);
  }
}
