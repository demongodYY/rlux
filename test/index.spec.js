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
    emitAction(() => 5, testStore);
    getValue(testStore).should.equal(5);
  });

  it('emitAction from before state', () => {
    const testStore = createStore(0);
    getValue(testStore).should.equal(0);
    emitAction(state => state + 1, testStore);
    getValue(testStore).should.equal(1);
    emitAction(state => state + 1, testStore);
    getValue(testStore).should.equal(2);
  });

  describe('test subscribe value', () => {
    let defaultValue = 0;
    const testStore = createStore(defaultValue);
    subscribeValue(value => {
      value.should.equal(defaultValue)
    }, testStore);
    emitAction(state => {
      return defaultValue = state + 1
    }, testStore);
  });
})

describe('test async action emit', () => {
  it('emit async action change value', () => {
    let passValue = 0;
    const testStore = createStore(passValue);
    subscribeValue(value => value.should.equal(passValue), testStore);
    const promise = new Promise((resolve) => {
      passValue += 1;
      resolve(passValue);
    })
    emitAsyncAction(promise, (state, res) => {
      console.log(222, state);
      return res
    }, testStore);
    emitAsyncAction(promise, (state, res) => {
      console.log(222, state);
      return res
    }, testStore);
  });
})