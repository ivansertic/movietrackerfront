<template>
  <v-navigation-drawer permanent style="width: 100%; overflow: hidden">
    <v-toolbar color="blue" dark>
      <v-toolbar-title>Watched movies</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex md3>
        <v-btn to="/movie/add" dark color="blue">Add Movie</v-btn>
      </v-flex>
      <v-spacer></v-spacer>


      <v-flex sm2>
        <v-btn disabled dark>Watched movies</v-btn>
      </v-flex >
      <v-flex sm2>
        <v-btn dark color="blue">Movies To Watch</v-btn>
      </v-flex>
      <v-flex sm1>
        <v-btn dark color="blue">LogOut</v-btn>
      </v-flex>
    </v-toolbar>
    {{this.userInfo}}
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios';
const apiUrl = "http://localhost:3333/api/user";
export default {
name: "MoviesToWatch",
  data: ()=>({
    userInfo:""
  }),

  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods:{
    async fetchData(){
      axios.get(apiUrl,{'headers': { 'Authorization': 'Bearer '+this.$cookie.get('accessToken')}}).then(response=>{
        this.userInfo = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
