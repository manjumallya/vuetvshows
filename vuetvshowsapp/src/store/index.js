import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        tvshows: [],
        tvcast: [],
        allTvShows: [],
        viewShowName: '',
        apiUrl: 'https://api.tvmaze.com/search/shows',
        allShowsUrl: 'https://api.tvmaze.com/shows?page=1',
        loading: true,
    },
    mutations: {
        setTvShows(state, payload) {
            state.tvshows = payload
        },
        setAllTvShows(state, payload) {
            state.allTvShows = payload
        },
        setTvCast(state, payload) {
            state.tvcast = payload
        },
        setViewShowName(state, payload) {
            state.viewShowName = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        }
    },
    actions: {
        async getTvShows({ state, commit }, genre) {
            try {
                commit('setLoading', true)
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
                commit('setLoading', false)
            } catch (error) {
                commit('setTvShows', [])
            }
        },
        async getAllTvShows({ state, commit }) {
            try {
                commit('setLoading', true)
                let response = await axios.get(`${state.allShowsUrl}`, {
                    params: {
                        app_key: '1',
                    },
                })
                commit(
                    'setAllTvShows',
                    response.data.sort((first, second) =>
                        first.rating.average > second.rating.average ? -1 : 1
                    )
                )
                commit('setLoading', false)
                commit('setViewShowName', '')
            } catch (error) {
                commit('setAllTvShows', [])
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
        alltvshows: (state) => state.allTvShows,
        tvcast: (state) => state.tvcast,
        viewShowName: (state) => state.viewShowName,
        isLoading: (state) => state.loading
    },
})
