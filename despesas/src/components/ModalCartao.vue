<template>
    <div class="modal-overlay-cards">
      <div class="form-container-card">
        <form @submit="cadastrarCartao">
          <label for="nomeTitular" class="form-label">Nome do titular:</label>
          <input
            @click="resetCadastrado"
            type="text"
            id="nomeTitular"
            class="form-input"
            v-model="nomeTitular"
            required
            placeholder="Nome do titular"
          />

          <label for="nomeBanco" class="form-label">Banco:</label>
          <select
            id="nomeBanco"
            class="form-input"
            v-model="nomeBanco"
            required
          >
            <option value="">Selecione</option>
            <option value="Itau">Itau</option>
            <option value="Nubank">Nubank</option>
            <option value="Bradesco">Bradesco</option>
            <option value="Santander">Santander</option>
            <option value="Inter">Inter</option>
          </select>

          <label for="cartao" class="form-label">Credito ou Débito:</label>
          <select id="cartao" class="form-input" v-model="cartao" required>
            <option value="">Selecione</option>
            <option value="Credito">Crédito</option>
            <option value="Debito">Débito</option>
          </select>

          <label for="numeroCartao" class="form-label">Número do cartão:</label>
          <input
            type="text"
            id="numeroCartao"
            class="form-input"
            v-model="numeroCartao"
            required
            @input="formatarNumeroCartao"
            placeholder="0000 0000 0000 0000"
          />

          <label for="validade" class="form-label"
            >Data de vencimento (MM/AA):</label
          >
          <input
            type="text"
            id="validade"
            class="form-input"
            v-model="validade"
            @input="validarData"
            required
            maxlength="5"
            placeholder="MM/AA"
          />

          <label for="dataVencimento" class="form-label"
            >Data de vencimento fatura:</label
          >
          <input
            type="date"
            id="dataVencimento"
            class="form-input"
            v-model="dataVencimento"
            required
          />

          <span v-if="cadastrado" class="sucess"
            >Cadastrado com sucesso! 🏆</span
          >

          <button type="submit" value="" class="form-submit">
            Cadastrar cartão
          </button>
        </form>
      </div>

      <div v-if="counterStore.cartoes.length" class="modal-cards">
        <div class="modal-header">
          <h3>Cartões cadastrados</h3>
        </div>
        <table class="modal-table">
          <thead>
            <tr>
              <th class="columnView" @click="organizar('Nome')">
                Nome titular
              </th>
              <th class="columnView" @click="organizar('Categoria')">Banco</th>
              <th class="columnView" @click="organizar('Cartao')">
                Tipo cartão
              </th>
              <th class="columnView" @click="organizar('Valor')">
                Número do cartão
              </th>
              <th class="columnView" @click="organizar('Vencimento')">
                Data de vencimento
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cartoes in counterStore.cartoes" :key="cartoes.id">
              <td>{{ cartoes.nomeTitular }}</td>
              <td>{{ cartoes.nome }}</td>
              <td>{{ cartoes.cartao }}</td>
              <td>{{ cartoes.numeroCartao }}</td>
              <td>{{ formatarData(cartoes.dataVencimento) }}</td>
              <td
                @click="counterStore.excluirCartao(cartoes.nome)"
                style="cursor: pointer"
              >
                &times;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();

const nomeTitular = ref("");
const validade = ref("");
const numeroCartao = ref("");
const nomeBanco = ref("");
const cartao = ref("");
const dataVencimento = ref("");
const cadastrado = ref(false);

const resetCadastrado = () => {
  cadastrado.value = false;
};

const cadastrarCartao = (event) => {
  event.preventDefault();

  counterStore.cadastrarCartao({
    nome: nomeBanco.value,
    cartao: cartao.value,
    dataVencimento: dataVencimento.value,
    nomeTitular: nomeTitular.value,
    validade: validade.value,
    numeroCartao: numeroCartao.value,
  });

  cadastrado.value = true;

  nomeBanco.value = "";
  cartao.value = "";
  dataVencimento.value = "";
  nomeTitular.value = "";
  validade.value = "";
  numeroCartao.value = "";
};

const formatarData = (data) => {
  const opcoes = { year: "numeric", month: "long", day: "numeric" };
  return new Date(data).toLocaleDateString("pt-BR", opcoes);
};

const formatarNumeroCartao = (event) => {
  let numero = event.target.value.replace(/\D/g, "");
  numero = numero.slice(0, 16);
  const formatado = numero.replace(/(\d{4})/g, "$1 ").trim();
  numeroCartao.value = formatado;
};
</script>

<style>
.modal-cards {
  width: 60%;
  max-width: 1000px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin-right: 100px;
}

.modal-overlay-cards {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container-card {
  width: 490px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>