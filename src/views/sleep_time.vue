<template>
  <form>
  <div class="form-group">
    <label for="date">enter date</label>
    <input type="date" class="form-control" id="date" aria-describedby="dateHelp" placeholder="Enter date">
  </div>
  <div class="form-group">
    <label for="type">day time sleep or night time</label>
    <input type="text" class="form-control" id="day/night" placeholder="sleep time">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>     
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
