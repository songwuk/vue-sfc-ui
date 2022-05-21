import type { Plugin } from 'vue'
// import Tabs from './components/Tabs.vue'
import { TabPane } from './components/TabPane'
export function WlComPlugin(): Plugin {
  return {
    install(app) {
      // app.component('WlTab', Tabs)
      app.component('TabPane', TabPane)
    },
  }
}
