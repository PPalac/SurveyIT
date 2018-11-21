<template>
    <div class="form md-layout md-card"> 
    <md-field>
      <label>Nazwa grupy</label>
      <md-input v-model="group.name"></md-input>
    </md-field>

    <md-field>
        <label for="users">Użytkownicy</label>
        <md-select v-model="group.userId" name="users" id="users" multiple>
        <md-option v-for="user in users" :key="user.id" v-bind:value="user.id">{{user.username}}</md-option>
        </md-select>
    </md-field>
<!--     
    
      <div class="md-layout-item">
        <strong>Wybrani użytkownicy:</strong>
        {{ group.usersnames }}
      </div> -->

    <md-button class="md-elevation-10 md-layout-item md-alignment-bottom-right" v-on:click="addGroup">Dodaj</md-button>

    </div>
</template>

<script>
import Axios from 'axios';
export default {
    data(){
        return{
            group:{
                name: '',
                userId: [],
            },
            users: []
        }        
    },

    methods:{
        getUsers: function(){
            Axios.get('http://localhost:1337/api/Account/DisplayUsers', {withCredentials: true}).then(r => {this.users = r.data; console.log(this.users)});
        },
        addGroup: function(){
            Axios.post('http://localhost:1337/api/Group/Create', JSON.stringify(this.group), {withCredentials: true}).then(r => console.log(r));
        }      
    },

    beforeMount: function(){
            this.getUsers();
        }
}
</script>

<style>
.form{
    margin: auto;
    width: 40%;
    padding: 20px;
    background: #303030;
    top: 1%;
}
</style>
