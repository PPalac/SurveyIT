<template>
    <md-card md-with-hover>
        <div style="background:#303030; padding: 20px;">
        <md-field>
            <label>{{question}}</label>
            <md-input v-model="question.value"/>
        </md-field>
        <md-field>
            <label>Typ pytania</label>
            <md-select v-model="question.questionType">
                <md-option value="1">Zamknięte</md-option>
                <md-option value="2">Zamknięte wielokrotnego wyboru</md-option>
                <md-option value="3">Otwarte</md-option>
            </md-select>
        </md-field>
        <md-field>
            <label>Ilość odpowiedzi</label>
            <md-input v-model="aAmount"/>
        </md-field>
        <md-field v-for="n in parseInt(aAmount)" :key="n">
            <label>Odpowiedź</label>
            <md-input v-model="question.answers[n]"/>
        </md-field>
        </div>
    </md-card>
</template>

<script>
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";


// var question = {
//     value: '',
//     questionType: 0,
//     answers: []
// }

@Component({
    props:{
        question:{
            default:{
                value: '',
                questionType: 0,
                answers: []
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
