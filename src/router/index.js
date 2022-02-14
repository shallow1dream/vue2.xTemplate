import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',//登录页
    name: 'login',
    component: () => import( '@/views/login/login.vue')
  },
  {
    path:'/register',//注册页
    name:'register',
    component:() => import('@/views/register/register.vue')
  },
  {
    path:"/index",//主页
    name:"index",
    component:()=> import('@/views/index/index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next) => {
  if(to.fullPath=='/login'){
    next()
  }else if(to.fullPath=='/register'){
    next()
  }
  else{
    if(store.state.user.account!=''){
      next()
    }else{
      next("/login")
    }
  }
  // if(store.state.user.account!=''){
  //   next()
  // }else{
  //   next("/login")
  // }
})

export default router
