
export default {
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=0' },
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
}