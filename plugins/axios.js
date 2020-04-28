// 定义axios错误拦截插件
import { Message } from "element-ui";
export default nuxt => {
  nuxt.$axios.onError(err => {
    const { status, data } = err.response;
    const message = data.message || "输入错误，请重新输入";
    if (status === 400) {
      Message.error(message);
    }
    if (status === 403||status===401) {
      Message.error("需登录后才能操作");
      nuxt.redirect("/user/login");
    }
  });
};
