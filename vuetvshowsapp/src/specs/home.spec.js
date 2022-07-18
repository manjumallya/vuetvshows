import { mount } from '@vue/test-utils'
import Home from '../views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../router/index'
import axios from 'axios'
import Vuex from 'vuex'
import SearchBar from '../components/search-bar'
import ShowsList from '../components/shows-list'

jest.mock('axios')
const shows = [
  {
    show: {
      id: 1,
      name: 'Girls',
      language: 'English',
      rating: {
        average: 6.0,
      },
    },
  },
]
const resp = { data: shows }
jest.spyOn(axios, 'get').mockResolvedValue(shows)

describe('Home.vue', () => {
  let store
  let actions
  let state
  let getters
  let wrapper
  let router
  const tvshowsMock = jest.fn()
  tvshowsMock.mockReturnValue(shows)
  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })
    state = { data: { tvshows: [] } }
    actions = {
      getTvShows: jest.fn(),
    }
    jest.spyOn(actions, 'getTvShows').mockResolvedValue(shows)
    getters = {
      tvshows: tvshowsMock,
    }
    store = new Vuex.Store({
      state,
      actions,
      getters,
    })
    wrapper = mount(Home, {
      global: {
        provide: {
          store: store,
        },
        plugins: [router],
      },
    })
    jest.spyOn(wrapper.vm, 'handleSearch').mockResolvedValue(shows)
  })

  test('Home component', () => {
    const myTvShows = wrapper.get('[data-test=mytvshows]')
    expect(myTvShows.text()).toBe('My Tv Shows')
    expect(actions.getTvShows.mock.calls).toHaveLength(1)
  })

  test('check if child SearchBar component exists', async () => {
    expect(wrapper.getComponent(SearchBar)).toBeDefined()
    expect(actions.getTvShows.mock.calls).toHaveLength(1)
    wrapper.vm.handleSearch('Girls')
    expect(actions.getTvShows.mock.calls).toHaveLength(1)
  })

  test('check if child Shows List component exists', () => {
    expect(wrapper.getComponent(ShowsList)).toBeDefined()
  })
})
