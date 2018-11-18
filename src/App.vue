<template>
  <div class="page-container">
    <md-app>
      <md-app-drawer id='md-drawer' md-permanent="card" v-if="isLoggedIn">
        <md-toolbar class="md-primary">
          <md-title md-large>
            <md-button to="/" class="md-dense">
              <h1>SurveyIT</h1>
            </md-button>
          </md-title>
        </md-toolbar>
        <md-list style="background:transparent">
          <md-list-item class="menu-item md-elevation-10" to="surveys">
            <md-icon>check_box</md-icon>
            <span class="md-list-item-text md-body-2">Nowe ankiety</span>
          </md-list-item>
          <md-list-item class="menu-item md-elevation-10" to="history">
            <md-icon>history</md-icon>
            <span class="md-list-item-text md-body-2">Historia</span>
          </md-list-item>
          <md-list-item class="menu-account-item md-elevation-10" to="account">
            <md-icon>account_box</md-icon>
            <span class="md-list-item-text md-body-2">Konto</span>
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
</style>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data(){
    return{
      get isLoggedIn() {
        return localStorage.getItem('isLoggedIn') || 0;
      },
    }
  },
})
</script>

