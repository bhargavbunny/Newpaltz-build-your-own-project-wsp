<template>
  <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="email" class="form-control" id="Name" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="text" class="form-text text-muted">enter your name</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Birthday</label>
    <input type="date" class="form-control" id="Birthday" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Weight</label>
    <input type="text" class="form-control" id="Weight" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">height</label>
    <input type="text" class="form-control" id="Height" placeholder="Password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</template>

<script>
import { Globals } from '@/models/api';
import { user_profile } from '@/models/user_profile';
import toastr from 'toastr';
export default {
  data: () => ({
    data: {},
    newuser_profile: null,
  }),
  methods: {
    async submit() {
      try {
        const m = await updateprofile(this.data);
        this.user_profile = m;
        toastr.success("You've Successfully updated your profile");
      } catch (error) {
        Globals.errors.push(error);
        toastr.error(error.message);
      }
    },
  },
};
</script>

