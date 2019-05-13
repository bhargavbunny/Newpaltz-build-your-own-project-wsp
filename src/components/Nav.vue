<template>

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link class="navbar-brand" to="/" >
            <img alt="Vue logo" src="../assets/logo.png" height="30">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item ">
                    <router-link class="nav-link" to="/" active-class="active" exact>Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/About" active-class="active">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard">DashBoard</router-link>
                </li>
            </ul>

            <form class="form-inline mt-2 mt-md-0" v-if="!Globals.user">
                <router-link to="/Login" class="nav-link">Login</router-link>
                <router-link to="/Register" class="nav-link">Sign Up</router-link>
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <span class="navbar-text" v-if="Globals.user">
                <img width="30" :src="`https://graph.facebook.com/${Globals.oAuthUser.id}/picture`" />
                Welcome {{Globals.user.FirstName}} {{Globals.user.LastName}}
            </span>
        </div>
    </nav>
</template>

<script>
import { Globals } from "@/models/api";

export default {
    data: ()=>({
        Globals: Globals
    }),
    methods: {
        
    }
}
</script>

<style>

</style>
