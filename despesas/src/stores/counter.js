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
    excluiDespesa() {
      state.despesas.value.pop();
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