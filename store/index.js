let plugins = []

if (process.browser) {
    plugins = [
        ...plugins,
        store => {
            const scope = 'items'
            const joinBy = '/'
            const prop = 'favorite'
            const key = [scope, prop].join(joinBy)
            const replaceFavorite = [scope, 'replaceFavorite'].join(joinBy)

            store.subscribe(({ type }, state) => {
                const mutations = new Set([
                    replaceFavorite,
                    [scope, 'addFavorite'].join(joinBy),
                    [scope, 'deleteFavorite'].join(joinBy)
                ])

                if (mutations.has(type)) {
                    window.localStorage.setItem(key, JSON.stringify(Array.from(state[scope][prop])))
                }
            })

            let favorite
            if (window.localStorage.key(key)) {
                try {
                    favorite = JSON.parse(window.localStorage.getItem(key))
                } catch(error) {
                    console.error(error)
                }
            }

            store.commit(replaceFavorite, Array.isArray(favorite) ? favorite : [])
        }
    ]
}

export { plugins }