import { createApp } from 'vue'
import WlComPlugin from 'vue-sfc-ui'
import App from './App.vue'
const app = createApp(App)
app.use(WlComPlugin())
app.mount('#app')
