<template>
  <div class="shows row col-12">
      <div style="color: #2aeb74;" class="card col-3 p-4 m-4 bg-dark" v-for="tvshow in showsData" :key="tvshow.show.id">
          <h2>{{ tvshow.show.name }}</h2>
          <p>({{ tvshow.show.language }})</p>
          <h4>Rating : 
              <span v-if="tvshow.show.rating.average">{{ tvshow.show.rating.average }}</span>
              <span v-else>NA</span>
          </h4>
          <router-link :to="`/tvshow/${tvshow.show.id}/${tvShowKey}`">
              <button class="py-2 px-3">View Tv Show</button>
          </router-link>
      </div>
  </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: 'ShowsList',
  setup () {
    const store = useStore();
    return {
        showsData: computed(() => store.getters.tvshows),
        tvShowKey: computed(() => store.getters.viewShowName)
    }
  }
}
</script>