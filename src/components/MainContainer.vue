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

      <!-- Results Component -->
      <results></results>

    </div>
</template>

<script type="text/javascript">
    import VueJsonp from 'vue-jsonp';
    import Vue from 'vue';
    import * as d3 from 'd3';
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
        function getPlayers() {
          console.log(this.players[0]);
          do {
            store.dispatch(actions.getPlayers())
              .then(() => {
                console.log('PLAYERS: ');
                console.log(this.players);
              });
          } while (this.players === undefined);
        }

        const exec = getPlayers.bind(this);
        exec();
      },
      methods: {

        search(name, statSelected) {
          // search players object for specific player and get id
          const player = this.players[0].filter(
            p => p[2].toLowerCase() === name.toLowerCase(),
          );
          if (player.length !== 0 && statSelected !== '') {
            store.dispatch(actions.searchPlayer(player[0][0]))
              // get data to be used for visualizations
              .then(() => {
                // data to be used for d3 visualization
                const json = this.searches[this.searches.length - 1];
                const data = [];
                const regSeasonTotals = json.resultSets.find(totals => totals.name === 'SeasonTotalsRegularSeason');
                const statIndex = regSeasonTotals.headers.findIndex(stat => stat === statSelected);

                // pushes intended stats to data array
                regSeasonTotals.rowSet.forEach((element) => {
                  data.push(element[statIndex]);
                });

                return data;
              })
              .then((dataset) => {
                console.log(dataset);
                console.log('about to make svg');
                // creates svg element to put circles in
                const svg = d3
                  .select('body')
                  .selectAll('div.container')
                  .append('svg')
                  .attr('width', '100%')
                  .attr('height', '100px')
                  .attr('id', 'chart');
                console.log('svg made');
                const padding = 40;
                let w = parseInt(d3.select('#chart').style('width'), 10);
                const maxDomain = (dataset.length * 50) + 100;

                // Creates proper scales for width of all circles height of svg using radius
                const xScale = d3.scaleLinear()
                  .domain([0, maxDomain])
                  .range([padding, w - padding]);

                // scales and axes
                const rScale = d3.scaleLinear()
                  .domain([0, 1])
                  .range([0, w / dataset.length]);

                const circles = svg.selectAll('circle')
                  .data(dataset)
                  .enter()
                  .append('circle')
                  .attr('cx', (d, i) => xScale((i * 50) + 100))
                  .attr('cy', '50%')
                  .attr('r', d => rScale(d));

                function resize() {
                  // update width
                  w = parseInt(d3.select('#chart').style('width'), 10);
                  // reset x range
                  xScale.range([padding, w - padding]);
                  rScale.range([0, w / dataset.length]);

                  circles.attr('cx', (d, i) => xScale((i * 50) + 100))
                          .attr('cy', '50%')
                          .attr('r', d => rScale(d));
                }

                d3.select(window).on('resize', resize);
              });
          } else if (statSelected === '') {
            alert('Must select a statistic!');
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
