<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3 v-if="counterStore.despesas.length">Detalhes da Despesa</h3>
          <h3 v-if="!counterStore.despesas.length" class="title">
            Favor cadastrar uma despesa!
          </h3>

        </div>

        <table v-if="counterStore.despesas.length" class="modal-table">
          <thead>
            <tr>
              <th>Nome da despesa</th>
              <th>Categoria</th>
              <th>Banco</th>
              <th>Valor da despesa</th>
              <th>Data de pagamento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="despesa in counterStore.despesas" :key="despesa.id">
              <td>{{ despesa.nome }}</td>
              <td>{{ despesa.categoria }}</td>
              <td>{{ despesa.banco }}</td>
              <td>{{ formatarValorMonetario(despesa.valor) }}</td>
              <td>{{ formatarData(despesa.dataPagamento) }}</td>
              <td @click="counterStore.excluiDespesa">&times;</td>
            </tr>
          </tbody>
        </table>
        
        <div class="modal-footer" v-if="counterStore.despesas.length">
          <div>
            Quantidade de despesa: {{ counterStore.quantidadeDespesas }}
          </div>
          <div>
            Valor total da despesa:
            {{ formatarValorMonetario(counterStore.totalDespesas) }}
          </div>

          <button @click="organizarCategoria()" class="bt-category">
          Filtrar por Categoria
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from "@/stores/counter";

export default {
  setup() {
    const counterStore = useCounterStore();

    const formatarData = (data) => {
      const opcoes = { year: "numeric", month: "long", day: "numeric" };
      return new Date(data).toLocaleDateString("pt-BR", opcoes);
    };

    const formatarValorMonetario = (valor) => {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    };

    const organizarCategoria = () => {
      counterStore.despesas.sort((a, b) =>
        a.categoria.localeCompare(b.categoria)
      );
    };

    return {
      counterStore,
      formatarData,
      formatarValorMonetario,
      organizarCategoria,
    };
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  width: 80%;
  max-width: 800px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  overflow: auto;
}

.modal-header,
.modal-footer {
  padding: 15px;
  text-align: left;
  background: #f7f7f7;
  border-bottom: 1px solid #eee;
}

.modal-footer {
  border-top: 1px solid #eee;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-table {
  width: 100%;
  border-collapse: collapse;
}

.modal-table th,
.modal-table td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.title {
  display: flex;
  justify-content: center;
}

.bt-category {
  width: 30%;
  margin: 5px;
  padding: 5px;
  border-radius: 4px;
  background-color: #04aa6d;
  color: white;
  cursor: pointer;
}

.bt-category:hover {
  background-color: #037f58;
}
</style>