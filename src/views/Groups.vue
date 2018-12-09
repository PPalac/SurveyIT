<template>
<div>
  <md-list class="md-list">
    <md-list-item v-for="group in groups" :key="group.id">
    <md-card md-with-hover class="md-elevation-10">
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{group.name}}</div>
        </md-card-header>

        <md-card-content>
          
        </md-card-content>

        <md-card-actions>
          <md-button v-on:click="assignUsers(group.id)">Przypisz użytkoników</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
    </md-list-item>
  </md-list>

   <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Wybierz użytkowników</md-dialog-title>
      <md-field>
        <label for="users">Użytkownicy</label>
        <md-select v-model="usersId" name="users" id="users" multiple>
        <md-option v-for="user in users" :key="user.id" v-bind:value="user.id">{{user.username}}</md-option>
        </md-select>
    </md-field>
      <md-dialog-actions>
        <md-button class="md-primary" v-on:click="closeDialog">Zamknij</md-button>
        <md-button class="md-primary" v-on:click="closeAndSaveDialog">Zapisz</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
  </div>
</template>

<style lang="scss" scoped>
  .md-card {
    width: 50vw;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    background: #336699
  };
  .md-list{
    margin: auto;
    width: 60vw;
  }
  .md-dialog{
    width: 40vw;
    height: 30vh;
    padding: 20px;
  }
</style>

<script>
import Axios from 'axios';

export default {
data(){
    return{
    groups: [],
    showDialog: false,
    users: [],
    usersId: [],
    groupId: ''
    }
},

methods:{
  getGroups: function(){
    Axios.get('http://localhost:1337/api/Group/Display', {withCredentials: true}).then(r => this.groups = r.data);
  },
  closeDialog: function(){
    this.usersId = [];
    this.groupId = '';
    this.showDialog = false;
  },
  closeAndSaveDialog: function(){
    Axios.post('http://localhost:1337/api/UserManagement/AssignToGroup', JSON.stringify({UsersId: this.usersId, GroupsId: [this.groupId]}), {withCredentials: true}).then(r => {this.groupId = ''; this.showDialog = false;});
  },
  assignUsers: function(id){

    this.groupId = id;
    
    Axios.get('http://localhost:1337/api/UserManagement/UnassignedUsers?groupId=' + id, {withCredentials: true}).then(r => {this.users = r.data; this.showDialog = true;});
  }
},
beforeMount: function(){
  this.getGroups();
}

}
</script>
