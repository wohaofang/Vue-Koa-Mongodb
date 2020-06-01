import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './utils/common';
Vue.use(ElementUI);
Vue.config.productionTip = false
import VueCropper from 'vue-cropper'

Vue.use(VueCropper)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
