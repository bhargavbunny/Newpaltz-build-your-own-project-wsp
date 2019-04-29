<style>
    #heading { color: #800080; }
  </style>

<template>
  <div class="row">
    <div class="col">
      <div class="home">
    <div class="jumbotron">
   
      <h1 id="heading">This is {{name}}'s page. He is {{age}} years old </h1>
      <h2 id="heading">It's a basic Exercise app with Vue and node.js </h2>
      <h3 id="heading">mail-id: bhargavreddy1994u@gmail.com </h3>
      <input v-model="age" type="text" class="form-control" placeholder="Age" />
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="{width: age + '%'}"></div>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    data: ()=> ({
      name: "Bhargav Reddy konapalli",
      age: 25
    })
}
</script>

<style type="scss">

</style>

