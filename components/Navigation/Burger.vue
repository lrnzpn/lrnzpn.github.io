<template lang="pug">
    .burger
        slot
            button.burger-btn(:class="{active: isBurgerActive}" @click.prevent="toggle")
                .burger-bar.burger-bar--1
                .burger-bar.burger-bar--2
                .burger-bar.burger-bar--3
</template>

<script>
export default {
    fetch({store}) {
        store.commit('toggleNav')
    },
    computed: {
        isBurgerActive() {
            return this.$store.state.isNavOpen;
        }
    },
    methods: {
        toggle() {
            this.$store.commit('toggleNav');
            document.body.classList.toggle('overflow');
        }
    },
}
</script>

<style lang="scss" scoped>
button {
    cursor: pointer;
    &:focus {
        outline: 0;
    }
}

.burger-btn {
  position: relative;
  height: 50px;
  width: 50px;
  display: block;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.active {
    .burger-bar--1 {
        transform: rotate(45deg);
    }

    .burger-bar--2 {
        opacity: 0;
    }

    .burger-bar--3 {
        transform: rotate(-45deg);
    }
  }
  &:hover {
      .burger-bar--2 {
          transform: scaleX(1)
      }
  }
}

.burger-bar {
  background-color: $main-black;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

    &--1 {
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px);
    }

    &--2 {
        transform-origin: 100% 100%;
        transform: scaleX(0.8);
    }

    &--3 {
        transform: translateY(15px);
    }
}
</style>