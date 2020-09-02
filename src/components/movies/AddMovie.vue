<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue">
              <v-toolbar-title>
                Add Movie
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                  name="title"
                  label="Title"
                  type="text"
                  :rules ="[rules.required]"
                  v-model="title"
              ></v-text-field>

              <v-text-field
                  name="genre"
                  label="Genre"
                  type="text"
                  :rules ="[rules.required]"
                  v-model="genre"
              ></v-text-field>

              <v-textarea
                  name="description"
                  label="Description"
                  type="text"
                  :rules ="[rules.required]"
                  v-model="description"
              ></v-textarea>


              <v-text-field
                  name="duration"
                  label="Duration in Minutes"
                  type="number"
                  :rules ="[rules.required]"
                  v-model="duration"
              ></v-text-field>

              <v-file-input
                  name="picture"
                  type="file"
                  v-model="file"
              ></v-file-input>
            </v-card-text>

            <v-divider light/>
            <v-card-actions>
              <v-btn to="/movie" class="elevation-6" dark color = "blue" rounded> Back </v-btn>
              <v-spacer/>
              <v-btn @click.prevent="addMovie" class="elevation-6" dark color = "blue" rounded> Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
const apiUrl = "http://localhost:3333/api/movie";
let apiEndPoint = apiUrl+"/create";
export default {
name: "AddMovie",
  data: () =>({
    title:"",
    genre:"",
    description:"",
    duration:"",
    file:"",
    rules: {
      required: value => !!value || "Required"
    }}),
  methods:{
    addMovie(){
      let formData = new FormData()
      formData.append("title", this.title)
      formData.append("genre", this.genre)
      formData.append("description", this.description)
      formData.append("duration", this.duration)
      formData.append("cover_picture", this.file)
      axios.post(apiEndPoint,
        formData
      ,{'headers': { 'Authorization': 'Bearer '+this.$cookie.get('accessToken')}}
      )
    }
  }

}
</script>

<style scoped>

</style>
