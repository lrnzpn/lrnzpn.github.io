<template lang="pug">
    .experience-container
        .experience.container
            span.center Work-Related Experience
            .exp-wrapper.ai-flex-start
                .work-select
                    span.work-header(v-for="(exp, idx) in experience" :key="idx" @click="displayExp(idx)") {{exp.name}}
                .work-desc
                    .work-desc-container
                        span {{experience[activeIndex].title}} @ <a :href='experience[activeIndex].link'>{{experience[activeIndex].name}}</a>
                        span {{formatDate(experience[activeIndex].start)}} - {{formatDate(experience[activeIndex].end)}}
                        ul 
                            li(v-for="(desc, idx) in split(experience[activeIndex].description)" :key="idx") {{desc}}
</template>

<script>
export default {
    props: [
        'experience'
    ],
    data() {
        return {
            activeIndex: 0,
            description: []
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            })
        },
        displayExp(index) {
            this.activeIndex = index
        },
        split(arr) {
            if(arr.includes('\r\n')) {
                this.description = arr.split('\r\n')
            } else {
                this.description = [arr]
            }

            return this.description
        }
    }
}
</script>

<style lang="scss" scoped>

.experience {
    width: 75%;
    background: $main-olive;
    padding: 1em;
    border: 1px solid $main-olive;
    border-radius: 10px;

    > span {
        font-size: $font-size--7;
        letter-spacing: 1.5px;
        margin-bottom: .75em;
        color: $main-black;
        font-weight: 500;
    }
}

.exp-wrapper {
    justify-content: space-around;
    width: 100%;

    span {
        display: block;

        &.work-header {
            cursor: pointer;
            color: $white;
            text-transform: uppercase;
            margin-bottom: 1rem;
            transition: all ease 300ms;
            font-weight: 500;
            width: 250px;

            &:hover {
                font-size: 1.1em;
            }
        }
    }

    .work-desc-container {
        width: 400px;
        span {
            font-family: 'Roboto', sans-serif;
            color: $white;

            a {
                color: $white;
                border-bottom: 3px solid transparent;
                transition: border-bottom 300ms ease-in;
                &:hover {
                    border-bottom: 3px solid $white;
                }
            }

            &:nth-child(1) {
                font-weight: bold;
                margin-bottom: .25em;
            }

            &:nth-child(2) {
                color: rgba(0,0,0,0.5);
                font-weight: 500;
            }
        }

        ul {
            color: $white;
            li {
                font-family: 'Roboto', sans-serif;
            }
        }

    }
}
</style>