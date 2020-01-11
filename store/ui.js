export const state = () => {
    return {
        modal: false,
        isScrollTopActive: false,
        savedScrollPosition: null
    }
}

export const mutations = {
    modal(state, value = !state.modal) {
        state.modal = value
    },

    scrollTopActive(state, value = !state.isScrollTopActive) {
        state.isScrollTopActive = value
    },

    savedScrollPosition(state, value) {
        state.savedScrollPosition = value
    }
}