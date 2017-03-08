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
        <search v-show='!comparison' :players='players'></search>
        <comparison v-show='comparison'></comparison>
      </div>

      <!-- Results Component -->
      <results :playerId='playerId' :searches='searches'></results>

    </div>
</template>

<script type="text/javascript">
    import VueJsonp from 'vue-jsonp';
    import Vue from 'vue';
    import Search from './Search';
    import Results from './Results';
    import Comparison from './Comparison';
    import store from '../store';
    import actions from '../actions/actions';
    
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
          comparison: false,
          searches: [],
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

          this.searches.push(this.playerId);
          console.log(this.searches);

          store.dispatch(actions.searchPlayer());
        },

        toggle() {
          this.comparison = !this.comparison;
        },

      },
    };


</script>

<style>

</style>
