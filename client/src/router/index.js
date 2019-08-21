import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Competition from '@/components/Competitions/Competition'
import Login from '@/components/Users/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/competition/:codeCompetition',
      name: 'Competition',
      component: Competition
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
