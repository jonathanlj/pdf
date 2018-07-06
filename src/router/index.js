import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: "登陆"
      }
    }
  ]
})
