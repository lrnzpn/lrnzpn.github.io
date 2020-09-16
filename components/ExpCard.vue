<template lang="pug">
    .exp-card-wrapper
        .exp-card
            span.company {{company}}
            span.title {{name}} ({{start}} - {{end}})
            ul
                li(v-for="(d, i) in desc") {{d}}
</template>

<script>
export default {
    props: [
        'company',
        'name',
        'description',
        'start',
        'end'
    ],
    data() {
        return {
            desc: this.description.split('\r\n')
        }
    }
}
</script>

<style lang="scss" scoped>
.exp-card {
    span {
        display: block;
    }
}
</style>