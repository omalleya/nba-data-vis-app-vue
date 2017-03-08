<template>
    <div>

      <!-- Loading Content -->
      <div v-if='!dataLoaded' class="ui centered card">
        <div v-if='!error' class="content">
          Loading content
        </div>
        <div v-if='error' class="content">
          Failed to load properly
        </div>
      </div>

      <!-- Search Component -->
      <search v-if='dataLoaded' :players='players'></search>

      <!-- Results Component -->
      <results :playerId='playerId'></results>

    </div>
</template>

<script>
    import VueJsonp from 'vue-jsonp';
    import Vue from 'vue';
    import Search from './Search';
    import Results from './Results';
    
    Vue.use(VueJsonp);

    export default {
      components: {
        Search,
        Results,
      },
      data() {
        return {
          dataLoaded: false,
          error: false,
          players: {},
          playerId: '',
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
      },
    };


</script>

<style>

</style>
