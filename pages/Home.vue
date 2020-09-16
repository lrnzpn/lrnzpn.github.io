<template lang="pug">
    .landing-container
        .hero.static
        .overlay
            .hero-txt-container.center
                span Hi! My name is Miggy.
        .chevron-container.center
            font-awesome-icon.bounce(:icon="{ prefix: 'fas', iconName: 'chevron-down' }")
            
            
</template>

<style lang="scss" scoped>
.hero {
    background-image: url('../assets/img/compressed.png');    
    height: 100vh;
    width: auto;
}

.hero-txt-container {
    height: inherit;

    span {
        color: $white;
        font-weight: bold;
        font-size: $font-size--8;
        background-color: rgba(119,138,53, 0.75);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
}

.overlay {
    background-color: $alpha-black;
    height: 100%;
    width: 100%;
    position: absolute;
    top:0;
    left:0;
}

.chevron-container {
    position: absolute;
    bottom: 5%;
    width: 100%;

    svg {
        font-size: $font-size--8;
        color: $white;
    }
}
</style>
