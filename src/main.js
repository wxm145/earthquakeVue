import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/en' // lang i18n
Vue.use(ElementUi, { locale })



Vue.config.productionTip = false

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'DM3K9ar3ejv5NvtciaUvRXtt3iM5X2po'
})
    




import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios)

import { get, post, postform }  from "@/utils/http.js";
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postform = postform;

import apiFun from "@/utils/api.js";
Vue.prototype.$apiFun = apiFun;

import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4',
  uiVersion: '1.0.11'
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
