<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link" to="/sleep_time">My sleep time</router-link>
          </li>
        </ul>
        </div>
        <div class="container">
            <form @submit.prevent="submit">
              <br>

              <div class="form-group row">
                <label for="Date" class="col-3 col-form-label">Date</label>
                <div class="col-9">
                <input type="date" v-model="data.date"
                    class="form-control"
                    name="date"
                    id="date"
                    aria-describedby="helpDate"
                    placeholder="Date"
                    required>
                  <small id="helpDate" class="form-text text-muted">Add the date for your sleep time.</small>
                </div>
                </div>

            <div class="form-group row">
          <label for="daily_foods" class="col-3 col-form-label">Food Items</label>
          <div class="col-9">
          <input type="text" v-model="data.sleep_time"
                    class="form-control"
                    name="daily_foods"
                    id="daily_foods"
                    aria-describedby="helpdaily_foods"
                    placeholder="daily_foods"
                    required>
                  <small id="helpdaily_foods" class="form-text text-muted">Night or day</small>
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
import { getsleep_time } from '@/models/sleep_time.js';
import toastr from 'toastr';
export default {
  data: () => ({
    Globals: Globals,
    sleep_time: [],
  }),
   methods: {
    async submit() {
      try {
        const m = await addsleep(this.data);
        this.newsleep_time = m;
        toastr.success("You've Successfully added your sleep time");
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
