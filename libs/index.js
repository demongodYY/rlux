const Rx = require('rxjs/Rx');

function createStore() {
  const action$ = new Rx.Subject();
  const state$ = new Rx.BehaviorSubject();
  const observable = action$.map(changeFn => state => changeFn(state)).scan((state, changeFn) => changeFn(state));
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

function emitAction(store, changeFn) {
  store.action$.next(changeFn);
  return store;
}
