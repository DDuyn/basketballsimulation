import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Competition from '@/components/Competitions/Competitions'
import CompetitionGroups from '@/components/Competitions/CompetitionGroups'
import Index from '@/components/Index'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/competitions/:region',
      name: 'Competitions',
      component: Competition,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/competition/:codeCompetition/Groups',
      name: 'CompetitionGroups',
      component: CompetitionGroups,
      meta: {
        isPublic: false
      }
    },
    {
      path: '*',
      redirect: '/NotFound',
      meta: {
        isPublic: false
      }
    },
    {
      path: '/NotFound',
      name: 'NotFound',
      component: NotFound,
      meta: {
        isPublic: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic) {
    if (!this.a.app.$session.exists()) {
      next({ name: 'Index' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
