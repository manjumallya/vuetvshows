<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="px-3 collapse navbar-collapse" id="navbarSupportedContent">
            <a class="navbar-brand" href="#">
                <router-link to="/">Go to Home</router-link>
            </a>
        </div>
    </nav>
    <router-view />
</template>

<script>

    export default {
        name: 'App',
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Fira Sans', sans-serif;
    }

    a {
        color: #2aeb74 !important;
    }

    button {
        background-color: #2aeb74;
    }
</style>
