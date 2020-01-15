import { mapState, mapMutations } from 'vuex'
import Item from '~/mixins/item'
import LazyImage from 'v-lazy-image'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'

const clientOnlyComponents = process.browser ? (function ({ swiper, swiperSlide }) {
    return {
        'swiper': swiper,
        'slide': swiperSlide
    }
})(require('vue-awesome-swiper').default) : {}

export default {
    components: {
        ...clientOnlyComponents,
        // 'swiper': swiper,
        // 'slide': swiperSlide,
        'lazy-img': LazyImage
    },

    mixins: [
        Item
    ],

    data() {
        return {
            more: false,
            entriesShownByDefault: 2,
            swiper: null
        }
    },

    mounted() {
        this.swiper = {
            navigation: {
                prevEl: this.$refs['button-prev'],
                nextEl: this.$refs['button-next']
            }
        }
    },

    computed: {
        ...mapState('items', ['favorite']),

        expandableStyle() {
            const style = { 'padding-bottom': 0 }

            if (this.more) {
                const el = this.$refs['extra-properties-list']
                style['padding-bottom'] = window.getComputedStyle(el).height
            }

            return style
        },

        isFavorite() {
            return !!~this.favorite.indexOf(this.item.code)
        },
    },

    methods: {
        ...mapMutations('items', ['addFavorite', 'deleteFavorite']),
        toggleMore() {
            this.more = !this.more
        },

        getMoreItemDescriptionEntries(entries) {
            return entries.slice(1)
        },

        createSrcSet(source) {
            const { base } = this.$router.options
            return source.map(({
                filename,
                w
            }) => base + 'img/' + filename + (w ? ' ' + w + 'w' : '')).join(',')
        },

        fav() {
            if (this.isFavorite) {
                this.deleteFavorite(this.item.code)
            } else {
                this.addFavorite(this.item.code)
            }
        }
    }
}