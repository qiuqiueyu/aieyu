import { createRouter, createWebHashHistory } from 'vue-router'
import Guide from '../components/Guide.vue'
import Home from '../components/Home.vue'
import Word from '../components/Word.vue'

const routes = [
  { path: '/', component: Guide },
  { path: '/home', component: Home },
  { path: '/word', component: Word }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
