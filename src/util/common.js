import { LocalStorage, Notify } from "quasar";
import router from "src/router";

export const notifyWarn = (message) => {
  Notify.create({
    message,
    icon: "info",
    badgeColor: 'primary',
    badgePosition: 'top-right',
    color: "red-5",
    position: "top",
  });
};

export const notifySuccess = (message) => {
  Notify.create({
    message,
    type: "positive",
    position: "top",
  });
};

export const fn3001 = () => {
  notifyWarn("登录会话已过期！");
  LocalStorage.remove("loginInfo");
  router.push("/login");
};

export const termTypeText = {
  1: "座椅",
  2: "回收",
  3: "储物柜",
  4: "大屏",
};

export const termStatusText = {
  0: "离线",
  1: "在线",
};
