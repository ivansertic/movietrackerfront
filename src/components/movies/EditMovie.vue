<template>
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-form>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue">
                <v-toolbar-title>
                  Edit Movie
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

                <v-checkbox
                    name="watched"
                    label="Finished"
                    v-model="checked"
                >

                </v-checkbox>

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
                <v-btn @click.prevent="update" class="elevation-6" dark color = "blue" rounded> Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
const apiUrl = "http://localhost:3333/api/movie/single/";
const update ="http://localhost:3333/api/movie/update/"
export default {
name: "EditMovie",
  data: () =>({
    title:"",
    genre:"",
    description:"",
    duration:"",
    file:"",
    checked:false,
    rules: {
      required: value => !!value || "Required"
    }}),
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      axios.get(apiUrl+this.$route.params.id, {'headers': {'Authorization': 'Bearer ' + this.$cookie.get('accessToken')}}).then(response => {
        let movie = response.data
        this.title = movie.title
        this.duration = movie.duration
        this.description=movie.description
        this.genre = movie.genre
      })
    },
    update(){
      let formData = new FormData()
      formData.append("title",this.title)
      formData.append("genre",this.genre)
      formData.append("duration",this.duration)
      formData.append("description",this.description)
      formData.append("finished",this.checked)

      if(this.file){
        formData.append("cover_picture",this.file)
      }

      axios.post(update+this.$route.params.id,formData,{'headers': {'Authorization': 'Bearer ' + this.$cookie.get('accessToken')}})
      .then(response =>{
        if(response.status ===200){
          this.$router.push("/movie")
        }
      }).catch(error=>{
        this.$alert(error.response.data._message)
      })
    }
  }
}
</script>

<style scoped>

</style>
