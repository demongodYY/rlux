const chai = require('chai');
const should = chai.should();

const {
  createStore,
  getValue,
  subscribeValue,
  emitAction,
  emitAsyncAction
} = require('../libs/index');

describe('hello spec', () => {
  it('works!', () => {
    true.should.equal(true)
  });
});

describe('test createStore', () => {
  it('get default store value is null', () => {
    should.not.exist(getValue(createStore()));
  });
  it('get default store value is null', () => {
    getValue(createStore(0)).should.equal(0);
    getValue(createStore(1)).should.equal(1);
  });
});

describe('test emitAction and getValue', () => {
  it('emitAction to change value', () => {
    const testStore = createStore(0);
    getValue(testStore).should.equal(0);
    emitAction(testStore, () => 5);
    getValue(testStore).should.equal(5);
  });

  it('emitAction from before state', () => {
    const testStore = createStore(0);
    getValue(testStore).should.equal(0);
    emitAction(testStore, state => state + 1);
    getValue(testStore).should.equal(1);
    emitAction(testStore, state => state + 1);
    getValue(testStore).should.equal(2);
  });

  describe('test subscribe value', () => {
    let defaultValue = 0;
    const testStore = createStore(defaultValue);
    subscribeValue(testStore, value => {
      value.should.equal(defaultValue)
    });
    emitAction(testStore, state => {
      return defaultValue = state + 1
    });

    emitAction(testStore, state => {
      return defaultValue = state + 1
    });
  });
})

describe('test async action emit', () => {
  it('emit async action with changeFn', () => {
    let defaultValue = 0;
    const testStore = createStore(defaultValue);
    subscribeValue(testStore, value => value.should.equal(defaultValue));
    const promise = new Promise((resolve) => {
      resolve(1);
    })
    emitAsyncAction(testStore, promise, (state, res) => {
      return defaultValue = state + res;
    });
    emitAsyncAction(testStore, promise, (state, res) => {
      return defaultValue = state + res
    });
  });

  it('emit async action without changeFn', () => {
    let defaultValue = 0;
    const testStore = createStore(defaultValue);
    subscribeValue(testStore, value => value.should.equal(defaultValue));
    const promise = new Promise((resolve) => {
      defaultValue = 5;
      resolve(defaultValue);
    })
    emitAsyncAction(testStore, promise);
  })
})