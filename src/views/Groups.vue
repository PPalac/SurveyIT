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
          <md-button>Action</md-button>
          <md-button>Action</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
    </md-list-item>
  </md-list>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
data(){
    return{
    groups: []
    }
},

methods:{
  getGroups: function(){
    Axios.get('http://localhost:1337/api/Group/Display', {withCredentials: true}).then(r => this.groups = r.data);
},
},
beforeMount: function(){
  this.getGroups();
}

}
</script>

<style>

</style>
