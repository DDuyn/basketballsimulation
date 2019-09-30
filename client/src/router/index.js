import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Competition from '@/components/Competitions/Competition'
import Group from '@/components/Competitions/Group'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/competition/:codeCompetition',
      name: 'Competition',
      component: Competition
    },
    {
      path: '/competition/:codeCompetition/Group/:group',
      name: 'Group',
      component: Group
    }
  ]
})
