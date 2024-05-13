<template>
    <h3 class="title_cards" v-if="counterStore.cartoes.length">Meus cartões</h3>
  <div  >
    <div class="cards">
      <div class="credit-card" v-for="cartoes in counterStore.cartoes" :key="cartoes.id" :class="{'credit-card': true, 'tipo-itau': cartoes.nome === 'Itau', 'credit-card': true, 'tipo-nubank': cartoes.nome === 'Nubank', 'credit-card': true, 'tipo-bradesco': cartoes.nome === 'Bradesco', 'credit-card': true, 'tipo-santander': cartoes.nome === 'Santander', 'credit-card': true, 'tipo-inter': cartoes.nome === 'Inter'}">
        <div class="card-number">{{ cartoes.numeroCartao }}</div> 
        <div class="card-details">
          <div class="card-holder">
            Nome do Titular: <br />
            {{ cartoes.nomeTitular }}
          </div>
          <div class="card-expiry">
            MM/AA <br />
            {{ cartoes.validade }}
          </div>
        </div>
        <div class="type-card">
          {{ cartoes.cartao }}
          {{ cartoes.nome }}
        </div>
      </div>
    </div>
    </div>
  <div
    v-if="counterStore.despesas.length || counterStore.cartoes.length"
    class="title_screen"
  >
    Dashboard
  </div>
  <div class="content-overlay">
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
  font-size: x-large;
  margin-top: 20px;
  margin-bottom: 20px;
}

.content-overlay {
  display: flex;
  align-items: center;
  justify-content:space-around;
  margin-bottom: 100px;
}

.credit-card {
  width: 320px;
  height: 200px;
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  margin-left: 30px;
  color: white;
  font-weight: bolder;
}

.card-number {
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
  display: flex;  
}

.card-details {
  display: flex;
  justify-content: space-between;
  
}

.card-holder,
.card-expiry {
  font-size: 14px;
  color: white;
}

.type-card {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.title_cards {
  margin-top: 10px;
  font-size:x-large;
  display: flex;
  justify-content: center;
}

.tipo-itau {
  background-color: rgb(255, 102, 0, 0.7);
}

.tipo-nubank {
  background-color: rgb(138, 5, 190, 0.7);
}

.tipo-bradesco {
  background-color: rgba(165, 0, 0, 0.7);
}

.tipo-santander {
  background-color: rgb(255, 0, 0, 0.7);
}

.tipo-inter {
  background-color: rgba(214, 90, 7);
}
</style>