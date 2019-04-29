<template>
   <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link active" to="/MyWorkouts"> My Workouts</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/AddWorkout">Add a Workout</router-link>
          </li>
        </ul>
        <div>
          <h1> My Workouts</h1>
              <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col">Date/Time</th>
                <th scope="col">Calories Burned</th>
                <th scope="col">Workout Minutes</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="Workout in Workouts" :key="Workout.ID">
                  <th scope="row">{{Workout.WorkoutName}}</th>
                   <td>{{Workout.defaultWorkouts}}</td>
                </tr>
            </tbody>
          </table>
          </div>
        </div>
    </div>
  </div>
</div>
</template>


<script>
import { Globals } from '@/models/api';
import { getRoutine } from '@/models/Workouts.js';
export default {
  data: () => ({
    Globals: Globals,
    Workouts: [],
  }),
  async mounted() {
    this.Workouts = await getWorkout();
  },
};
</script>

<style>
</style>
