<template lang="pug">
    .content-wrapper
        section#landing Home
        section#about About
        section#skills skills
        section#experience exp
        section#projects projects
</template>

<script>
import Home from './Home'
// import About from './About'

export default {
  components: {
    Home
    // About
  }
}
</script>

<style lang="scss" scoped>
</style>
