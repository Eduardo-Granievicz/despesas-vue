import CadastroView from '@/views/CadastroView.vue'
import VisualizarView from '@/views/VisualizarView.vue'
import IndexView from '@/views/IndexView.vue'
import CadastroCartaoView from '@/views/CadastroCartaoView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexView
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: CadastroView
    },
    {
      path: '/visualizar',
      name: 'Visualizar',
      component: VisualizarView
    },
    {
      path: '/cadastrar-cartao',
      name: 'Cartao',
      component: CadastroCartaoView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView
    }
  ]
})

export default router
