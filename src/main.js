import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui';//引入element-ui
import 'element-ui/lib/theme-chalk/index.css';//引入element-ui样式

import locale from 'element-ui/lib/locale/lang/en' // lang i18n
Vue.use(ElementUi, { locale })



Vue.config.productionTip = false

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak密钥
  ak: 'DM3K9ar3ejv5NvtciaUvRXtt3iM5X2po'
})
    




import axios from 'axios';//引入axios
import VueAxios from 'vue-axios';//引入vue-axios
Vue.use(VueAxios,axios)//使用

import { get, post, postform }  from "@/utils/http.js";
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postform = postform;

import apiFun from "@/utils/api.js";
Vue.prototype.$apiFun = apiFun;//请求接口api

import VueAMap from 'vue-amap';//引入高德地图
Vue.use(VueAMap);//使用
VueAMap.initAMapApiLoader({
  key: '',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11'
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
