import { defineComponent, getCurrentInstance, h, inject, nextTick, onMounted, toRefs, watch } from 'vue'
import { tabsRootContextKey } from '../types'
import { throwError } from './error'
const tabnavprops = {
  currentName: {
    type: String || Number,
    default: '',
  },
  panes: {
    type: Array,
    default: () => ([] as const),
  },
} as const
const TabNav = defineComponent({
  name: 'TabNav',
  props: tabnavprops,
  emits: {
    'tab-nav-click': <T extends string>(ev: Event, name: T) => ev instanceof Event && name,
  },
  setup(props, ctx) {
    const vm = getCurrentInstance()!
    const rootTabs = inject(tabsRootContextKey)
    if (!rootTabs)
      throwError('COMPONENT_NAME', '<el-tabs><tab-nav /></el-tabs>')
    const { currentName, panes } = toRefs(props)

    function tabNavClick(ev: Event, tabName: string) {
      const instance = vm.refs?.[`tab-${tabName}`] as HTMLElement
      ctx.emit('tab-nav-click', ev, tabName, instance.getBoundingClientRect())
    }
    watch(() => panes.value, async() => {
      await nextTick()
      vm.update()
    }, { flush: 'post' })
    onMounted(() => {
      if (currentName.value) {
        const instance = vm.refs?.[`tab-${currentName.value}`] as HTMLElement
        ctx.emit('tab-nav-click', 'ev', currentName.value, instance.getBoundingClientRect())
      }
    })
    return () => panes.value.map((pane: any, index) => {
      const tabName = pane.props.name || pane.index || `${index}`
      const tabLabelContent = pane.slots.label?.() || pane.props.label
      return h('div', {
        'ref': `tab-${tabName}`,
        'cursor-pointer': '',
        'style': { 'padding-bottom': '0.5rem', 'color': pane.active ? '#3d7fff' : '' },
        'onClick': (event: Event) => tabNavClick(event, tabName),
      }, tabLabelContent)
    })
  },
})

export type TabNavInstance = InstanceType<typeof TabNav>

export default TabNav
