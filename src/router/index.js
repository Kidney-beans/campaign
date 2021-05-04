import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store/index.js'

Vue.use(VueRouter)

let receiveSSK=(to)=>{
  let query = to.query
  if(query.ssk){
    store.state.ssk = query.ssk
    console.log("登录绑定:ssk=" + store.state.ssk)
  }
  if(query.account){
    store.state.account = query.account
    console.log("账户绑定:account=" + store.state.account)
  }
  if(query.name){
    store.state.name = query.name
    console.log("用户名绑定:name=" + store.state.name)
  }
}

const routes = [
  {
    path:'/',
    redirect:'/gate'
  },
  {
    path:'/gate',
    component:()=>import('views/gate.vue')
  },
  {
    path:'/diary',
    component:()=>import('views/diary.vue'),
    beforeEnter: (to, from, next) => {
      receiveSSK(to)
      next()
    }
  },
  {
    path:'/music',
    component:()=>import('views/music.vue'),
    beforeEnter: (to, from, next) => {
      receiveSSK(to)
      next()
    }
  },
  {
    path:'/photos',
    component:()=>import('views/photos.vue'),
    beforeEnter: (to, from, next) => {
      receiveSSK(to)
      next()
    }
  },
  {
    path:'/plan',
    component:()=>import('views/plan.vue'),
    beforeEnter: (to, from, next) => {
      receiveSSK(to)
      next()
    }
  },
  {
    path:'/relation',
    component:()=>import('views/relation.vue'),
    beforeEnter: (to, from, next) => {
      receiveSSK(to)
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
