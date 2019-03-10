function createReactiveState(streams, component) {
  return streams.map((stream) => {
    return stream.subscribe((data) => {
      const {actionName, actionValue} = data;
      const state = {};
      state[actionName] = actionValue;
      component.setState(state);
    })
  })
}

function destroyReactiveState(subscribes) {
  subscribes.map((subscribe) => {subscribe.unsubscribe()});
}