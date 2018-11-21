<template>
    <div style="margin: auto; width:60vw;">
        <md-card md-permanent="card">
            <md-field>
                <label>Nazwa ankiety</label>
                <md-input/>
            </md-field>
        </md-card>
        <md-content class="md-scrollbar">
                    <AddSurveyComponent v-for="q in questions" :key="q.id"  v-bind:question="q" style="margin-top: 20px;"/>
                    <md-button class="md-md-elevation-10" v-on:click="addAnswer">
                        <md-icon>add</md-icon>
                    </md-button>
        </md-content>

        <md-button class="md-fab">
        <md-icon>save</md-icon>
      </md-button>
    </div>
</template>

<script>
import AddSurveyComponent from '../components/AddSurveyComponent.vue'
export default {

    data(){
        return{
            questions: []
        }
    },

    components:{
        AddSurveyComponent
    },

    methods:{
        addAnswer: function(){
            this.questions.push({
                id: this.questions.length + 1,
                value: '',
                questionType: 0,
                answers: []})
        }
    }
}
</script>

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
