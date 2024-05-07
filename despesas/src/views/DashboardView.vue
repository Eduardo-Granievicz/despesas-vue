<template>
  <div>
    <div class="todo">
      <div class="modal-header">
        <h3 v-if="!counterStore.despesas.length" class="title">
          Favor cadastrar uma despesa!
        </h3>
      </div>
      <div class="pie" v-if="counterStore.despesas.length">
        <span class="title_pie">Quantidade de despesas por categoria:</span>
        <GraficoPie :labels="labels" :series="series" />
      </div>

      <div class="pie" v-if="counterStore.despesas.length">
        <span class="title_pie"
          >Quantidade de cartões cadastrados por banco:</span
        >
        <GraficoPie :labels="labelsCartao" :series="porBanco" />
      </div>

      <div class="pie" v-if="counterStore.despesas.length">
        <span class="title_pie">Valores gastos por categoria:</span>
        <GraficoPie :labels="labels" :series="porCategoria" />
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

.title_pie {
  display: flex;
  justify-content: center;
  font-size: large;
  margin-right: 80px;
  margin-bottom: 20px;
}

.pie {
  width: 500px;
}
</style>