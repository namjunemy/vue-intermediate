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
    todoItems: storage.fetch()
  },
});
