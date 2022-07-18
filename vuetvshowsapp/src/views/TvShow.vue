<template>
	<div class="show">
		<router-link to="/">&lt; Back</router-link>
		<br />
		<hr />
		
		<div class="details mt-4">
			<h3>Details</h3>
			<div class="d-flex flex-column align-items-end">
				<img v-if="tvshow.show.image" class="topic-thumbnail"
					 alt="tvshow"
					 :src="tvshow.show.image.original" />
			</div>
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
.show {
	padding: 1rem;
	max-width: 768px;
	margin: 0 auto;
}

hr {
	margin-bottom: 1rem;
}

h3 {
	margin-bottom: 1rem;
}

    .details {
        padding: 1rem;
        background-color: #081c33;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        color: #2aeb74;
    }

        .details ul li {
            list-style-position: inside;
            line-height: 1.4;
            margin-bottom: 1rem;
        }

.method ol li {
	margin-bottom: 2rem;
	padding-bottom: 1rem;
	list-style-position: inside;
	border-bottom: 1px solid #EEE;
}

.topic-thumbnail {
  margin-right: 15px;
  height: 120px;
  width: 120px;
  overflow: hidden;
}

</style>