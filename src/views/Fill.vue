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
            <md-input v-model="question.userAnswers[0]"/>
        </md-field>
        <div v-if="question.questionType == 1" class="md-layout">
            <div v-for="answer in question.answers" :key="answer.id" class="md-layout-item">
                <md-checkbox v-model="question.userAnswers" v-bind:value="answer.content">{{answer.content}}</md-checkbox>
            </div>
        </div>
         <div v-if="question.questionType == 2" class="md-layout">
            <div v-for="answer in question.answers" :key="answer.id" class="md-layout-item">
                <md-radio v-model="question.userAnswers[0]" v-bind:value="answer.content">{{answer.content}}</md-radio>
            </div>
        </div>
        </div>
    </md-card>
        </md-content>

        <md-button class="md-fab" v-on:click="sendSurvey">
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
import router from '../router';

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
        Axios.get('http://localhost:1337/api/Survey/DisplayAll/DisplayOne?surveyId=' + this.$route.params.id, {withCredentials: true})
        .then(r => 
        {
            this.survey = (r.data);
            this.survey.questions.forEach(element => {
                element.userAnswers = [];
            });
            console.log(r.data);
        });
    },

    sendSurvey: function(){
        let answers = {
                  surveyId: this.survey.id,
                  userAnswerModel: []
        }

        this.survey.questions.forEach(elem => {
              elem.userAnswers.forEach(ans => {
                  answers.userAnswerModel.push({
                        content: ans,
                        questionId: elem.id  
                  })
              });
        });

        console.log(answers);

        Axios.post('http://localhost:1337/api/Survey/FillSurvey', JSON.stringify(answers), {withCredentials: true}).then(r => router.push('/surveys'))

    }
},

beforeMount: function(){
    this.getSurvey();
}

}
</script>
