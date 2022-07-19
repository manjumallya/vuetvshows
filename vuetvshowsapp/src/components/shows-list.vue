<template>
    <div>
        <loading :active="isLoading"
                 :can-cancel="true"
                 :is-full-page="fullPage">
        </loading>
        <div class="shows row col-12" v-if="tvShowKey != ''">
            <div style="color: #2aeb74;" class="card col-3 p-4 m-4 bg-dark align-items-centre" v-for="tvshow in showsData" :key="tvshow.show.id">
                <ShowsComponent :name="tvshow.show.name"
                                :language="tvshow.show.language"
                                :rating="tvshow.show.rating.average"
                                :id="tvshow.show.id"
                                :showKey="tvshow.show.name"
                                :image="tvshow.show.image"></ShowsComponent>
             </div>
        </div>
            <div class="shows row col-12" v-else>
                <div style="color: #2aeb74;" class="card col-3 p-4 m-4 bg-dark" v-for="tvshow in allShowsData" :key="tvshow.id">
                    <ShowsComponent :name="tvshow.name"
                                    :language="tvshow.language"
                                    :rating="tvshow.rating.average"
                                    :id="tvshow.id"
                                    :showKey="tvshow.name"
                                    :image="tvshow.image"></ShowsComponent>
                </div>
            </div>
        </div>
</template>

<script>
    import { computed } from "vue"
    import { useStore } from "vuex"
    import Loading from "vue-loading-overlay"
    import ShowsComponent from './shows'
    export default {
        name: 'ShowsList',
        data() {
            return {
                fullPage: true,
            };
        },
        components: {
            Loading,
            ShowsComponent
        },
        setup() {
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
<style>
    .topic-thumbnail {
        margin-right: 15px;
        width: 36%;
        height: 85%;
        overflow: hidden;
    }
</style>