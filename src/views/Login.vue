<template>
<div class="loginForm md-md-layout md-card"> 
    <md-field>
      <label>Login</label>
      <md-input v-model="loginModel.username"></md-input>
    </md-field>

    <md-field>
      <label>Password toggle</label>
      <md-input v-model="loginModel.password" type="password"></md-input>
    </md-field>
    <div class="md-md-layout">
        <md-button class="md-layout-item md-elevation-14 right-alignment" v-on:click="login">Login</md-button>  
        <md-button class="md-layout-item router-link-exact-active">Zarejestruj się</md-button> 
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppVue from '../App.vue';
import router from '../router';

var loginModel = {
  username: '',
  password: ''
}
 export default {
    name: 'TextFields',
    data: () => ({
      loginModel
    }),
    methods:{
      login : function(){
        let result = axios.post('http://localhost:1337/api/Account/Auth', JSON.stringify(this.loginModel), {withCredentials: true})
        .then(r => {
          console.log(r);
          if (r.status == 200)
          {
            localStorage.setItem('isLoggedIn', 'true');
            router.push('home');
          }
          })
          .catch(e => console.log(e));
      }
    }
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
