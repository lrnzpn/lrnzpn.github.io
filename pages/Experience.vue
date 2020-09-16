<template lang="pug">
    .experience-container
        .experience.container
            
</template>

<script>
import ExpCard from '../components/ExpCard'

export default {
    props: [
        'experience'
    ],
    components: {
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>