// const searchPlayer = () => {
//   console.log('action');
//   return { type: 'SEARCH_PLAYER' };
// };

// export default searchPlayer;

const SEARCH_PLAYER = 'SEARCH_PLAYER';

const actions = {
  searchPlayer() {
    return { type: SEARCH_PLAYER };
  },
};

export default actions;
