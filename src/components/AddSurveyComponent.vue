<template>
    <md-card md-with-hover>
        <div style="background:#303030; padding: 20px;">
        <md-field>
            <label>Pytanie</label>
            <md-input v-model="question.Content"/>
        </md-field>
        <md-field>
            <label>Typ pytania</label>
            <md-select v-model="question.QuestionType">
                <md-option value="0">Otwarte</md-option>
                <md-option value="1">Zamknięte wielokrotnego wyboru</md-option>
                <md-option value="2">Zamknięte</md-option>
            </md-select>
        </md-field>
        <md-field>
            <label>Ilość odpowiedzi</label>
            <md-input v-model="aAmount"/>
        </md-field>
        <md-field v-for="n in parseInt(aAmount)" :key="n">
            <label>Odpowiedź</label>
            <md-input v-model="question.Answers[n]"/>
        </md-field>
        </div>
    </md-card>
</template>

<script>
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";



@Component({
    props:{
        question:{
            default:{
                Content: '',
                QuestionType: 0,
                Answers: []
            }
        }
    }
}
)
export default class AddSurveyComponent extends Vue {
       
    data(){
     return{
            aAmount: 0,
        }
    };
}
</script>
