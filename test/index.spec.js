const chai = require('chai');
const should = chai.should();

const {
  createStore,
  getValue,
  emitAction
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
    getValue(testStore).should.equal(0);
    emitAction(state => state + 1, testStore);
    getValue(testStore).should.equal(1);
    emitAction(state => state + 1,testStore);
    getValue(testStore).should.equal(2);
  });
})