<template>
  <div class="navbar">
    <router-link class="active" to="/">Inicio</router-link>
    <router-link class="active" to="/cadastro">Cadastrar despesa</router-link>
    <router-link class="active" to="/cadastrar-cartao">Meus cartões</router-link>
    <router-link to="/visualizar">Visualizar despesas</router-link>
    <router-link class="active" to="/dashboard">Dashboard</router-link>
  </div>
</template>
<script>
</script>

<style>
.navbar {
  overflow: hidden;
  background-color: #333;
  font-family: Arial, sans-serif;
}

.navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
}

.navbar a:hover {
  background-color: #ddd;
  color: black;
}
</style>