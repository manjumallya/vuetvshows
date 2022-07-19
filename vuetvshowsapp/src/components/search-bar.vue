<template>
    <div class="mt-5">
        <div>
            <div class="col-xs-12 text-center">
                <h3 class="mb-4">
                    Search for a tv show/genre
                </h3>
                <input @change="onChange"
                       @input="onChange"
                       v-model="searchText"
                       class="form-control"
                       type="text"
                       placeholder="Search for the tv show.." />
            </div>
        </div>
    </div>
</template>
<script>
    import { useStore } from "vuex";
    export default {
        name: 'SearchBar',
        data: () => {
            return {
                searchText: ''
            };
        },
        setup(props, context) {
            const store = useStore();
            const onChange = (event) => {
                context.emit("search", event.target.value);
            }
            return {
                onChange,
                store
            }
        },
        mounted() {
            this.searchText = this.store.getters.viewShowName
        }
    };
</script>