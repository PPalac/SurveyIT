<template>
    <div style="margin: auto; width:60vw;">
        <md-card md-permanent="card" style="padding: 20px;">
            <md-field>
                <label>{{survey.name}}</label>
            </md-field>
        </md-card>
        <md-content class="md-scrollbar">
        <md-card v-for="question in survey.questions" :key="question.id" md-with-hover style="margin-top:20px;">
        <div style="background:#303030; padding: 20px;">
        <md-field>
            <label>{{question.content}}</label>
        </md-field>
        <md-field v-if="question.questionType == 0">
            <label>Odpowiedź</label>
            <md-input v-model="question.answers[0]"/>
        </md-field>
        <div v-if="question.questionType == 1" class="md-layout">
            <div v-for="answer in question.answers" :key="answer.id" class="md-layout-item">
                <md-checkbox v-model="question.userAnswers" v-bind:value="answer.content">{{answer.content}}</md-checkbox>
            </div>
        </div>
         <div v-if="question.questionType == 2" class="md-layout">
            <div v-for="answer in question.answers" :key="answer.id" class="md-layout-item">
                <md-checkbox v-model="question.userAnswers" v-bind:value="answer.content">{{answer.content}}</md-checkbox>
            </div>
        </div>
        </div>
    </md-card>
        </md-content>

        <md-button class="md-fab">
        <md-icon>save</md-icon>
      </md-button>
    </div>
</template>
<style scoped>
.md-scrollbar {
    max-height: 70vh;
    overflow: auto;
  }
.md-fab{
    position: absolute;
    left: 85%;
}
</style>
<script>
import Axios from 'axios';

export default {

data(){
    return{
        survey:{
            id: '',
            name: '',
            start_date: '',
            end_date: '',
            groupId: '',
            questions: []
        }
    }
},

methods:{
    getSurvey:function(){
        Axios.get('http://localhost:1337/api/Survey/DisplayAll/DisplayOne?surveyId=' + this.$route.params.id, {withCredentials: true}).then(r => {this.survey = (r.data); console.log(r.data)});
    }
},

beforeMount: function(){
    this.getSurvey();
}

}
</script>
