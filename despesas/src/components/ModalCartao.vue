<template>
  <div>
    <div class="modal-overlay">
      <div class="form-container">
        <form @submit="cadastrarCartao">
          <label for="nomeTitular" class="form-label">Nome do titular:</label>
          <input
            type="text"
            id="nomeTitular"
            class="form-input"
            v-model="nomeTitular"
            required
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
          <div v-if="erro" style="color: red">{{ erro }}</div>

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

          <button type="submit" value="" class="form-submit">
            Cadastrar cartão
          </button>
        </form>
      </div>
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

  nomeBanco.value = "";
  cartao.value = "";
  dataVencimento.value = "";
  nomeTitular.value = "";
  validade.value = "";
  numeroCartao.value = "";
};

const formatarNumeroCartao = (event) => {
  let numero = event.target.value.replace(/\D/g, "");
  numero = numero.slice(0, 16);
  const formatado = numero.replace(/(\d{4})/g, "$1 ").trim();
  numeroCartao.value = formatado;
};
</script>

<style>

</style>