import ItemTile from '~/components/item-tile'

import { mapState, mapGetters } from 'vuex'

const itemsEndpoint = 'items/'

async function fetchItems (codes, baseURL) {
    const _fetchItem = async itemEntry => {
        try {
            const response = await fetch(itemEntry)
            const item = await response.json()
            return item
        } catch(error) {
            console.error(error)
            return null
        }
    }

    const endpoints = codes.map(code => baseURL + itemsEndpoint + `${code}.json`)

    const items = await Promise.all(endpoints.map(entry => _fetchItem(entry)))

    return items
}

export default {
    components: {
        'item-tile': ItemTile
    },

    // async asyncData({ store, app, req }) {
    //     const codes = store.getters['items/codes']

    //     const data = {
    //         itemsPerPage: 6
    //     }

    //     let host, protocol = 'http'

    //     if(process.server) {
    //         host = req.headers.host
    //         req.socket.secure && (protocol += 's')
    //         protocol += ':'
    //     } else if(process.client) {
    //         host = window.location.host
    //         protocol = window.location.protocol
    //     }

    //     const { base } = app.router.options

    //     const baseUrl = protocol + '//' + host + base

    //     return {
    //         ...data,
    //         items: await fetchItems(codes.slice(0, data.itemsPerPage), baseUrl)
    //     }
    // },

    data(component) {
        const codes = component.$store.getters['items/codes']

        const itemsPerPage = 6
        return {
            itemsPerPage,
            loading: true,
            items: codes.slice(0, itemsPerPage).map(code => require(`~/static/${itemsEndpoint + code}.json`))
        }
    },

    computed: {
        ...mapState('items', ['filter']),
        ...mapGetters('items', ['codes']),

        filteredItems() {
            return this.items.filter(item => ~this.codes.indexOf(item.code))
        }
    },

    mounted() {
        this.loading = false
        if (this.$refs.loader) {
            const observer = new IntersectionObserver(this.onLoaderIntersect.bind(this))
            observer.observe(this.$refs.loader)
        }

        // setInterval(() => {
        //     console.log('columnCount', this.$refs.tiles.style.columns)
        // }, 2000)
    },

    methods: {
        onLoaderIntersect(entries) {
            const entry = entries[0]

            if (entry && entry.isIntersecting) {
                this.loadMore()
            }
        },

        async loadMore() {
            this.loading = true

            try {
                const codes = this.codes
                    .filter(code => !this.items.some(item => item.code == code))
                    .slice(0, this.itemsPerPage)


                const { base } = this.$router.options
                const items = await fetchItems(codes, base)

                items.forEach(item => {
                    this.items.push(item)
                })

                this.items.sort((a, b) => {
                    a = parseInt(a.code), b = parseInt(b.code)
                    return a < b ? -1 : a > b ? 1 : 0
                })
            } catch(error) {
                console.error(error)
            }

            this.loading = false
        },

        splitItemsToColumns(items, n = 1) {
            const columns = items
                .reduce((columns, item, index) => {
                    index = index % n

                    if (!columns[index]) {
                        columns[index] = []
                    }

                    columns[index].push(item)

                    return columns
                }, new Array(n))
                // .reduce((items, column) => items.concat(column), [])

            return columns
        }
    }
}