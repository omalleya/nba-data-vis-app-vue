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
      <results></results>

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
            console.log(this.dataLoaded);
            this.dataLoaded = true;
            console.log(this.dataLoaded);
            console.log(this.players);
            console.log(json);
            return json;
          }).catch((err) => {
            // Failed.
            this.error = true;
            console.log(err);
            return err;
          });
      },
    };


</script>

<style>

</style>
