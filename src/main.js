import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import router from './router'
import './axios'
import axios from 'axios';
Vue.use(VueRouter)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(require('vue-cookies'))
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresRank)) {

    // this route requires auth, check if logged in
    // if not, redirect to login page.
    var x = parseInt(window.$cookies.get("right"));
    if(isNaN(x)) x = 0;
    console.log(x);
    if ( x < to.meta.requiresRank ) {
      next({
        name: 'Home',
      })
    } else {
      next()
    }

  }else if(to.matched.some(record => record.meta.requiresVisitor)){

    if (window.$cookies.get("Token")) {
      next({
        name: 'Home',
      })
    } else {
      next()
    }

  }else{

    next()
  }
  
})

Vue.mixin({
  data: function() {
    return {
      login: null,
      right: 0
    }
  }
  

})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
