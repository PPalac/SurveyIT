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
          <md-list-item class="menu-item md-elevation-10" v-on:click="report" v-if="role == 'Admin'">
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
              <div>
      <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Pobierz raport</md-dialog-title>
      <md-field>
        <label for="users">Typ</label>
        <md-select v-model="reportType">
        <md-option value="1">Arkusz kalkulacyjny .xlsx</md-option>
        <md-option value="2">Dokument tekstowy .docx</md-option>
        </md-select>
    </md-field>
     <md-field>
        <label for="users">Ankieta</label>
        <md-select v-model="surveyId">
        <md-option v-for="survey in surveys" :key="survey.id" v-bind:value="survey.id">{{survey.name}}</md-option>
        </md-select>
    </md-field>
      <md-dialog-actions>
        <md-button class="md-primary" v-on:click="getReport">Generuj</md-button>
        <!-- <md-button class="md-primary" v-on:click="closeAndSaveDialog">Zapisz</md-button> -->
      </md-dialog-actions>
    </md-dialog>
      </div>
      </md-app-drawer>
      <md-app-content>
        <router-view/>
      </md-app-content>
    <div class="footer">
      <label>Jakaś tam testowa stopka &copy;</label>
    </div>
  </md-app>
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
      reportType: '',
      surveyId: '',
      showDialog: false,
      surveys: [],
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
    },
    report: function(){
      Axios.get('http://localhost:1337/api/Survey/DisplayAll',{withCredentials: true}).then(r => {this.surveys = r.data; console.log(r.data); this.showDialog = true;});
    },
    getReport: function(){
      if(this.reportType == 1)
      {
        Axios.get('http://localhost:1337/api/Report/GetReportXlsx?surveyId='+this.surveyId, {withCredentials: true, responseType: 'blob'}).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'raport.xlsx'); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      }

      if (this.reportType == 2)
      {
          Axios.get('http://localhost:1337/api/Report/GetReportDocx?surveyId='+this.surveyId, {withCredentials: true, responseType: 'blob'}).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'raport.docx'); //or any other extension
            document.body.appendChild(link);
            link.click();
          });
      }

      this.showDialog = false;
    }
  }
})
</script>

