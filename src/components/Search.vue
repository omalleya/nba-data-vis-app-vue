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
            <select class="ui fluid dropdown" id="stat-select">
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
          <input type='text' v-model="name">
        </div>
        <button class="ui primary basic button" v-on:click="getData">Search</button>
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
        playerId: '',
      };
    },

    components: {
    },

    methods: {
      getData() {
        const name = this.name;

        // search players object for specific player
        const player = this.players.resultSets[0].rowSet.filter(
          p => p[2].toLowerCase() === name.toLowerCase(),
        );
        if (player.length !== 0) {
          console.log(player);
          this.playerId = player[0][0];
        } else {
          alert('Player not found!');
        }
      },
    },
  };
</script>

<style>
</style>
