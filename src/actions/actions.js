import fetchJsonp from 'fetch-jsonp';

const PLAYER_RECEIVED = 'PLAYER_RECEIVED';
const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
const FETCHING_PLAYER = 'FETCHING_PLAYER';
const FETCHING_PLAYERS = 'FETCHING_PLAYERS';

const actions = {
  // action to search for player using id
  searchPlayer(playerId) {
    return (dispatch) => {
      let playerProfileURL = 'http://stats.nba.com/stats/playerprofilev2?&PlayerID=';
      const playerProfileURL2 = '&PerMode=Totals';
      playerProfileURL += playerId + playerProfileURL2;

      dispatch(this.fetchingPlayer());

      fetchJsonp(playerProfileURL)
        .then(response => response.json())
        .catch((ex) => {
          console.log('parsing failed', ex);
        })
        .then((json) => {
          dispatch(this.playerReceived(json));
        });
    };
  },
  // action for once we have received a player
  fetchingPlayer() {
    return {
      type: FETCHING_PLAYER,
    };
  },
  // action for once we have received a player
  playerReceived(player) {
    return {
      type: PLAYER_RECEIVED,
      player,
    };
  },
  // action to get the initial list of players
  getPlayers() {
    return dispatch =>
      fetchJsonp('http://stats.nba.com/stats/commonallplayers?&LeagueID=00&Season=2016-17&IsOnlyCurrentSeason=0')
        .then(response => response.json())
        .then(json => json.resultSets[0].rowSet)
        .catch((ex) => {
          console.log('parsing failed', ex);
        })
        .then((players) => {
          dispatch(this.receivePlayers(players));
        });
  },
  // action for fetching initial list of players
  fetchingPlayers() {
    return {
      type: FETCHING_PLAYERS,
    };
  },
  // action for once we receive initial list of players
  receivePlayers(json) {
    console.log('receiving players');
    console.log(json);
    return {
      type: RECEIVE_PLAYERS,
      json,
    };
  },
};

export default actions;
