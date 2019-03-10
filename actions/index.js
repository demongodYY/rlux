import Rx from 'rxjs/Rx';

const actions = {
  createAction(actionName) {
    actions[actionName] = Rx.Observable.just({actionName});
  },
  getAction(actionName) {
    return actions[actionName];
  }
}

export default actions;
