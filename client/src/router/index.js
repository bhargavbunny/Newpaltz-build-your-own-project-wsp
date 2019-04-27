import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Exercises from '@/components/Exercises'
import News from '@/components/News'
import NewExercise from '@/components/NewExercise'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: Exercises
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/exercises/new',
      name: 'new-exercise',
      component: NewExercise
    }
  ]
})
