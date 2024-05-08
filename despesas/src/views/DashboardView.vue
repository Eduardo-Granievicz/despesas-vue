<template>
  <div>
    <div
      v-if="counterStore.despesas.length || counterStore.cartoes.length"
      class="title_screen"
    >
      Dashboard
    </div>
    <div class="todo">
      <div
        v-if="!counterStore.despesas.length && !counterStore.cartoes.length"
        class="modal-header"
      >
        <h3 class="title">Favor cadastrar uma despesa e/ou cartão!</h3>
      </div>
      <div class="pie" v-if="counterStore.despesas.length">
        <GraficoPie
          :titleChart="'Quantidade de despesas por categoria:'"
          :labels="labels"
          :series="series"
        />
      </div>

      <div class="pie" v-if="counterStore.cartoes.length">
        <GraficoPie
          :titleChart="'Quantidade de cartões cadastrados por banco:'"
          :labels="labelsCartao"
          :series="porBanco"
        />
      </div>

      <div class="pie" v-if="counterStore.despesas.length">
        <GraficoPie
          :titleChart="'Valores gastos por categoria:'"
          :labels="labels"
          :series="porCategoria"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
import GraficoPie from "@/components/GraficoPie.vue";
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";

export default {
  name: "DashboardView",
  components: {
    GraficoPie,
  },
  setup() {
    const counterStore = useCounterStore();

    const labels = ref(["Financeiro", "Saude", "Lazer", "Dividas", "Fatura"]);
    const labelsCartao = ref([
      "Itau",
      "Nubank",
      "Bradesco",
      "Santander",
      "Inter",
    ]);
    const series = ref([
      counterStore.quantidadeDespesasPorCategoria("Financeiro"),
      counterStore.quantidadeDespesasPorCategoria("Saude"),
      counterStore.quantidadeDespesasPorCategoria("Lazer"),
      counterStore.quantidadeDespesasPorCategoria("Dividas"),
      counterStore.quantidadeDespesasPorCategoria("Fatura"),
    ]);

    const porCategoria = ref([
      counterStore.totalDespesasPorCategoria("Financeiro"),
      counterStore.totalDespesasPorCategoria("Saude"),
      counterStore.totalDespesasPorCategoria("Lazer"),
      counterStore.totalDespesasPorCategoria("Dividas"),
      counterStore.totalDespesasPorCategoria("Fatura"),
    ]);

    const porBanco = ref([
      counterStore.quantidadeCartoesPorBanco("Itau"),
      counterStore.quantidadeCartoesPorBanco("Nubank"),
      counterStore.quantidadeCartoesPorBanco("Bradesco"),
      counterStore.quantidadeCartoesPorBanco("Santander"),
      counterStore.quantidadeCartoesPorBanco("Inter"),
    ]);

    return {
      labels,
      series,
      porCategoria,
      porBanco,
      labelsCartao,
      counterStore,
    };
  },
};
</script>

  <style>
.todo {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.pie {
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.title_screen {
  display: flex;
  justify-content: center;
  font-size: xx-large;
  margin-top: 20px;
}
</style>