<template>
  <div class="shows col-12">
      <div class="card" v-for="tvshow in showsData" :key="tvshow.show.id">
          <h2>{{ tvshow.show.name }}</h2>
          <p>({{ tvshow.show.language }})</p>
          <h4>Rating : 
              <span v-if="tvshow.show.rating.average">{{ tvshow.show.rating.average }}</span>
              <span v-else>NA</span>
          </h4>
          <router-link :to="`/tvshow/${tvshow.show.id}/${tvShowKey}`">
              <button>View Tv Show</button>
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

<style>
    .shows {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        color: #2aeb74;
    }

    .shows .card {
        padding: 1rem;
        border-radius: 5px;
        margin: 1rem;
        background-color: #081c33;
    }

    .shows .card h2, p {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .shows .card p {
        font-size: 1.125rem;
        line-height: 1.4;
        margin-bottom: 1rem;
    }
</style>