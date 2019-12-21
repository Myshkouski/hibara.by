import dotenv from 'dotenv'

dotenv.config()

export default {
    build: {
        parallel: true,
        // cache: true,
        // optimizeCSS: true,
        extractCSS: true
    },

    generate: {
        dir: 'docs'
    },

    router: {
        base: process.env.NODE_ENV == 'production' ? process.env.ROUTER_BASE || '/' : '/'
    }
}