// create a player reducer

const initialState = {
  // charts data
  charter() {

  },

  // holds player info searched for already
  searches: [],
  // holds initial list of players
  players: [],
  // are we currently fetching data
  fetching: false,
  // have we loaded the initial list of players
  dataLoaded: false,

};

export default function player(state = initialState, action) {
  switch (action.type) {
    case 'FETCHING_PLAYER':
      return Object.assign({}, state, {
        fetching: true,
      });
    case 'PLAYER_RECEIVED':
      console.log(action.player);
      console.log([...state.searches, action.player]);
      return Object.assign({}, state, {
        searches: [...state.searches, action.player],
        fetching: false,
      });
    case 'FETCHING_PLAYERS':
      return Object.assign({}, state, {
        fetching: true,
      });
    case 'RECEIVE_PLAYERS':
      console.log('players');
      console.log(action.json);
      return Object.assign({}, state, {
        players: [action.json],
        fetching: false,
        dataLoaded: true,
      });
    default:
      return state;
  }
}
