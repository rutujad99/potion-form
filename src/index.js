// src/index.js
import PotionFormComponent from './components/PotionForm.vue'
import { Quasar } from 'quasar'
import * as QuasarAll from 'quasar'

// Import Quasar CSS
import quasarStyles from 'quasar/dist/quasar.css?inline'
import materialIcons from '@quasar/extras/material-icons/material-icons.css?inline'
import customStyles from './css/app.scss?inline'

// Create an install function that registers Quasar and your component
const install = (app) => {
  // Inject the Quasar CSS directly into the document head
  const injectStyle = (css) => {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
  }

  // Inject all CSS
  injectStyle(quasarStyles)
  injectStyle(materialIcons)
  injectStyle(customStyles)

  // Install Quasar
  app.use(Quasar, {
    components: QuasarAll,
    directives: QuasarAll,
  })

  app.component('PotionForm', PotionFormComponent)
}

// Create a plugin object that Vue can use
const plugin = {
  install,
}

// Export the component and the plugin
export { PotionFormComponent }
export default plugin
