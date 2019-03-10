import action from '../actions';

function test() {
  action.createAction('stream');
}

export default {
  reducer = action['stream'].map(({actionName}) => {
    return `hello ${actionName}`; 
  })
}