
import { mapState, mapGetters, mapMutations } from 'vuex'

const scrollOptions = { behavior: 'smooth' }

export default {
    head() {
        return {
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
                // { name: 'og:url', property: 'og:url', content: 'https://myshkouski.github.io/tetris-challenge/' },
                // { name: 'og:image', property: 'og:image', content: 'https://myshkouski.github.io/tetris-challenge/qr-code.png' }
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: require('~/assets/img/favicon.png') },
            ],
            script: [
                // { src: 'metrika.js' }
            ]
        }
    },

    data() {
        return {
            isMenuActive: false,
            buttonScrollTopText: this.getButtonScrollTopText(this.buttonScrollTopState),
            contacts: {
                email: 'alexeimyshkouski@gmail.com',
                tg: 'alexeimyshkouski',
                tel: '375293911854'
            }
        }
    },

    computed: {
        ...mapState('ui', ['isScrollTopActive', 'savedScrollPosition']),
        ...mapState('items', ['favorite']),
        ...mapGetters('items', ['tags', 'tagFilter']),

        buttonScrollTopState() {
            let state = 'hidden'

            if (this.savedScrollPosition) {
                state = 'down'
            }

            if (this.isScrollTopActive) {
                state = 'up'
            }

            if(this.isMenuActive) {
                state = 'hidden'
            }

            return state
        },

        tagNames() {
            return new Map([
                [1, 'дома'],
                [0, 'другое']
            ])
        },

        emailHref() {
            const endpoint = 'mailto:' + this.contacts.email
            const params = {}

            if (this.favorite) {
                params.body = 'Интересно узнать о проектах ' + this.favorite.join(', ') + '.'
            }

            return endpoint + '?' + Object.entries(params)
                .map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(value)])
                .map(entry => entry.join('='))
                .join('&')
        }
    },

    watch: {
        buttonScrollTopState(value, old) {
            this.buttonScrollTopText = this.getButtonScrollTopText(value == 'hidden' ? old : value)
        },

        isMenuActive(active) {
            if(active) {
                this.scrollTimeout = null
                this.scrollListener = () => {
                    if (this.scrollTimeout) {
                        clearTimeout(this.scrollTimeout)
                        this.scrollTimeout = null
                    }

                    this.scrollTimeout = setTimeout(() => {
                        this.scrollToNav()
                    }, 50)
                    
                }
                this.scrollListener()
                window.addEventListener('scroll', this.scrollListener)
            } else {
                const removed = window.removeEventListener('scroll', this.scrollListener)
                console.log('remove listener', removed)
            }
        }
    },

    methods: {
        ...mapMutations('items', ['addTagFilter', 'deleteTagFilter']),

        setNavObserver() {
            const { nav } = this.$refs
            const observer = new IntersectionObserver(entries => {
                const { isIntersecting } = entries[0]
                this.$store.commit('ui/scrollTopActive', !isIntersecting)
            }, {
                rootMargin: Array(4).fill('10%').join(' ')
            })
            observer.observe(nav)
        },

        scrollTop() {
            let { buttonScrollTopState, savedScrollPosition } = this

            if (buttonScrollTopState == 'down') {
                window.scrollTo({
                    ...savedScrollPosition,
                    ...scrollOptions
                })
                
                savedScrollPosition = null
            } else if (buttonScrollTopState == 'up') {
                savedScrollPosition = {
                    left: window.scrollX,
                    top: window.scrollY
                }

                this.scrollToNav()
            }

            this.$store.commit('ui/savedScrollPosition', savedScrollPosition)
        },

        scrollToNav(options = scrollOptions) {
            this.$refs['nav'].scrollIntoView(options)
        },

        getButtonScrollTopText(state) {
            let text = ''
            
            if (state == 'up') {
                text = 'наверх'
            } else if (state == 'down') {
                text = 'вниз'
            }

            return text
        },

        setCssVars() {
            
        }
    },

    mounted() {
        this.setNavObserver()
        
        // console.log(document.readyState)
    }
}