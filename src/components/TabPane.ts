import { computed, defineComponent, getCurrentInstance, h, inject, onMounted, onUnmounted, reactive, ref, toRefs, useSlots } from 'vue'
import type { DefineComponent } from 'vue'
import { tabsRootContextKey } from '../types'
import { throwError } from './error'
export const TabPane = defineComponent({
  name: 'TabPane',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String || Number,
      default: '',
    },
  },
  setup(props, ctx) {
    const COMPONENT_NAME = 'TabPane'
    const { name } = toRefs(props)
    const tabsRoot = inject(tabsRootContextKey)
    if (!tabsRoot)
      throwError(COMPONENT_NAME, 'usage: <el-tabs><tab-nav /></el-tabs>')
    const index = ref<string>()
    const instance = getCurrentInstance()!
    const active = computed(
      () => tabsRoot.currentName.value === (name.value || index.value),
    )
    const paneName = computed(() => name.value || index.value)
    const slots = useSlots()
    const pane = reactive({
      uid: instance.uid,
      slots,
      props,
      paneName,
      active,
      index,
    })
    onMounted(() => tabsRoot.registerPane(pane))
    onUnmounted(() => tabsRoot.unregisterPane(pane.uid))
    return () => h('div', {
      style: {
        display: active.value ? 'block' : 'none',
      },
      id: `pane-${paneName.value}`,
    }, [ctx.slots.default ? h(ctx.slots.default) : ''])
  },
}) as DefineComponent<any>
