import CadastroView from '@/views/CadastroView.vue'
import VisualizarView from '@/views/VisualizarView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Cadastro',
      component: CadastroView
    },
    {
      path: '/visualizar',
      name: 'Visualizar',
      component: VisualizarView
    }
  ]
})

export default router
