<template>
  <div class="ui centered card">

    <!-- Search -->
    <div class="content">
      <label class="header" for="search">Search</label>
    </div>

    <!-- Select Stat Dropdown -->
    <div class="content">
      <div class='ui form'>
          <div class='field'>
            <label for="stat-select">Select Stat to Visualize</label>
            <select class="ui fluid dropdown" v-model='stat' id="stat-select">
              <option value="FG3_PCT">Career 3 Point</option>
              <option value="AST">Career Assists</option>
            </select>
          </div>
      </div>
    </div> 

    <!-- Search by Player Name -->
    <div class="content">
      <div class='ui form'>
        <div class='field'>
          <label>Player Name</label>
          <input type='text' @keyup.enter="getData" v-model="name">
        </div>
        <button class="ui primary basic button" v-bind:disabled='fetching' @click="getData">Search</button>
      </div>
    </div>
    
  </div>
</template>

<script type="text/javascript">

  export default {
    props: ['players'],

    data() {
      return {
        name: '',
        stat: '',
        fetching: this.$select('fetching'),
      };
    },

    components: {
    },

    methods: {
      getData() {
        // call parent function
        this.$parent.search(this.name, this.stat);
      },
    },
  };
</script>

<style>
</style>
