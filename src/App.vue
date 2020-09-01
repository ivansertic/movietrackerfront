<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
//import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
export default {
  name: 'App',

  components: {
    // eslint-disable-next-line vue/no-unused-components
    Register
  }
}
</script>
