import Vue from 'vue';
import Revue from 'revue';
import { createStore } from 'redux';
// create the logic how you would update the todos
import reducer from './reducers/reducers';
// create some redux actions
import * as actions from './actions/actions';

// create a redux store
const reduxStore = createStore(reducer);
// binding the store to Vue instance, actions are optional
const store = new Revue(Vue, reduxStore, actions);
// expose the store for your component to use
export default store;
