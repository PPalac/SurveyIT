<template>
    <div style="margin: auto; width:60vw;">
        <md-card md-permanent="card" style="padding: 20px;">
            <md-field>
                <label>Nazwa ankiety</label>
                <md-input v-model="surveyName"/>
            </md-field>
            <ChooseGroup v-bind:groups="groups" v-on:groupSelected="groupSelected"/>
            <div class="md-layout md-gutter">
                <md-field class="md-layout-item">                    
                    <md-datepicker class="md-layout-item" v-model="startDate">
                        <label>Data rozpoczęcia</label>
                    </md-datepicker>
                </md-field>
                <md-field class="md-layout-item">                    
                    <md-datepicker class="md-layout-item" v-model="endDate">
                        <label>Data zakończenia</label>
                    </md-datepicker>
                </md-field>
            </div>
        </md-card>
        <md-content class="md-scrollbar">
                    <AddSurveyComponent v-for="q in questions" :key="q.Id"  v-bind:question="q" style="margin-top: 20px;"/>
                    <md-button class="md-md-elevation-10" v-on:click="addAnswer">
                        <md-icon>add</md-icon>
                    </md-button>
        </md-content>

        <md-button class="md-fab" v-on:click="saveSurvey">
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
import AddSurveyComponent from '../components/AddSurveyComponent.vue'
import ChooseGroup from '../components/ChooseGroup.vue'
import Axios from 'axios';
export default {

    data(){
        return{
            questions: [],
            surveyName: '',
            groups: [],
            selectedGroup:[],
            startDate: '',
            endDate: ''
        }
    },

    components:{
        AddSurveyComponent,
        ChooseGroup
    },

    methods:{
        addAnswer: function(){
            this.questions.push({
                Id: this.questions.length + 1,
                Content: '',
                QuestionType: 0,
                Answers: []})
        },

        groupSelected: function(groups){
            this.selectedGroup = groups;
        },

        saveSurvey: function(){

            let survey = {
                Name : this.surveyName,
                Questions : [],
                GroupId: this.selectedGroup,
                Start_date: this.startDate,
                End_date: this.endDate
            }

            for(var i = 0; i < this.questions.length; i++)
            {
                survey.Questions.push({Content: this.questions[i].Content, Answers: [], QuestionType: this.questions[i].QuestionType});

                for(var k = 1; k < this.questions[i].Answers.length; k++)
                {
                    survey.Questions[i].Answers.push({Content: this.questions[i].Answers[k]})
                }
            }

            console.log(JSON.stringify(survey));

            Axios.post('http://localhost:1337/api/Survey/Create', JSON.stringify(survey), {withCredentials: true}).then(r => console.log(r));
        }
    },

    beforeMount: function(){
        Axios.get('http://localhost:1337/api/Group/Display', {withCredentials: true}).then(r => this.groups = r.data);
    }
}
</script>
