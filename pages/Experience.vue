<template lang="pug">
    .experience-container
        .experience.container.center
            span Experience
            .exp-wrapper.ai-flex-start
                .work-select
                    span.work-header(v-for="(exp, idx) in experience" :key="idx" @click="displayExp(idx)") {{exp.name}}
                .work-desc
                    .work-desc-container
                        span {{experience[activeIndex].title}}
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
.exp-wrapper {

    width: 60%;
    justify-content: space-between;

    span {
        display: block;

        &.work-header {
            cursor: pointer;
            background-color: $main-olive;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            text-align: center;
            color: $white;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 1rem;
        }
    }
}
</style>