<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue">
              <v-toolbar-title>
                Actor Movie
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                  name="firstName"
                  label="First Name"
                  type="text"
                  :rules ="[rules.required]"
                  v-model="firstName"
              ></v-text-field>

              <v-text-field
                  name="lastName"
                  label="Last Name"
                  type="text"
                  :rules ="[rules.required]"
                  v-model="lastName"
              ></v-text-field>


              <v-text-field
                  name="age"
                  label="Age"
                  type="number"
                  :rules ="[rules.required]"
                  v-model="age"
              ></v-text-field>
            </v-card-text>

            <v-divider light/>
            <v-card-actions>
              <v-btn to="/movie" class="elevation-6" dark color = "blue" rounded> Back </v-btn>
              <v-spacer/>
              <v-btn @click.prevent="edit" class="elevation-6" dark color = "blue" rounded> Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
const apiUrl = "http://localhost:3333/api/actor/single/";
const edit = "http://localhost:3333/api/actor/update/"
export default {
  name: "EditActor",
  data: ()=>({
    firstName:"",
    lastName:"",
    age:"",
    rules: {
      required: value => !!value || "Required"
    }
  }),
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods:{
    fetchData(){
      axios.get(apiUrl+this.$route.params.id,{'headers': {'Authorization': 'Bearer ' + this.$cookie.get('accessToken')}})
      .then(response =>{
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        this.age = response.data.age
      })
    },

    edit(){
      axios.post(edit+this.$route.params.id,{
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age
      },{'headers': {'Authorization': 'Bearer ' + this.$cookie.get('accessToken')}}).then(response => {
        if(response.status === 200){
          this.$router.push("/movie")
        }
      }).catch(error =>{
        this.$alert(error.response.data._message)
      })
    }
  }
}
</script>

<style scoped>

</style>
