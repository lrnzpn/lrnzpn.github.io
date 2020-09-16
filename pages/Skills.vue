<template lang="pug">
    .skills-container
        .skills-content-wrapper.container
            .skills-txt-container.center.col
                span I've learned a lot over the past years.
                p 
                    | Some languages or frameworks I am proficient in, some I am pretty much familiar with.

            .skills.jc-space-around
                .languages.skills-wrapper
                    div.center.col
                        font-awesome-icon(:icon="{ prefix: 'fas', iconName: 'code' }")
                        span languages
                    ul 
                        li Arduino
                        li C++
                        li CSS
                        li HTML
                        li Java
                        li JavaScript
                        li PHP
                        li Python
                        li Sass
                .frameworks.skills-wrapper
                    div.center.col 
                        font-awesome-icon(:icon="{ prefix: 'fas', iconName: 'laptop-code' }")
                        span frameworks
                    ul
                        li Django
                        li Django REST
                        li Express
                        li jQuery
                        li NuxtJS
                        li ReactJS
                        li React Native
                        li Ruby on Rails
                        li Pug
                        li VueJS
                        li Wordpress
                .tools.skills-wrapper
                    div.center.col 
                        font-awesome-icon(:icon="{ prefix: 'fas', iconName: 'tools' }")
                        span dev tools
                    ul 
                        li AWS
                        li Git
                        li PostgresDB
                        li SQLite
                        li Terminal
                        li VSCode
                .design.skills-wrapper
                    div.center.col 
                        font-awesome-icon(:icon="{ prefix: 'fas', iconName: 'pencil-ruler' }")
                        span design tools
                    ul
                        li Adobe Photoshop
                        li Adobe XD
                        li Bootstrap5
                        li Figma
                        li Fontawesome
                    
</template>

<style lang="scss" scoped>
.skills-container {
    padding: 5% 0;

    .skills-content-wrapper {
        border: 1px solid $alpha-black;
        border-radius: 10px;

        .skills-txt-container {
            margin: 1.5rem 0;
            span {
                font-size: $font-size--7;
                color: $main-black;
            }

            p {
                margin: 1rem 0;
                color: $main-gray;
                font-family: 'Roboto', sans-serif;
            }
        }
    }
}

.skills {
   align-items: flex-start;

   .skills-wrapper {
        color: $main-olive;
        text-align: center;
        padding: 1.5rem;
        width: 250px;

        > div {
            svg {
                font-size: $font-size--5 * 3;
            }

            span {
                margin: .75rem 0;
                text-transform: uppercase;
                text-decoration: underline; 
                font-weight: bold;
            }
        }

        ul {
            font-family: 'Roboto', sans-serif;
            list-style-type: none;
            padding: 0;
            margin: 0;

            li {
                color: $main-black;
                margin: 1rem 0;
            }
        }
   }
}
</style>