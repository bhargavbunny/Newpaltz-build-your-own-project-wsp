import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyFriends from "./views/MyFriends.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import MyExercises from './views/MyExercises.vue';
import MyWorkouts from './views/MyWorkouts.vue';
//import AddFood from './views/AddFood.vue';
import AddFoodLog from './views/AddFoodLog.vue';
import AddWorkout from './views/AddWorkout.vue';
import { Globals } from '@/models/api';

Vue.use(Router)

function gaurd(to, from, next){

}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/MyFriends',
      name: 'my-friends',
      component: MyFriends
    },
    {
      path: '/Register',
      name: 'register',
      component: Register
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    //{
    //  path: '/AddFood',
    //  name: 'AddFood',
    //  component: AddFood
    //},
    {
      path: '/AddFoodLog',
      name: 'AddFoodLog',
      component: AddFoodLog
    },{
      path: '/AddWorkout',
      name: 'AddWorkout',
      component: AddWorkout
    },{
      path: '/MyExercises',
      name: 'MyExercises',
      component: MyExercises
    },{
      path: '/MyWorkouts',
      name: 'MyWorkouts',
      component: MyWorkouts
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

/*router.beforeEach((to, from, next)=>{
    console.log({ to, from });
    const publicRoutes = ['home', 'login', 'register'];
    if(!publicRoutes.includes( to.name ) && !Globals.user){
        Globals.redirectRoute = { name: to.name, path: to.path, params: to.params, query: to.query, hash: to.hash  }
        return next('login');
    }
    next();
})*/

export default router;