import {defineStore} from "pinia";
import {ref, shallowRef} from 'vue';

const useMapStore = defineStore("map", () => {
  const map = shallowRef(null);
  const mapStatus = ref(0);

  const setMap = () => {
    console.log('Tencent Map load success.');
    return new Promise((resolve, reject) => {
      try {
        map.value = new TMap.Map(document.getElementById('global-map'), {
          center: new TMap.LatLng(39.984120, 116.307484),//设置地图中心点坐标
          zoom: 17.2,   //设置地图缩放级别
          pitch: 43.5,  //设置俯仰角
          rotation: 45  //设置地图旋转角度
        })
        map.value.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE);
        const rotationControl = map.value.getControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);
        const ZoomControl = map.value.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
        ZoomControl.setNumVisible(true);
        ZoomControl.setPosition(TMap.constants.CONTROL_POSITION.BOTTOM_LEFT);
        ZoomControl.setClassName('custom-tmap-zoomcontrol');
        rotationControl.setPosition(TMap.constants.CONTROL_POSITION.TOP_LEFT);
        mapStatus.value = 1;
        console.log('Tencent Map render success.');
        resolve(true);
      } catch (e) {
        reject(e);
      }
    })
  }

  const loaderJs = () => {
    return new Promise(function (resolve, reject) {
      const scriptTMap = document.getElementById('scriptTMap');
      if (scriptTMap) {
        resolve();
        return null;
      }
      const script = document.createElement('script');
      script.id = 'scriptTMap'
      script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=KA3BZ-DGGEJ-SCTFA-FLG7D-A7GDT-PEB54&libraries=geometry,service,tools';
      script.type = 'text/javascript';
      script.onerror = reject;
      script.async = true;
      script.onload = resolve;
      document.head.appendChild(script);
    })
  }

  const loaderMap = () => {
    return new Promise((resolve, reject) => {
      if (mapStatus.value === 1) {
        console.log('Tencent Map render success.(Has been rendered , not repeat render)');
        resolve(true);
        return null;
      }
      mapStatus.value = 0;
      loaderJs()
        .then(() => setMap())
        .then(() => resolve())
        .catch(err => {
          const find = document.getElementById("scriptTMap");
          find && (find.remove());
          map.value = null;
          mapStatus.value = -1;
          reject(err);
        })
    })
  }
  return {
    map, mapStatus, loaderMap,
  }
});
export default useMapStore;
