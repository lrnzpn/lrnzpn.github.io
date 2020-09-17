<template lang="pug">
    .menu
        .menu-backdrop(@click="toggle" v-if="isMenuOpen")
        transition(name="slide")
            .menu-panel.center(v-if="isMenuOpen")
                slot
</template>

<script>
export default {
    fetch({store}) {
        store.commit('setNavState')
    },
    methods: {
        toggle() {
            this.$store.commit('toggleNav')
        },
        closeMenu() {
            if (window.innerWidth > 991) this.$store.commit('setNavState', false);
        }
    },
    computed: {
        isMenuOpen() {
            return this.$store.state.isNavOpen;
        }
    },
    mounted() {
        window.addEventListener('resize', this.closeMenu)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.closeMenu)
    }
}
</script>

<style lang="scss" scoped>
// slide left
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 300ms ease-in 0s;
}

.menu-backdrop {
    backdrop-filter: blur(5px);
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.menu-panel {
  overflow-y: auto;
  background-color: $main-gray;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 99;
  width: 50%;
  border: 1px solid $main-gray;
}
</style>