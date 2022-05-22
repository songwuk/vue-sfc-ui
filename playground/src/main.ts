import { createApp } from 'vue'
import WlComPlugin from 'vue-sfc-ui'
import App from './App.vue'
// main.ts
import '@unocss/reset/tailwind.css'
import 'uno.css'
const app = createApp(App)
app.use(WlComPlugin())
app.mount('#app')
