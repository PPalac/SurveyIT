<template>
<div>
  <md-list class="md-list">
    <md-list-item v-for="survey in surveys" :key="survey.item1">
    <md-card md-with-hover class="md-elevation-10">
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{survey.item2}}</div>
        </md-card-header>

        <md-card-content>
          {{survey.item2}}
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
</style>

<script>
import Vue from 'vue';
import Axios from 'axios';

export default {
  name: 'Surveys',
  data() {
    return{
      surveys: []
      }
  },
  methods:{
    getSurveys: function(){
      Axios.get('http://localhost:1337/api/Survey/DisplayAll', {withCredentials: true}).then(r => {this.surveys = r.data; console.log(r.data)}).catch(e => console.log(e));
    },    
  },
  beforeMount(){
      this.getSurveys();
    }
}
</script>