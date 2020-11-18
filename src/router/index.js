import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/diary',
    component:()=>import('views/diary.vue')
  },
  {
    path:'/music',
    component:()=>import('views/music.vue')
  },
  {
    path:'/photos',
    component:()=>import('views/photos.vue')
  },
  {
    path:'/plan',
    component:()=>import('views/plan.vue')
  },
  {
    path:'/relation',
    component:()=>import('views/relation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
