# rx-flux
利用 Rx.js 实现的 flux 架构，用于将数据状态保存在 store 中，通过 action 改变 store 中保存的值，并在任意地方获取值。
## 依赖
- "rx": "^4.1.0",
- "rxjs": "^6.4.0"
## 测试
```
npm run test //运行测试用例
npm run test-w //观察模式运行测试用例
```
## 核心函数
```javascript
/**
 * 用于创建一个 store
 *  @params defaultValue - store 的默认值
 *  @return store
**/
createStore(defaultValue) 
/**
 * 用于向一个 store 发出一个 action
 *  @params changeFn(state) - 改变 store 的值的回调函数，参数 state 用于获取当前 store 中的值。
 *  @params store - 向哪个 store 发出 action
 *  @return store
**/
emitAction(changeFn, store)
/**
 * 用于获取一个 store 中当前的值
 *  @params store - 获取哪个 store 的值
 *  @return value - store 中当前的值
**/
getValue(store)
/**
 * 用于获取一个 store 中当前的值
 *  @params getValueFn - 获取订阅值的回调函数
 *  @params store - 订阅哪个 store 的值
 *  @return subscirbe - 返回 state 的订阅
**/
subscribeValue(getValueFn, store)
```
