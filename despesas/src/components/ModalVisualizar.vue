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
              <th class="columnView" @click="organizar('Nome')">
                Nome da despesa
              </th>
              <th class="columnView" @click="organizar('Categoria')">
                Categoria
              </th>
              <th class="columnView" @click="organizar('Cartao')">Cartão</th>
              <th class="columnView" @click="organizar('Valor')">
                Valor da despesa
              </th>
              <th class="columnView" @click="organizar('Vencimento')">
                Data de vencimento fatura
              </th>
              <th class="columnView" @click="organizar('Data')">
                Data de pagamento
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="despesa in counterStore.despesas" :key="despesa.id">
              <td>{{ despesa.nome }}</td>
              <td>{{ despesa.categoria }}</td>
              <td>{{ despesa.banco }}</td>
              <td>{{ formatarValorMonetario(despesa.valor) }}</td>
              <td>{{ despesa.dataVencimento }}</td>
              <td>{{ formatarData(despesa.dataPagamento) }}</td>
              <td
                @click="counterStore.excluiDespesa(despesa.nome)"
                style="cursor: pointer"
              >
                &times;
              </td>
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

    const organizar = (parametro) => {
      switch (parametro) {
        case "Nome":
          counterStore.despesas.sort((a, b) => a.nome.localeCompare(b.nome));
          break;
        case "Categoria":
          counterStore.despesas.sort((a, b) =>
            a.categoria.localeCompare(b.categoria)
          );
          break;
        case "Cartao":
          counterStore.despesas.sort((a, b) => a.banco.localeCompare(b.banco));
          break;
        case "Valor":
          counterStore.despesas.sort((a, b) => a.valor - b.valor);
          break;
        case "Vencimento":
          counterStore.despesas.sort((a, b) =>
            a.dataVencimento.localeCompare(b.dataVencimento)
          );
          break;
        case "Data":
          counterStore.despesas.sort((a, b) =>
            a.dataPagamento.localeCompare(b.dataPagamento)
          );
      }
    };

    return {
      counterStore,
      formatarData,
      formatarValorMonetario,
      organizar,
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
  max-width: 1000px;
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

.columnView {
  cursor: pointer;
}

.columnView:hover {
  background-color: #eee;
}
</style>