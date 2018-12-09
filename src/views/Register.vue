<template>
    <div class="centered">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
        <md-card-header class="form">
          <div class="md-title">Dane</div>
        </md-card-header>

        <md-card-content class="form">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">Imię</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Nazwisko</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <!-- <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('gender')">
                <label for="gender">Płeć</label>
                <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="M">M</md-option>
                  <md-option value="F">F</md-option>
                </md-select>
                <span class="md-error">The gender is required</span>
              </md-field>
            </div> -->

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">Nazwa użytkownika</label>
                <md-input id="username" name="username" v-model="form.username" :disabled="sending" autocomplete="dsw" />
                <span class="md-error" v-if="!$v.form.password.required">The username is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid username</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Hasło</label>
                <md-input type="password" id="password" name="password" v-model="form.password" :disabled="sending" autocomplete="asd" />
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" v-model="form.email" :disabled="sending"/>
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
        </md-card-content>

        <md-card-actions class="form">
          <md-button type="submit" class="md-primary" :disabled="sending">Rerejstruj!</md-button>
        </md-card-actions>
      </md-card>

      <div>
      <md-progress-bar md-mode="indeterminate" v-if="sending" class="md-primary" />
      </div>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was registered with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
 import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    minValue
  } from 'vuelidate/lib/validators'
import Axios from 'axios';
import router from '../router';

  export default {
    name: 'Account',
    mixins: [validationMixin],
    data: () => ({
      form: {
        id: null,
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        email: null,
        username: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
         lastName: {
          required,
          minLength: minLength(3)
        },
        password: {         
          minLength: maxLength(6),
        },
        // gender: {
        //   required
        // },
        email: {
          required,
          email
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.password = null
        //this.form.gender = null
        this.form.email = null
        this.form.username = null
      },
      saveUser () {
        this.sending = true

       Axios.post('http://localhost:1337/api/Account/Register', JSON.stringify(this.form) ,{withCredentials: true}).then(r => {this.sending = false; this.userSaved = true; let interval = setInterval(()=> {router.push('/login'); clearInterval(interval)}, 2000)});
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      },
    },
    mounted: function(){
        this.clearForm();
    }
  }
</script>

<style>
 .centered{
     display: flex;
     justify-content: center;
 }
 .form{
     width: 50vw;
     background: #303030
 }
</style>
