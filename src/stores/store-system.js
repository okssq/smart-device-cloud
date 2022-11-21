import {defineStore} from "pinia";
import {reactive, ref, shallowRef, toRaw} from 'vue';
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";

const useSystemStore = defineStore("system", () => {
  const $q = useQuasar();
  const router = useRouter();
  const loading = ref(true);
  const loginInfo = shallowRef(null);
  const setting = reactive({
    bell: true,
    notify: false,
    voice: false,
  });

  const changeSettingByKey = ({key,value}) => {
    setting[key] = value;
    $q.localStorage.set("setting", toRaw(setting));
  }
  const renderLogin = (val) => {
    $q.localStorage.set("loginInfo", val);
    loginInfo.value = val;
    router.push({path:  '/'}).finally(() => void 0);
  }
  const onLogout = () => {
    loginInfo.value = null;
    $q.localStorage.remove ('loginInfo');
    router.push({path: '/login'}).finally(() => void 0);
  }

  const init = () => {
    const localSetting = $q.localStorage.getItem("setting");
    const localLoginInfo = $q.localStorage.getItem("loginInfo");

    if (localSetting) {
      Object.assign(setting, localSetting);
    }else {
      $q.localStorage.set("setting", toRaw(setting));
    }

    if(localLoginInfo){
      renderLogin(localLoginInfo);
    }else{
      onLogout();
    }
    loading.value = false;
  }
  return {
    loading,
    loginInfo,
    setting,
    onLogout,
    renderLogin,
    init,
    changeSettingByKey,
  }
});

export default useSystemStore;
