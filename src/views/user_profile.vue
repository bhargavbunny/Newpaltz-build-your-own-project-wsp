<template>
   <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link active" to="/MyExercises"> My Exercises</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/AddExercise">Add an Exercise</router-link>
          </li>
        </ul>
        <div>
          <h1> My Exercises</h1>
              <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Body Focus</th>
                <th scope="col">Reps</th>
                <th scope="col">Sets</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="Exercise in Exercises" :key="Exercise.ID">
                  <th scope="row">{{Exercise.Exercisename}}</th>
                   <td>{{Exercise.defaultbody_focus}}</td>
                  <td>{{Exercise.defaultreps}}</td>
                  <td>{{Exercise.defaultsets}}</td>
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
import { getExercise } from '@/models/Exercises.js';
export default {
  data: () => ({
    Globals: Globals,
    Exercises: [],
  }),
  async mounted() {
    this.Exercises = await getExercise();
  },
};
</script>

<style>
</style>
