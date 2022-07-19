<template>
    <div>
        <loading :active="isLoading"
                 :can-cancel="true"
                 :is-full-page="fullPage">
        </loading>
        <div class="shows row col-12" v-if="tvShowKey != ''">
            <div style="color: #2aeb74;width: 100%" class="card col-3 p-4 m-4 bg-dark" v-for="tvshow in showsData" :key="tvshow.show.id">
                <h2>{{ tvshow.show.name }}</h2>
                <p>({{ tvshow.show.language }})</p>
                <h4>
                    Rating :
                    <span v-if="tvshow.show.rating.average">{{ tvshow.show.rating.average }}</span>
                    <span v-else>NA</span>
                </h4>
                <router-link :to="`/tvshow/${tvshow.show.id}/${tvShowKey}`">
                    <button class="py-2 px-3">View Tv Show</button>
                </router-link>
            </div>
        </div>
        <div class="shows row col-12" v-else>
            <div style="color: #2aeb74;" class="card col-3 p-4 m-4 bg-dark" v-for="tvshow in allShowsData" :key="tvshow.id">
                <h2>{{ tvshow.name }}</h2>
                <p>({{ tvshow.language }})</p>
                <h4>
                    Rating :
                    <span v-if="tvshow.rating.average">{{ tvshow.rating.average }}</span>
                    <span v-else>NA</span>
                </h4>
                <router-link :to="`/tvshow/${tvshow.id}/${tvshow.name}`">
                    <button class="py-2 px-3">View Tv Show</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from "vue";
    import { useStore } from "vuex";
    import Loading from "vue-loading-overlay";
    


export default {
        name: 'ShowsList',
        data() {
            return {
                fullPage: true,
            };
        },
        components: {
            Loading,
        },
  setup () {
    const store = useStore();
    return {
        showsData: computed(() => store.getters.tvshows),
        tvShowKey: computed(() => store.getters.viewShowName),
        allShowsData: computed(() => store.getters.alltvshows),
        isLoading: computed(() => store.getters.isLoading)
    }
  }
}
</script>