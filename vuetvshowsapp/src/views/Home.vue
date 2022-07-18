<template>
  <div class="home">
    <h1 data-test="mytvshows">My Tv Shows</h1>
    <SearchBar @search="handleSearch"/>
    <ShowsList></ShowsList>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import SearchBar from '../components/search-bar'
import ShowsList from '../components/shows-list'

export default {
  name: 'HomeView',
  components : {
    SearchBar,
    ShowsList
  },
  setup () {
    const store = useStore()
    const handleSearch = (value) => {
      if(value && value.length > 0) {
          store.dispatch('getTvShows', value)
      } else {
          store.dispatch('getTvShows', '')
      }
    }
    return {
      store,
      handleSearch
    }
  },
  created() {
      this.store.dispatch('getTvShows', this.store.getters.viewShowName)
  }
}
</script>

<style>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 32px;
}
</style>