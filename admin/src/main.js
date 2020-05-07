import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';

Vue.config.productionTip = false;

import http from './http'

Vue.prototype.$http = http

Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return {

        Authorization: `Bearer ${localStorage.token || ''}`

      }
    }
  },
})


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
