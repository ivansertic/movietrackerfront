<template>
<v-container fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-form>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>
              Login
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
                name="username"
                label="Email or username"
                type="text"
                v-model="username"
                :rules="[rules.required]"
            ></v-text-field>

            <v-text-field
                name="password"
                label="Password"
                type="password"
                v-model="password"
                :rules="[rules.required]"
            ></v-text-field>
          </v-card-text>

          <v-divider light/>
          <v-card-actions>
            <v-btn @click.prevent="login" class="elevation-6" dark color = "blue" rounded> Login</v-btn>
            <v-spacer/>
            <v-btn to="/register" class="elevation-6" dark color = "blue" rounded> To Register</v-btn>
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
let apiEndPoint = apiUrl+"/login";
//let test = "http://localhost:3333/api/user/"

export default {
name: "login",
  data: ()=>({
    username:"",
    password:"",
    rules:{
      required: value => !!value || "Required"
    }
  }),

  methods:{
    login(){
      axios.post(apiEndPoint,{
        username:this.username,
        password:this.password
      }).then(res=>{
        this.$cookie.set('accessToken',res.data.accessToken);
        console.log(this.$cookie.get("accessToken"))
      }).catch((error)=>{
          this.$alert(error.response.data._message)
        })
    },

    /*test(){
      axios.get(test,{'headers': { 'Authorization': 'Bearer '+this.$cookie.get('accessToken') }
      }).catch((error)=>{console.log(error.response.status)
        if(error.response.status !== 200){
          this.$alert("You are not logged in")
        }})
    },

    logout(){
      this.$cookie.set("accessToken","")
    }*/
  }

}
</script>

<style scoped>

</style>
