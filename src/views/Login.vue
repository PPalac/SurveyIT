<template>
<div class="loginForm md-md-layout md-card"> 
    <md-field>
      <label>Login</label>
      <md-input v-model="withLabel"></md-input>
    </md-field>

    <md-field>
      <label>Password toggle</label>
      <md-input v-model="password" type="password"></md-input>
    </md-field>
    <div class="md-md-layout">
        <md-button class="md-layout-item md-elevation-14 right-alignment">Login</md-button>  
        <md-button class="md-layout-item router-link-exact-active">Zarejestruj się</md-button> 
    </div>
  </div>
</template>

<script>
 export default {
    name: 'TextFields',
    data: () => ({
      login: null,
      password: null,
    })
  }
</script>

<style>
.loginForm{
    width: 30vw;
    position: absolute;
    top: 30%;
    left: 35%;
  }
.right-alignment{
    margin-left: 80%
}
.md-card{
    background: #303030;
    padding: 20px
}
</style>
