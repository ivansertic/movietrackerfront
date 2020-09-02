<template>
  <v-navigation-drawer permanent style="width: 100%; overflow: hidden">
    <v-toolbar color="blue" dark>
      <v-toolbar-title>Watched movies</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex md3>
        <v-btn to="/movie/new/add" dark color="blue">Add Movie</v-btn>
      </v-flex>
      <v-spacer></v-spacer>


      <v-flex sm2>
        <v-btn to="/movie" dark color="blue">Watched movies</v-btn>
      </v-flex >
      <v-flex sm2>
        <v-btn disabled dark >Movies To Watch</v-btn>
      </v-flex>
      <v-flex sm1>
        <v-btn @click.prevent="logout" dark color="blue">LogOut</v-btn>
      </v-flex>
    </v-toolbar>
    <v-spacer></v-spacer>

    <div>
      <v-simple-table
          :dense="false"
          :fixed-header="false">
        <thead>
        <th class="text-center" >Picture</th>
        <th class="text-center">Details</th>
        <th class="text-center">Actors</th>
        <th class="text-center">Actions</th>
        </thead>

        <tbody>
        <tr v-for="(movie,index) in movies" :key="index">

          <td class="text-center" width="200" height="200">
            <v-img
                :src="require(`../../../../movieTracker/public/${movie.media.path}`)"
                width="200"
                height="300"
            >
            </v-img>
          </td>

          <td class="text-center">
            <br>
            <b>Title:</b><br>
            {{movie.title}}
            <br><br>
            <b>Description:</b>
            <br>
            {{movie.description}}
            <br><br>
            <b>Genre:</b><br>
            {{movie.genre}}
            <br><br>
            <b>Duration:</b><br>
            {{movie.duration}} min
          </td>

          <td class="text-center">
            <div v-for="(actor,index) in movies[index].actors" :key="index">
              <br>
              <b>Full Name:</b> {{actor.firstName}} {{actor.lastName}}
              <br>
              <b>Age:</b> {{actor.age}}
              <br>
              <v-btn @click.prevent="$router.push(`/actor/edit/${actor.id}`)" dark color="blue">Edit</v-btn>
              <v-btn @click.prevent="deleteActor(actor.id)" dark color="red">Delete</v-btn>
            </div>

          </td>

          <td class="text-center">
            <div>
              <v-btn @click.prevent="$router.push(`/actor/create/${movie.id}`)" dark color="blue">Add Actor</v-btn>
            </div>
            <br>
            <div>
              <v-btn @click="$router.push(`/movie/${movie.id}`)" dark color="blue">Edit movie</v-btn>
            </div>
            <br>
            <div>
              <v-btn @click.prevent="deleteMovie(movie.id)" dark color="red">Delete</v-btn>
            </div>
          </td>
        </tr>
        <br>
        </tbody>
      </v-simple-table>
    </div>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios';
const apiUrl = "http://localhost:3333/api/movie/watch";
const deleteUrl="http://localhost:3333/api/movie/"
const deleteActor = "http://localhost:3333/api/actor/"
export default {
  name: "WatchedMovies",
  data: ()=>({
    movies:"",
    imageBaseUrl:"../../../../movieTracker/public/"
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
        this.movies = response.data.data
        console.log(this.movies)
      })
    },
    deleteMovie(id){
      axios.delete(deleteUrl+id,{'headers': { 'Authorization': 'Bearer '+this.$cookie.get('accessToken')}})
          .then(response =>{
            if(response.status === 200){
              location.reload()
            }})
    },
    logout(){
      this.$cookie.set("accessToken","")
      this.$router.push("/")
    },
    deleteActor(id){
      axios.delete(deleteActor+id,{'headers': { 'Authorization': 'Bearer '+this.$cookie.get('accessToken')}})
          .then(response =>{
            if(response.status === 200){
              location.reload()
            }})
    }
  }
}
</script>

<style scoped>

</style>
