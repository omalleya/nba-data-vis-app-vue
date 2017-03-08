<template>
    <div>

      <div class="ui centered card">
        <button class="ui basic button" @click='toggle'>Toggle Query Type</button>
      </div>

      <!-- Loading Content -->
      <div v-if='!dataLoaded' class="ui centered card">
        <div v-if='!error' class="content">
          Loading content
        </div>
        <div v-else class="content">
          Failed to load properly
        </div>
      </div>

      <!-- Search Component -->
      <div v-else>
        <search v-show='search' :players='players'></search>
        <comparison v-show='!search'></comparison>
      </div>

      <!-- Results Component -->
      <results :playerId='playerId'></results>

    </div>
</template>

<script>
    import VueJsonp from 'vue-jsonp';
    import Vue from 'vue';
    import Search from './Search';
    import Results from './Results';
    import Comparison from './Comparison';
    
    Vue.use(VueJsonp);

    export default {
      components: {
        Search,
        Results,
        Comparison,
      },
      data() {
        return {
          dataLoaded: false,
          error: false,
          players: {},
          playerId: '',
          search: true,
        };
      },
      mounted() {
        console.log(this.dataLoaded);
        // TODO use object to send query params
        // gets initial object of players with ids
        Vue.jsonp('http://stats.nba.com/stats/commonallplayers?&LeagueID=00&Season=2016-17&IsOnlyCurrentSeason=0')
          .then((json) => {
            // Success.
            this.players = json;
            this.dataLoaded = true;
          }).catch(() => {
            // Failed.
            this.error = true;
          });
      },
      methods: {
        search(playerArray, name) {
          // search players object for specific player
          const player = playerArray.filter(
            p => p[2].toLowerCase() === name.toLowerCase(),
          );
          if (player.length !== 0) {
            this.playerId = player[0][0];
          } else {
            alert('Player not found!');
          }
        },
        toggle() {
          this.search = !this.search;
        },
      },
    };


</script>

<style>

</style>
