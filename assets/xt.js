(function(w) {
  function Xt() {}
  Xt.fn = Xt.prototype = {
    constructor: Xt,
    // 获取本地存储
    getItem(key) {
      let val = localStorage.getItem(key);
      if (val) {
        if (
          (val.startsWith("[") && val.endsWith("]")) ||
          (val.startsWith("{") && val.endsWith("}"))
        ) {
          val = JSON.parse(val);
        }
      } else {
        val = "";
      }
      return val;
    },
    // 设置本地存储
    setItem(key, val) {
      if (typeof val === "string") {
        localStorage.setItem(key, val);
      } else {
        localStorage.setItem(key, JSON.stringify(val));
      }
      return true;
    }
  };
  w.$xt = new Xt();
  w.$xt.fn = Xt.fn;
})(window);
