// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import "./common/less/index.less";

//
Vue.use(VueRouter);
Vue.use(VueResource);

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

