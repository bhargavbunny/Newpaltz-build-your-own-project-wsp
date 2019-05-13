
<template>
  <div class="home">
    <div class="jumbotron">
      <h1 align="center">Welcome</h1>
      <br>
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Exercise</h5>
        <p class="card-text">Daily exercise to keep fit</p>
        <router-link class="btn btn-primary" to="/MyExercises"> My Exercise</router-link>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Food</h5>
        <p class="card-text">Keep track of your diet with healthy food</p>
        <router-link class="btn btn-primary" to="/AddFoodLog"> MyFood</router-link>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Sleep</h5>
        <p class="card-text">8 hour's of sleep is necessory for a human body.</p>
        <router-link class="btn btn-primary" to="/sleep_time"> SleepTrack</router-link>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Workouts</h5>
        <p class="card-text">workouts makes burn our calories</p>
        <router-link class="btn btn-primary" to="/MyWorkouts"> workouts</router-link>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Profile</h5>
        <p class="card-text">View or edit your profile</p>
        <router-link class="btn btn-primary" to="/user_profile"> profile</router-link>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Friends</h5>
        <p class="card-text">Share with friends and add them from users in your app</p>
        <router-link class="btn btn-primary" to="/MyFriends"> Myfriends</router-link>
      </div>
    </div>
  </div>
</div>


    </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    
  }
}
</script>
