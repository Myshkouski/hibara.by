import dotenv from 'dotenv'

dotenv.config()

export default {
    server: {
        host: '0.0.0.0',
        timing: process.env.NODE_ENV == 'development'
    },
    
    plugins: [
        '~/plugins/filters'
    ],
    
    build: {
        publicPath: '/assets/',
        // parallel: true,
        cache: true,
        optimizeCSS: true,

        extend(config) {
            const ext = '.vue'
            const {
                extensions
            } = config.resolve
            const indexOfVue = extensions.indexOf(ext)

            if (~indexOfVue) {
                extensions.splice(indexOfVue, 1)
            }

            extensions.unshift(ext)
        }
    },

    generate: {
        dir: 'docs'
    },

    router: {
        base: process.env.NODE_ENV == 'production' ? process.env.ROUTER_BASE : '/'
    }
}