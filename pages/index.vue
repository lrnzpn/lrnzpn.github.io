<template lang="pug">
    .loader(v-if="experience.length === 0 || !experience")
        Loader
    .content-wrapper(v-else)
        section#landing(ref="sect--1") 
            Home
        section#about(ref="sect--2")
            About
        section#skills(ref="sect--3")
            Skills
        section#experience(ref="sect--4")
            Experience(:experience="experience")
        section#projects(ref="sect--5") projects
</template>

<script>
import Home from './Home'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Loader from '../components/Loader'

export default {
    components: {
        Loader,
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
    methods: {
        activeSection() {
            for(let i = 1; i<=document.getElementsByTagName("section").length;i++) {
                let el = this.$refs[`sect--${i}`]
                let rect = el.getBoundingClientRect();

                if(rect.bottom - 250 > 0) {
                    this.$store.commit('setCurrActiveState', i);
                    this.$store.commit('setNavState', false);
                    break;
                }
            }
        }
    },
    fetch({store}) {
        store.commit('setCurrActiveState'),
        store.commit('setNavState')
    },
    async fetch() {
        this.experience = await this.$axios.$get(process.env.API + '/api/experience/')
    },
    mounted() {
        this.$store.state.currActive = 1;
        window.addEventListener("scroll", this.activeSection);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.activeSection);
    }
}
</script>
