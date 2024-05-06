<template>
  <div>
    <div class="modal-overlay">
      <div class="form-container">
        <form @submit="cadastrarCartao">
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
          <select
            id="cartao"
            class="form-input"
            v-model="cartao"
            required
          >
            <option value="">Selecione</option>
            <option value="Credito">Crédito</option>
            <option value="Debito">Débito</option>
          </select>

          <label for="dataVencimento" class="form-label"
            >Data de vencimento:</label
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

const nomeBanco = ref("");
const cartao = ref("");
const dataVencimento = ref("");

const cadastrarCartao = (event) => {
  event.preventDefault();

  counterStore.cadastrarCartao({
    nome: nomeBanco.value,
    cartao: cartao.value,
    dataVencimento: dataVencimento.value,
  });

  nomeBanco.value = "";
  cartao.value = "";
  dataVencimento.value = "";
};
</script>

<style>
</style>