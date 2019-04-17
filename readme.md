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
 *  @params store - 向哪个 store 发出 action
 *  @params changeFn(state) - 改变 store 的值的回调函数，参数 state 用于获取当前 store 中的值。
 *  @return store
**/
emitAction(store, changeFn)

/**
 * 用于向一个 store 发出一个异步的 action
 *  @params store - 向哪个 store 发出 action
 *  @params promise - 异步操作的 promise
 *  @params changeFn(state, res) - （可选，默认直接返回 promise 的 resolve 结果）changeFn(state, res) - 改变 store 的值的回调函数，参数 state 用于获取当前 store 中的值， res 为异步操作的 resolve 结果。
 *  @return store
**/
emitAsyncAction(store, promise, [changeFn])

/**
 * 用于获取一个 store 中当前的值
 *  @params store - 获取哪个 store 的值
 *  @return value - store 中当前的值
**/
getValue(store)

/**
 * 用于获取一个 store 中当前的值
 *  @params store - 订阅哪个 store 的值
 *  @params getValueFn(value) - 获取订阅值的回调函数, value 为其中的值
 *  @return subscirbe - 返回 state 的订阅
**/
subscribeValue(store, getValueFn)
```
