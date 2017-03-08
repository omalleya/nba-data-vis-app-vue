// create a player reducer
export default function player(state = 0, action) {
  switch (action.type) {
    case 'SEARCH_PLAYER':
      return state + 1;
    default:
      return state;
  }
}
