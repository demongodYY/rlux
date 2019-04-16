const Rx = require('rxjs/Rx');
const {
  of ,
  merge
} = require('rxjs');

function createStore(defaultValue = null) {
  const action$ = new Rx.Subject();
  const state$ = new Rx.BehaviorSubject(defaultValue);
  const asyncAction$ = new Rx.Subject();
  const observable = action$.scan((state, {
    changeFn
  }) => changeFn(state), defaultValue);
  const asyncObservable = asyncAction$.mergeScan((acc, {
      changeFn,
      promise
    }) => {
      console.log(666, acc);
      return of(promise)
        .switchMap((promise) => promise)
        .map((res) => changeFn(acc, res))
    },
    defaultValue
  )
  const subscribe$ = merge(observable, asyncObservable).subscribe(state$);
  return {
    action$,
    asyncAction$,
    state$,
    subscribe$
  };
}

function getValue(store) {
  return store.state$.getValue();
}

function emitAsyncAction(promise, changeFn = () => {}, store) {
  store.asyncAction$.next({
    promise,
    changeFn
  });
  return store;
}

function emitAction(changeFn, store) {
  store.action$.next({
    changeFn
  });
  return store;
}

function subscribeValue(getValueFn, store) {
  return store.state$.subscribe(getValueFn);
}

module.exports = {
  createStore,
  getValue,
  subscribeValue,
  emitAction,
  emitAsyncAction
}