export const state = () => ({
    isNavOpen: false,
    currActive: 1,
})

export const mutations = {
    toggleNav(state) {
        state.isNavOpen = !state.isNavOpen
    },
    setNavState(state, status) {
        state.isNavOpen = status
    },
    setCurrActiveState(state, curr) {
        state.currActive = curr
    }
}
