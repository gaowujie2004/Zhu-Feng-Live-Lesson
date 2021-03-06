// 补全其他 API

/**================================== 实现 **/
function EventEmit() {
  this._events = {};
}

EventEmit.prototype.on = function (key, callback) {
  if (!this._events) {
    this._events = {};
  }

  if (!this._events[key]) {
    this._events[key] = [];
  }

  this._events[key].push(callback);
};

EventEmit.prototype.emit = function (key, ...args) {
  if (!this._events) {
    this._events = {};
  }

  if (!this._events[key]) {
    return;
  }

  this._events[key].forEach((cb) => cb(...args));
};

EventEmit.prototype.off = function (key, cb) {
  if (!this._events || !this._events[key]) {
    return;
  }
  const callbacks = this._events[key];
  for (let i = callbacks.length - 1; i >= 0; i--) {
    if (callbacks[i] === cb) {
      callbacks.splice(i, 1);
    }
  }
};

EventEmit.prototype.offAll = function (key) {
  if (!this._events || !this._events[key]) {
    return;
  }

  this._events[key] = [];
};

// todo: 注意了
// 就触发一次，
EventEmit.prototype.once = function (key, callback) {
  if (!this._events) {
    // 动态创建
    this._events = {};
  }

  if (!this._events[key]) {
    this._events[key] = [];
  }

  // 当 callback 被调用会，就删除掉

  // 高阶函数 one 充当 callback，包裹一下，有别的逻辑要处理
  const one = (...args) => {
    callback(...args);
    this.off(key, one);
  };
  this._events[key].push(one);
};

/**================================== 测试 EventEmit **/
let e1 = new EventEmit();

e1.on("open", (data) => {
  console.log("open1", data);
});
e1.on("open", (data) => {
  console.log("open2", data);
});

function cty() {
  console.log("哭");
}
e1.on("open", cty);
e1.on("open", (data) => {
  console.log("open3", data);
});
e1.on("open", cty);

e1.off("open", cty);
e1.on("other", () => {
  console.log("我比较特殊");
});

// e1.offAll("open");

e1.emit("open", "hhhh 参数");
