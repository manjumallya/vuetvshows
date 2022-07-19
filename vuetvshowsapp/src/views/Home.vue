<template>
    <div class="align-items-center flex-column d-flex">
        <h1 data-test="mytvshows">My Tv Shows</h1>
        <SearchBar @search="processChange" />
        <ShowsList></ShowsList>
    </div>
</template>

<script>
    import { useStore } from 'vuex'
    import SearchBar from '../components/search-bar'
    import ShowsList from '../components/shows-list'

    export default {
        name: 'HomeView',
        components: {
            SearchBar,
            ShowsList
        },
        setup() {
            const store = useStore()
            const handleSearch = (value) => {
                if (value && value.length > 0) {
                    store.dispatch('getTvShows', value)
                } else {
                    store.dispatch('getTvShows', '')
                }
            }
            const debounce = (func, timeout = 300) => {
                let timer;
                return (...args) => {
                    clearTimeout(timer)
                    timer = setTimeout(() => { func.apply(this, args); }, timeout)
                }
            }
            const processChange = debounce((value) => handleSearch(value));
            return {
                store,
                handleSearch,
                processChange
            }
        },
        created() {
            if (this.store.getters.viewShowName != '')
                this.store.dispatch('getTvShows', this.store.getters.viewShowName)
            else
                this.store.dispatch('getAllTvShows')
        }
    }
</script>