import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {


  const despesas = ref([]);

  function adicionarDespesa(novaDespesa) {
    despesas.value.push(novaDespesa);
  }

  const totalDespesas = computed(() => {
    return despesas.value.reduce((total, despesa) => total + despesa.valor, 0);
  });

  const quantidadeDespesas = computed(() => {
    return despesas.value.length;
  });

  function excluiDespesa () {
    despesas.value.pop()
  }

  return { despesas, adicionarDespesa, excluiDespesa, totalDespesas, quantidadeDespesas }
})
