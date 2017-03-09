<template>
    <div>

      <div class="ui centered card">
        <button class="ui basic button" @click='toggle'>Toggle Query Type</button>
      </div>

      <div v-if='fetching'>
        Loading...
      </div>

      <!-- Loading Content -->
      <div v-if='!dataLoaded' v-bind:style="styles.styleContainer">
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

      {{ searches }}

      <!-- Results Component -->
      <results></results>

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
    import styleContainer from '../styles/container';
    
    Vue.use(VueJsonp);

    export default {
      components: {
        Search,
        Results,
        Comparison,
      },
      data() {
        return {
          fetching: this.$select('fetching'),
          dataLoaded: this.$select('dataLoaded'),
          error: false,
          players: this.$select('players'),
          comparison: false,
          searches: this.$select('searches'),
          styles: {
            styleContainer,
          },
        };
      },
      mounted() {
        // const that = this;
        async function getPlayers() {
          await store.dispatch(actions.getPlayers());
          console.log('PLAYERS: ');
          console.log(this.players);
        }

        const exec = getPlayers.bind(this);
        exec();
      },
      methods: {

        search(name) {
          // search players object for specific player
          console.log(this.players);
          const player = this.players[0].filter(
            p => p[2].toLowerCase() === name.toLowerCase(),
          );
          if (player.length !== 0) {
            // console.log(player[0][0]);
            store.dispatch(actions.searchPlayer(player[0][0]));
          } else {
            alert('Player not found!');
          }
        },

        toggle() {
          this.comparison = !this.comparison;
        },

      },
    };

</script>

<style>

</style>
