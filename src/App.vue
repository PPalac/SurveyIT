<template>
  <div class="page-container">
    <md-app>
      <md-app-drawer id='md-drawer' md-permanent="card" v-if="isLoggedIn">
        <md-toolbar class="md-primary">
            <md-button to="/" class="logo">
              <h2>SurveyIT</h2>
            </md-button>
        </md-toolbar>
        <md-list style="background:transparent">
          <md-list-item class="menu-item md-elevation-10" to="surveys">
            <md-icon>check_box</md-icon>
            <span class="md-list-item-text md-body-2">Ankiety</span>
          </md-list-item>
          <md-list-item class="menu-item md-elevation-10" to="history" v-if="role == 'User'">
            <md-icon>history</md-icon>
            <span class="md-list-item-text md-body-2">Historia</span>
          </md-list-item>
          <md-list-item class="menu-item md-elevation-10" to="addSurvey" v-if="role == 'Admin'">
            <md-icon>note_add</md-icon>
            <span class="md-list-item-text md-body-2">Dodaj ankiete</span>
          </md-list-item>
          <md-list-item class="menu-item md-elevation-10" to="groups" v-if="role == 'Admin'">
            <md-icon>group</md-icon>
            <span class="md-list-item-text md-body-2">Grupy</span>
          </md-list-item>
          <md-list-item class="menu-item md-elevation-10" to="addGroup" v-if="role == 'Admin'">
            <md-icon>group_add</md-icon>
            <span class="md-list-item-text md-body-2">Dodaj grupe</span>
          </md-list-item>
          <md-list-item class="menu-item md-elevation-10" to="reports" v-if="role == 'Admin'">
            <md-icon>poll</md-icon>
            <span class="md-list-item-text md-body-2">Raporty</span>
          </md-list-item>
          <md-list-item class="menu-account-item md-elevation-10" to="account">
            <md-icon>account_box</md-icon>
            <span class="md-list-item-text md-body-2">Konto</span>
          </md-list-item>
          <md-list-item class="menu-item md-elevation-10" v-on:click="logout">
            <md-icon>open_in_new</md-icon>
            <span class="md-list-item-text md-body-2">Wyloguj</span>
          </md-list-item>           
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view/>
      </md-app-content>
  </md-app>
    <div class="footer">
      <label>Jakaś tam testowa stopka &copy;</label>
    </div>
  </div>
</template>

<style>
.md-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 90vh;
}
#md-drawer{
  border: 1px solid rgba(#303030);
  background:  #A9BCD0;
}
.md-app {
    max-height: 100vh;
    border: 1px solid rgba(#000, .12);
}
.menu-item{
  margin-top:10px;
  margin-left: 10px;
  margin-right: 10px;
  background: #2c3e50
}

.menu-account-item {
  margin-top: 30px;
   margin-left: 10px;
  margin-right: 10px;
  background: #2c3e50
}

.logo{
 margin: auto;
 background-size: cover;
}
</style>
<script lang="ts">
import Vue from 'vue'
import router from './router';
import Axios from 'axios';

export default Vue.extend({
  data(){
    return{
      get isLoggedIn() {
        return localStorage.getItem('isLoggedIn') || 0;
      },
      get role() {
        return localStorage.getItem('userRole') || 0;
      },
    }
  },
  methods:{
    logout: function(){
      Axios.get('http://localhost:1337/api/Account/Logout', {withCredentials: true}).then(r => console.log(r));
      localStorage.clear();
      router.push('login');
    }
  }
})
</script>

