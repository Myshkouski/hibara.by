<template lang="pug">
    div.tile(v-if="item")
        swiper.swiper(:pagination="true")
            slide.slide(v-for="(img, index) in item.media.img" :key="index")
                img(:srcset="createSrcSet(img)")
        div.description
            h3 {{ item.title | uppercase }}
            div(v-for="(desc, index) in item.description" :key="index")
                span {{ desc[0] }}
                span : 
                span {{ desc[1] }}
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import Item from '~/mixins/item'
    
    export default {
        props: ['id'],

        components: {
            'swiper': swiper,
            'slide': swiperSlide
        },

        filters: {
            uppercase(string) {
                return string.toUpperCase()
            }
        },

        mixins: [
            Item
        ],

        methods: {
            createSrcSet(source) {
                return source.map(({ filename, w }) => '/img/' + filename + (w ? ' ' + w + 'w' : '')).join(',')
            }
        }
    }
</script>

<style lang="sass" scoped>
    .tile
        width: 90vw
        max-width: 500px
        margin: 1rem auto
        border-radius: 1rem
        overflow: hidden
        box-shadow: 0 0 .5rem .5rem rgba(0, 0, 0, .15)
        background-color: #eee
        // transition-property: width border-radius
        // transition-duration: .25s

        @media screen and (prefers-color-scheme: dark)
            background-color: #333
            box-shadow: 0 0 .5rem .5rem rgba(0, 0, 0, .25)

        .description
            padding: 1rem
        
            h3
                font-weight: bolder
        // &:hover
        //     width: 100%
        //     border-radius: 0

    .swiper
        position: relative
        overflow: hidden
        width: 100%

    ::v-deep .swiper > .swiper-wrapper
        display: flex
        width: 100%
        height: 100%

    .slide
        min-width: 100%
        overflow: hidden
        height: 300px
        cursor: pointer

    img
        object-fit: cover
        object-position: center
        width: 100%
        height: 100%
        user-select: none
</style>