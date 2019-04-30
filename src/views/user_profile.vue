<template>
   <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link active" to="/updateProfile"> update_profile</router-link>
          </li>
        </ul>
        <div>
          <h1> My profile</h1>
              <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">weight</th>
                <th scope="col">height</th>
                <th scope="col">Birthday</th>
              </tr>
            </thead>
          </table>
          </div>
        </div>
    </div>
  </div>
</div>
</template>


<script>
import { Globals } from '@/models/api';
import { User_profile } from '@/models/user_profile.js';
export default {
  data: () => ({
    Globals: Globals,
    user_prfile: [],
  }),
  async mounted() {
    this.user_profile = await user_profile();
  },
};
</script>

<style>
</style>
