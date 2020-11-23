import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/views/Login')
const Home = () => import('@/views/Home')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children: [

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
