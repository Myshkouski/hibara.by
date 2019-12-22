<template lang="pug">
    div
        item-tile.tile(v-for="i in limit" :key="i" :id="i")
        div(
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="100"
            )
</template>

<script>
    import ItemTile from '~/components/item-tile'
    import infiniteScroll from 'vue-infinite-scroll'

    export default {
        components: {
            'item-tile': ItemTile
        },

        directives: {
            'infinite-scroll': infiniteScroll
        },

        data() {
            return {
                itemsPerPage: 5,
                pageIndex: 1,
                loadingPage: true
            }
        },

        computed: {
            limit() {
                return this.pageIndex * this.itemsPerPage
            }
        },

        mounted() {
            this.loadingPage = false
        },

        methods: {
            loadMore() {
                // setTimeout(() => {
                    this.pageIndex++
                // }, 200)
            }
        }
    }
</script>

<style lang="sass">
    .tile:not(:first-child)
        margin-top: 2rem
</style>