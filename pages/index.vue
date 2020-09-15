<template lang="pug">
    .content-wrapper
        section#landing 
            Home
        section#about 
            About
        section#skills
            Skills
        section#experience exp
        section#projects projects
</template>

<script>
import Home from './Home'
import About from './About'
import Skills from './Skills'

export default {
  components: {
    Home,
    About,
    Skills
  }
}
</script>

<style lang="scss" scoped>
</style>
