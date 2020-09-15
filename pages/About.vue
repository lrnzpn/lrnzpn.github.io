<template lang="pug">
    .about-container
        .about-txt-container.center.col.container
            span Development &#x1F4BB and Data Science &#x1F4C8	
            p 
                | Hi! I'm a student from the Ateneo de Manila University, taking up BS Computer Science, Specialization in Data Science and Analytics.
                | I find myself looking for internships mainly in the field of Data Science, Software Engineering, and Web Development.
                | It is my passion to learn and grow that makes me want to explore despite knowing little. 
            p
                | When I'm not coding, I like to play video games such as League of Legends, watch some netflix, or workout.
                | I like to try new stuff such as UI design or learn new programming languages and frameworks that would help me grow as a developer.
</template>

<style lang="scss" scoped>
.about-container {
    background: $main-olive;

    .about-txt-container {

        padding: 5% 0;
        width: 60%;
        color: $white;
        text-align: center;
        span {
            color: $white;
            text-transform: uppercase;
            font-weight: bold;
            font-size: $font-size--7;
            letter-spacing: 1.5px;
        }

        p {
            font-family: "Roboto", sans-serif;
            margin: 1rem;
            line-height: 2rem;           
        }
    }
}
</style>