<template>
  <div class="modal-overlay">
    <div class="form-container">
      <form @submit="cadastrarDespesa">
        <label for="nomeDespesa" class="form-label">Nome da despesa:</label>
        <input
          type="text"
          id="nomeDespesa"
          class="form-input"
          v-model="nomeDespesa"
          required
        />

        <label for="valorDespesa" class="form-label">Valor da despesa:</label>
        <input
          type="number"
          id="valorDespesa"
          class="form-input"
          v-model="valorDespesa"
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

        <label for="banco" class="form-label">Selecione o banco:</label>
        <select id="banco" class="form-input" v-model="banco">
          <option value="">Selecione</option>
          <option v-for="cartoes in counterStore.cartoes" :key="cartoes.id" :value="cartoes.nome">{{ cartoes.nome }}</option>
        </select>

        <label for="dataPagamento" class="form-label">Data de pagamento:</label>
        <input
          type="date"
          id="dataPagamento"
          class="form-input"
          v-model="dataPagamento"
          required
        />

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
const banco = ref("")

const cadastrarDespesa = (event) => {
  event.preventDefault();

  counterStore.adicionarDespesa({
    nome: nomeDespesa.value,
    valor: valorDespesa.value,
    dataPagamento: dataPagamento.value,
    categoria: categoria.value,
    banco: banco.value
  });

  console.log(banco.value)

  nomeDespesa.value = "";
  valorDespesa.value = "";
  dataPagamento.value = "";
  categoria.value = "";
  banco.value = ""


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
  margin: 7px;
  display: flex;
  justify-content: center;
  font-weight: bold;
}
</style>