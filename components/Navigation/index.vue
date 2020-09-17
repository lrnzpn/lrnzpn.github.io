<template lang="pug">
    transition(name="slide")
        header.nav-container(v-if="down")
            nav.nav-header.container.jc-space-between
                .logo-wrapper
                    .logo.static
                .menu-wrapper.jc-space-between
                    .menu-link(v-for="route in router" :key="route.id")
                        router-link(:to="`/${route.path}`" v-scroll-to="route.path" :class="{'active': activeSection === route.section}") {{route.name}}
                Burger.burger-container
            Menu
                ul.menu-nav
                    li(v-for="route in router" :key="route.id")
                        router-link(:to="`/${route.path}`" v-scroll-to="route.path" :class="{'active': activeSection === route.section}") {{route.name}}
            
</template>

<script>
import Burger from './Burger'
import Menu from './Menu'

export default {
    components: {
        Burger,
        Menu
    },
    computed:{
        activeSection() {
            return this.$store.state.currActive;
        },
        navOpen() {
            return this.$store.state.isNavOpen;
        }
    },
    methods: {
        closeMenuPanel() {
            this.$store.commit('setNavState', false);
        },
        navScroll() {
            let curr = window.pageYOffset || document.documentElement.scrollTop;
            this.previous > curr ? this.down = true : this.down = false
            this.previous = curr;
        }
    },
    data() {
        return {
            previous: 10,
            down: true,
            router: [
                {
                    id: 0,
                    name: 'About',
                    path: '#about',
                    section: 2
                },
                {
                    id: 1,
                    name: 'Skills',
                    path: '#skills',
                    section: 3
                },
                {
                    id: 2,
                    name: 'Experience',
                    path: '#experience',
                    section: 4
                },
                {
                    id: 3,
                    name: 'Projects',
                    path: '#projects',
                    section: 5
                }
            ]
        }
    },
    mounted() {
        window.addEventListener('scroll', this.navScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.navScroll)
    }
}
</script>

<style lang="scss" scoped>
.nav-container {
    position: fixed;
    z-index: 999;
    width: 100%;
    transition: 0.3s all ease;
    background-image: linear-gradient(to top, rgba(255,255,255,0.01),  rgba(255,255,255,0.3));

    .nav-header {
        height: 90px;

        .logo-wrapper {
            height: 100%;
            width: 100%;
            .logo {
                background-image: url('../../assets/img/lrnz.png');
                height: 100%;
                width: 150px;
            }
        }

        .menu-wrapper {
            @include screen("md") {
                display: none;
            }

            .menu-link {
                margin-left: 40px;
            }
        }  
    }

    a {
        color: $main-black;
        text-transform: uppercase;
        font-family: 'Roboto', sans-serif;
        letter-spacing: 0.15em;
        display: inline-block;
        position: relative;
        padding: .5rem;

        @include screen('md') {
            color: $white;
            margin-bottom: 20px;
        }

        &:after {
            background: none repeat scroll 0 0 transparent;
            bottom: 0;
            content: "";
            display: block;
            height: 2px;
            left: 50%;
            position: absolute;
            background: $main-black;
            transition: width 0.3s ease 0s, left 0.3s ease 0s;
            width: 0;
        }

        &:hover:after {
            width: 100%;
            left: 0;
        }
    }
}

.burger-container {
    display: none;
    @include screen("md") {
        display: block;
    }
}

 
ul {
    list-style-type: none;
    padding: 0;
}
</style>