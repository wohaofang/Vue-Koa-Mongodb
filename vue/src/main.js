import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import './utils/common';
import * as Sentry from '@sentry/browser'  
import * as Integrations from '@sentry/integrations'  
// Vue.use(ElementUI);
Vue.config.productionTip = false
import VueCropper from 'vue-cropper'

Vue.use(VueCropper)
window.Vue = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Sentry.init({
  dsn: 'http://492593cde3dc46cc852c244d5ea96ff7@10.6.6.95:9000/10',
  integrations: [
    new Integrations.Vue({Vue, attachProps: true}),
    new Integrations.RewriteFrames()
  ],
  release: 'ha11'
});

setTimeout(()=>{
  Sentry.captureException(new Error("八点十分"));  
},1000)