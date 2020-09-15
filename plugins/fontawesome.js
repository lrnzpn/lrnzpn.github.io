// https://stackoverflow.com/questions/53444093/getting-error-when-trying-to-use-nuxt-font-awesome-5-although-i-followed-the-off/53445399
// official docs: https://github.com/FortAwesome/vue-fontawesome

import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fas)
library.add(fab)

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)