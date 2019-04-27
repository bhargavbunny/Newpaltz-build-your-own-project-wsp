<template>
    <v-toolbar fixed class="blue darken-2" dark>
        <v-toolbar-title dark class="mr-4">
            <span
                class="home"
                @click="navigateTo({name: 'root'})">
                SelfInquiry
            </span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn flat dark
                @click="navigateTo({name: 'profile'})">
                Profile
            </v-btn>
            <v-btn flat dark
                @click="navigateTo({name: 'news'})">
                News
            </v-btn>
            <v-btn flat dark
                @click="navigateTo({name: 'exercises'})">
                Exercises
            </v-btn>
            <v-btn flat dark
                @click="navigateTo({name: 'register'})">
                Sign Up
            </v-btn>
            <v-btn flat dark
                @click="navigateTo({name: 'login'})">
                Login
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.home {
    cursor:pointer;
}
.home:hover {
    color: #E9E;
}
</style>
