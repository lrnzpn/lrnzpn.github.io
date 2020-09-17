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
    > span {
        font-size: $font-size--7;
        letter-spacing: 1.5px;
    }
}

.exp-wrapper {
    justify-content: space-between;
    width: 100%;

    span {
        display: block;

        &.work-header {
            cursor: pointer;
            border: 2px solid $main-olive;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            text-align: center;
            color: $main-black;
            text-transform: uppercase;
            margin-bottom: 1rem;
            transition: all ease 300ms;

            &:hover {
                background-color: $main-olive;
                color: $white;
            }
        }
    }

    .work-desc-container {
        width: 500px;
        span:nth-child(1) {
            
        }

    }
}
</style>