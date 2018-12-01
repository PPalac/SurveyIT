<template>
    <md-field>
        <label>Wybierz grupę</label>
        <md-select v-model="selectedGroup" v-on:md-selected="selected" multiple>
            <md-option v-for="group in groups" :key="group.id" v-bind:value="group.id">{{group.name}}</md-option>
        </md-select>
    </md-field>
</template>

<script>
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
    props:{
        groups: []          
        }
    }
)
export default class ChooseGroup extends Vue  {

    data(){
        return{
            selectedGroup: []
        }
    }
    selected(){
        this.$emit('groupSelected', this.selectedGroup)
    }
}
</script>

<style>

</style>
