<template>
<v-container>
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
            ></v-text-field>

            <v-text-field
                name="password"
                label="Password"
                type="password"
            ></v-text-field>
          </v-card-text>

          <v-divider light/>
          <v-card-actions>
            <v-btn class="elevation-6" dark color = "blue" rounded> Login</v-btn>
            <v-spacer/>
            <v-btn  class="elevation-6" dark color = "blue" rounded> Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
name: "Login"
}
</script>

<style scoped>

</style>
