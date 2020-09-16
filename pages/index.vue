<template lang="pug">
    .content-wrapper
        section#landing 
            Home
        section#about 
            About
        section#skills
            Skills
        section#experience
            Experience(:experience="experience")
        section#projects projects
</template>

<script>
import Home from './Home'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'

export default {
    components: {
        Home,
        About,
        Skills,
        Experience
    },
    data() {
        return {
            experience: {}
        }
    },
    async fetch() {
        this.experience = await this.$axios.$get(process.env.API + '/api/experience/')
    }
}
</script>
