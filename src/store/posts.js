import { dataService } from '../services';

const defaultState = {
  posts: [],
  categoryId: 0
};

const inBrowser = typeof window !== 'undefined';
const state =
  inBrowser && window.__INITIAL_STATE__
    ? window.__INITIAL_STATE__.postsModule
    : defaultState;

const getters = {
  posts: state => state.posts
};

const actions = {
  updateCategory(context, categoryId) {
    return dataService
      .get(
        `https://api.fullstackweekly.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=6`
      )
      .then(res => {
        context.commit('updateCategory', { categoryId, posts: res.data });
      });
  }
};

const mutations = {
  updateCategory(state, category) {
    state.categoryId = category.categoryId;
    state.posts = category.posts;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
