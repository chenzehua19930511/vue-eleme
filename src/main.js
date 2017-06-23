// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import goods from './components/goods';
import ratings from './components/ratings';
import seller from './components/seller';

import VueRouter from 'vue-router';

import "./common/less/index.less";

//
Vue.use(VueRouter);

var router=new VueRouter({
  linkActiveClass: "active",
  routes:[
    { path: '/goods',component: goods },
    { path: '/ratings',component: ratings },
    { path: '/seller',component: seller },
  ]

})


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

router.push('/goods');
