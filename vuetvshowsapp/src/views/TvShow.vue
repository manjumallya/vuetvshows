<template>
	<div class="p-2">
		<router-link to="/">&lt; Back</router-link>
		<br />
		<hr />
		
		<div class="details p-2 bg-dark mt-4 rounded-3">
			<h3>Details</h3>
			<div class="row">
				<div class="col-6">
					<h4><a :href="tvshow.show.url" target="_blank">Show info</a></h4>
					<h4>Premiere:</h4>
					<h5>start: {{ tvshow.show.premiered}}</h5>
					<h5>end: {{ tvshow.show.ended}}</h5>
					<br />
					<h4 v-if="tvshow.show.schedule">schedule:</h4>
					<h5 v-if="tvshow.show.schedule.time">time: {{ tvshow.show.schedule.time}}</h5>
					<div v-for="day in tvshow.show.schedule.days" :key="day">
						<h5>{{ day}}</h5>
					</div>
				</div>
				<div class="col-6 d-flex flex-column align-items-end">
					<img v-if="tvshow.show.image" class="topic-thumbnail"
						 alt="tvshow"
						 :src="tvshow.show.image.original" />
				</div>

			</div>
			<hr /> 
			<h5 class="mt-4" v-html="tvshow.show.summary"></h5>
			<hr />
			<div class="col-12 row">
				<h4>Cast:</h4>
				<div v-for="cast in tvcast" :key="cast.person.id" class="col-4 mt-4">
					<img v-if="cast.person.image.original"
						 alt="tvcast-{{ cast.person.id}}"
						 :src="cast.person.image.medium" />
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { useStore } from "vuex";
	import { computed } from "vue";
    import { useRoute } from 'vue-router'
export default {
	name: 'ShowView',
    setup() {
		const store = useStore();
        const route = useRoute()

		return {
			tvshow: computed(() => {
				return store.getters.tvshows.find(tvshow => tvshow.show.id == route.params.id)
			}),
			tvcast: computed(() => {
				return store.getters.tvcast
			}),
			store
		}
    },
	created() {
		if(this.tvshow === undefined)
			this.store.dispatch('getTvShows', this.$route.params.tvShowKey);
        this.store.dispatch('getCast', this.$route.params.id)
	}
}
</script>

<style>
.details {
    color: #2aeb74;
}

.topic-thumbnail {
  margin-right: 15px;
  width: 36%;
  height: 85%;
  overflow: hidden;
}

</style>