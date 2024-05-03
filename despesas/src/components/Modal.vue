<template>
    <div class="modal-overlay">
      <div class="form-container">
        <form @submit="cadastrarDespesa">
          <label for="nomeDespesa" class="form-label">Nome da despesa:</label>
          <input type="text" id="nomeDespesa" class="form-input" v-model="nomeDespesa" required>
  
          <label for="valorDespesa" class="form-label">Valor da despesa:</label>
          <input type="number" id="valorDespesa" class="form-input" v-model="valorDespesa" required>
  
          <label for="dataPagamento" class="form-label">Data de pagamento:</label>
          <input type="date" id="dataPagamento" class="form-input" v-model="dataPagamento" required>

          <button type="submit" value="" class="form-submit">Cadastrar despesa</button>
          <router-link to="/visualizar">
              <button  class="visualizar">Visualizar despesas</button>
          </router-link>
        </form>
      </div>
    </div>
  </template>
<script setup>
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
const counterStore = useCounterStore();

const nomeDespesa = ref('');
const valorDespesa = ref('');
const dataPagamento = ref('');

const cadastrarDespesa = (event) => {

  event.preventDefault();
  
  counterStore.adicionarDespesa({
    nome: nomeDespesa.value,
    valor: valorDespesa.value,
    dataPagamento: dataPagamento.value
  });

  nomeDespesa.value = '';
  valorDespesa.value = '';
  dataPagamento.value = '';
};
</script>
<style>
        .form-container {
            max-width: 300px;
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
            background-color: #04AA6D;
            color: white;
            cursor: pointer;
        }

        .visualizar {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 4px;
            background-color: #04AA6D;
            color: white;
            cursor: pointer;
            margin-top: 5px;
        }

        .visualizar:hover {
            background-color: #037F58;
        }

        .form-submit:hover {
            background-color: #037F58;
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;

        }

    </style>