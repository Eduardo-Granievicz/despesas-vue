<template>
  <div>
    <div class="container">
      <div class="text">
        <h3>
        <strong>Gerenciador de Despesas</strong><br> Descrição: O Gerenciador de Despesas é um
        aplicativo web desenvolvido em Vue 3, HTML e CSS puro, com o Pinia para
        gerenciamento de estado.<br> Ele permite que os usuários cadastrem suas
        despesas, visualizem o total do valor das despesas, saibam quantas
        despesas estão em aberto e excluam despesas conforme necessário. <br>
        Funcionalidades<br> -> Cadastro de despesas: Os usuários podem adicionar
        novas despesas ao sistema, inserindo o nome da despesa e seu valor.<br> ->
        Visualização do total das despesas: O aplicativo calcula automaticamente
        o total do valor de todas as despesas cadastradas.<br> -> Contagem das
        despesas em aberto: Os usuários podem ver quantas despesas estão em
        aberto no momento.<br> -> Exclusão de despesas: Os usuários têm a opção de
        excluir despesas individualmente, caso não sejam mais necessárias.<br> -> Cadastro de cartões para controle de faturas<br>
        -> Dashboard com métricas para um controle mais preciso de suas despesas <br> <br>
        Para mais informações acesse: <a href="https://github.com/Eduardo-Granievicz/despesas-vue">https://github.com/Eduardo-Granievicz/despesas-vue</a>
      </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexVue",
  components: {},
  setup() {},
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    text-align: center;
  }

.text {
  width: 600px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>