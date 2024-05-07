import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const state = {
    despesas: ref([]),
    cartoes: ref([])
  };

  const actions = {
    adicionarDespesa(novaDespesa) {
      state.despesas.value.push(novaDespesa);
    },
    excluiDespesa(nome) {
      const index = state.despesas.value.findIndex(despesa => despesa.nome === nome);
      if (index !== -1) {
        state.despesas.value.splice(index, 1);
      }
    },  
    cadastrarCartao(novoCartao) {
      state.cartoes.value.push(novoCartao)
    }
  };

  const getters = {
    totalDespesas: computed(() => {
      return state.despesas.value.reduce((total, despesa) => total + despesa.valor, 0);
    }),
    quantidadeDespesas: computed(() => {
      return state.despesas.value.length;
    })
  };

  return { ...state, ...actions, ...getters };
});