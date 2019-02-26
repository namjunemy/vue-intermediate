import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if (sessionStorage.length > 0) {
      for (let i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i) !== 'loglevel:webpack-dev-server') {
          arr.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
        }
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch(),
  },
  mutations: {
    addOneItem(state, todoItem) {
      const obj = {completed: false, item: todoItem};
      sessionStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
      sessionStorage.removeItem(payload.todoItem.item);
      state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
      state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
      sessionStorage.removeItem(payload.todoItem.item);
      sessionStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    clearAll(state) {
      state.todoItems = [];
      sessionStorage.clear();
    },
  },
});
