const Rx = require('rxjs/Rx');
const {
  from,
  merge
} = require('rxjs');

function createStore(defaultValue = null) {

  const action$ = new Rx.Subject();
  const state$ = new Rx.BehaviorSubject(defaultValue);
  const asyncAction$ = new Rx.Subject();

  const observable = action$.scan((state, {
    changeFn
  }) => changeFn(state), defaultValue);

  const asyncObservable = asyncAction$.switchMap(({
      changeFn,
      promise
    }) => from(promise)
    .map((res) => changeFn(state$.getValue(), res))
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

function emitAsyncAction(store, promise, changeFn = (state, res) => res) {
  store.asyncAction$.next({
    promise,
    changeFn
  });
  return store;
}

function emitAction(store, changeFn) {
  store.action$.next({
    changeFn
  });
  return store;
}

function subscribeValue(store, getValueFn) {
  return store.state$.subscribe(getValueFn);
}

module.exports = {
  createStore,
  getValue,
  subscribeValue,
  emitAction,
  emitAsyncAction
}