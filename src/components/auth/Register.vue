<template>
<v-container fill-height>
<v-layout align-center justify-center>
  <v-flex xs12 sm8 md4>
    <v-form>
      <v-card class="elevation-12">
        <v-toolbar dark color="blue">
          <v-toolbar-title>
            Register
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
              name="username"
              label="Username"
              type="text"
              :rules ="[rules.required]"
              v-model="username"
          ></v-text-field>

          <v-text-field
              name="email"
              label="Email"
              type="email"
              :rules ="[rules.required, rules.email]"
              v-model="email"
          ></v-text-field>

          <v-text-field
              name="password"
              label="Password"
              type="password"
              :rules ="[rules.required]"
              v-model="password"
          ></v-text-field>

          <v-text-field
              name="password_confirmation"
              label="Password Confirmation"
              type="password"
              :rules ="[rules.required]"
              :error = "valid()"
              v-model="confirm"
          ></v-text-field>
        </v-card-text>

        <v-divider light/>
        <v-card-actions>
          <v-btn to="/" class="elevation-6" dark color = "blue" rounded> To Login</v-btn>
          <v-spacer/>
          <v-btn @click="post"  class="elevation-6" dark color = "blue" rounded> Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-flex>
</v-layout>
</v-container>
</template>

<script>
import axios from 'axios';
const apiUrl = "http://localhost:3333/api/auth";
let apiEndPoint = apiUrl+"/register";

export default {
  name:"register",
  data: () =>({
    password:"",
    confirm:"",
    email:"",
    username:"",
    rules:{
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),

  methods:{
    valid(){
      return this.password !== this.confirm
    },
    post: function(){
      axios.post(apiEndPoint,{
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirm
      }).then((response) =>{
            if(response.status ===200){
              this.$router.push("/")
            }
          }
          ,(error) => {
        console.log(error.response.status)})
    }
  }
}
</script>

<style scoped>

</style>
