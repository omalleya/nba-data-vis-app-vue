import Vue from 'vue';
import Revue from 'revue';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// create the logic how you would update the todos
import reducer from './reducers/reducers';
// create some redux actions
import * as actions from './actions/actions';

// create a redux store
function configureStore() {
  return createStore(
      reducer,
      applyMiddleware(
          thunkMiddleware,
      ),
  );
}
// binding the store to Vue instance, actions are optional
const store = new Revue(Vue, configureStore(), actions);
// expose the store for your component to use
export default store;
