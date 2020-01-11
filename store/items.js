const _createFavorite = (iterable = []) => Array.from(iterable)

export const state = () => ({
    index: require('~/static/tags.json'),
    items: [],
    favorite: _createFavorite(),
    filter: {
        tag: [],
        code: []
    }
})

export const mutations = {
    addItems(state, items) {
        state.items.splice(-1, 0, ...items)
    },
    
    replaceFavorite(state, iterable) {
        state.favorite = _createFavorite(iterable)
    },

    addFavorite(state, value) {
        const index = state.favorite.indexOf(value)

        if (!~index) {
            state.favorite.push(value)
        }
    },

    deleteFavorite(state, value) {
        const index = state.favorite.indexOf(value)

        if(~index) {
            state.favorite.splice(index, 1)
        }
    },

    addTagFilter(state, value) {
        const index = state.filter.tag.indexOf(value)

        if (!~index) {
            state.filter.tag.push(value)
        }
    },

    deleteTagFilter(state, value) {
        const index = state.filter.tag.indexOf(value)

        if (~index) {
            state.filter.tag.splice(index, 1)
        }
    }
}

const sortTags = (a, b) => {
    if(!a || (a > b)) {
        return 1
    }

    return a < b ? -1 : 0
}

const sortCodes = (a, b) => {
    a += '', b += ''
    a = parseInt(a.match(/\d+/g).join('')), b = parseInt(b.match(/\d+/g).join(''))
    return a < b ? -1 : a > b ? 1 : 0
}

const getCodes = index => {
    return index
        .reduce((codes, [, _codes]) => codes.concat(_codes), [])
        .sort(sortCodes)
}

export const getters = {
    tags(state) {
        return state.index
            .map(([tag]) => tag)
            .sort(sortTags)
    },

    tagFilter(state) {
        return [...state.filter.tag].sort(sortTags)
    },

    // codes(state) {
    //     return getCodes(state.index)
    // },

    codes(state) {
        const tagFilter = state.filter.tag

        if (!tagFilter.length) {
            return getCodes(state.index)
        }

        const index = state.index.filter(([tag]) => ~tagFilter.indexOf(tag))

        return getCodes(index)
    }
}