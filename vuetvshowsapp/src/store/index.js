import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    tvshows: [],
    tvcast: [],
    viewShowName: '',
    apiUrl: 'https://api.tvmaze.com/search/shows',
  },
  mutations: {
    setTvShows(state, payload) {
      state.tvshows = payload
    },
    setTvCast(state, payload) {
      state.tvcast = payload
    },
    setViewShowName(state, payload) {
      state.viewShowName = payload
    },
  },
  actions: {
    async getTvShows({ state, commit }, genre) {
      try {
        let response = await axios.get(`${state.apiUrl}`, {
          params: {
            app_key: '1',
            q: genre,
          },
        })
        commit(
          'setTvShows',
          response.data.sort((first, second) =>
            first.show.rating.average > second.show.rating.average ? -1 : 1
          )
        )
        commit('setViewShowName', genre)
      } catch (error) {
        commit('setTvShows', [])
      }
    },
    async getCast({ commit }, showId) {
      try {
        let response = await axios.get(
          `https://api.tvmaze.com/shows/${showId}/cast`,
          {
            params: {
              app_key: '1',
            },
          }
        )
        commit('setTvCast', response.data)
      } catch (error) {
        commit('setTvCast', [])
      }
    },
  },
  getters: {
    tvshows: (state) => state.tvshows,
    tvcast: (state) => state.tvcast,
    viewShowName: (state) => state.viewShowName,
  },
})
