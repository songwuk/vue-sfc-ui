import type { Plugin } from 'vue'
import { Tabs } from './components/tabs/Tabs'
import { TabPane } from './components/tabs/TabPane'
export function WlComPlugin(): Plugin {
  return {
    install(app) {
      app.component('WlTabs', Tabs)
      app.component('WlTabPane', TabPane)
    },
  }
}
