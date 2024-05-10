<template>
  <div class="modal-overlay">
    <div class="form-container">
      <form @submit="cadastrarDespesa">
        <label for="nomeDespesa" class="form-label">Nome da despesa:</label>
        <input
          @click="resetCadastrado"
          type="text"
          id="nomeDespesa"
          class="form-input"
          v-model="nomeDespesa"
          required
          placeholder="Nome da despesa"
        />

        <label for="valorDespesa" class="form-label">Valor da despesa:</label>
        <input
          type="number"
          id="valorDespesa"
          class="form-input"
          v-model="valorDespesa"
          placeholder="Valor despesa"
          required
        />

        <label for="categoria" class="form-label">Categoria:</label>
        <select id="categoria" class="form-input" v-model="categoria" required>
          <option value="">Selecione</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Saude">Saude</option>
          <option value="Lazer">Lazer</option>
          <option value="Dividas">Dividas</option>
          <option value="Fatura">Fatura</option>
        </select>

        <label for="banco" class="form-label"
          >Selecione o cartão de seu respectivo banco:</label
        >
        <select
          id="banco"
          class="form-input"
          v-model="banco"
          :disabled="!counterStore.cartoes.length"
        >
          <option v-if="!counterStore.cartoes.length" value="">
            Nenhum cartão cadastrado
          </option>
          <option value="">Selecione</option>
          <option
            v-for="cartoes in counterStore.cartoes"
            :key="cartoes.id"
            :value="`${cartoes.nome} - ${cartoes.cartao}`"
          >
            {{ cartoes.nome }}
          </option>
        </select>

        <label for="dtVencimento" class="form-label"
          >Selecione a data de vencimento da fatura:</label
        >

        <select
          id="dtVencimento"
          class="form-input"
          v-model="dataVencimento"
          :disabled="!counterStore.cartoes.length"
        >
          <option v-if="!counterStore.cartoes.length" value="">
            Nenhum cartão cadastrado
          </option>
          <option value="">Selecione</option>
          <option
            v-for="cartoes in counterStore.cartoes"
            :key="cartoes.id"
            :value="formatarData(cartoes.dataVencimento)"
          >
            {{ formatarData(cartoes.dataVencimento) }}
          </option>
        </select>

        <label for="dataPagamento" class="form-label">Data de pagamento:</label>
        <input
          type="date"
          id="dataPagamento"
          class="form-input"
          v-model="dataPagamento"
          required
        />

        <span v-if="cadastrado" class="sucess">Cadastrado com sucesso! 🏆</span>

        <button type="submit" value="" class="form-submit">
          Cadastrar despesa
        </button>
        <router-link to="/visualizar">
          <button class="visualizar">Visualizar despesas</button>
        </router-link>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();

const nomeDespesa = ref("");
const valorDespesa = ref("");
const dataPagamento = ref("");
const categoria = ref("");
const banco = ref("");
const dataVencimento = ref("");
const cadastrado = ref(false)

const formatarData = (data) => {
  const opcoes = { year: "numeric", month: "long", day: "numeric" };
  return new Date(data).toLocaleDateString("pt-BR", opcoes);
};

const resetCadastrado = () => {
      cadastrado.value = false;
    };

const cadastrarDespesa = (event) => {
  event.preventDefault();

  counterStore.adicionarDespesa({
    nome: nomeDespesa.value,
    valor: valorDespesa.value,
    dataPagamento: dataPagamento.value,
    categoria: categoria.value,
    banco: (banco.value =
      banco.value !== "" ? banco.value : "Sem cartão cadastrado"),
    dataVencimento: (dataVencimento.value =
      dataVencimento.value !== ""
        ? dataVencimento.value
        : "Sem cartão cadastrado"),
  });

  cadastrado.value = true

  nomeDespesa.value = "";
  valorDespesa.value = "";
  dataPagamento.value = "";
  categoria.value = "";
  banco.value = "";
  dataVencimento.value = "";
};
</script>
<style>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-input {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-submit {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #04aa6d;
  color: white;
  cursor: pointer;
}

.visualizar {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #04aa6d;
  color: white;
  cursor: pointer;
  margin-top: 5px;
}

.visualizar:hover {
  background-color: #037f58;
}

.form-submit:hover {
  background-color: #037f58;
}

.sucess {
  margin-left: 10px;
  margin-left: 27%;
  font-weight: bold;
}
</style>