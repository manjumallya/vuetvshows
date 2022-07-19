<template>
        <h2>{{ name }}</h2>
        <p>({{ language }})</p>
        <h4>
            Rating :
            <span v-if="average">{{average }}</span>
            <span v-else>NA</span>
        </h4>
        <router-link :to="`/tvshow/${id}/${showKey}`">
            <button class="py-2 px-3">View Tv Show</button>
        </router-link>
</template>
<script>
    export default {
        name: "ShowsComponent",
        props: {
            name: {
                type: String,
            },
            language: {
                type: String,
            },
            rating: {
                type: Number,
            },
            id: {
                type: String,
            },
            showKey: {
                type: String,
            },
        },
    };
</script>