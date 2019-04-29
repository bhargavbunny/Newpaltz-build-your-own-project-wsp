<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link" to="/MyWorkouts">Workouts</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/AddWorkout">Add a Workout</router-link>
          </li>
        </ul>
        </div>
        <div class="container">
            <form @submit.prevent="submit">
              <br>

              <div class="form-group row">
                <label for="name" class="col-3 col-form-label">Calories Burned</label>
                <div class="col-9">
                <input type="text" v-model="data.calories_burned"
                    class="form-control"
                    name="calories_burned"
                    id="calories_burned"
                    aria-describedby="helpcalories_burned"
                    placeholder="calories_burned"
                    required>
                  <small id="helpcalories_burned" class="form-text text-muted">Add the number of calories you burned.</small>
                </div>
                </div>

            <div class="form-group row">
          <label for="body_focus" class="col-3 col-form-label">Workout Minutes</label>
          <div class="col-9">
          <input type="text" v-model="data.workout_minutes"
                    class="form-control"
                    name="workout_minutes"
                    id="workout_minutes"
                    aria-describedby="helpworkout_minutes"
                    placeholder="workout_minutes"
                    required>
                  <small id="helpworkout_minutes" class="form-text text-muted">Add the number of minutes you worked out.</small>
          </div>
          </div>

          <div class="form-group row">
          <label for="sets" class="col-3 col-form-label">Description</label>
          <div class="col-9">
          <input type="text" v-model="data.description"
                    class="form-control"
                    name="description"
                    id="description"
                    aria-describedby="helpdescription"
                    placeholder="description"
                    required>
                  <small id="helpdescription" class="form-text text-muted">Add any routines or details you did.</small>
          </div>
          </div>
          

          <br>

         <div class="form-group row">
          <div class="offset-3 col-9">
          <button type="submit" class="btn btn-primary">Submit</button>
          </div>
          </div>
          </form>
          </div>
          </div>
          </div>
          </div>
          

</template>

<script>
import { Globals } from '@/models/api';
import { addExercise } from '@/models/Workouts';
import toastr from 'toastr';
export default {
  data: () => ({
    data: {},
    newWorkout: null,
  }),
  methods: {
    async submit() {
      try {
        const m = await addWorkout(this.data);
        this.newWorkout = m;
        toastr.success("You've Successfully added the Workout!");
      } catch (error) {
        Globals.errors.push(error);
        toastr.error(error.message);
      }
    },
  },
};
</script>

<style>
</style>