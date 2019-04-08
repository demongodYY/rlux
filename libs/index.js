const Rx = require('rxjs/Rx');

function createStore(defaultValue = null) {
  const action$ = new Rx.Subject();
  const state$ = new Rx.BehaviorSubject(defaultValue);
  const observable = action$.map(changeFn => state => changeFn(state)).scan((state, changeFn) => changeFn(state), defaultValue);
  const subscribe$ = observable.subscribe(state$);
  return {
    action$,
    state$,
    subscribe$
  };  
}

function getValue(store) {
  return store.state$.getValue();
}

function emitAction(changeFn, store) {
  store.action$.next(changeFn);
  return store;
}

module.exports= {
  createStore,
  getValue,
  emitAction
}