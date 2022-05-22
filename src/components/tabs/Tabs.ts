import { computed, defineComponent, getCurrentInstance, h, nextTick, provide, reactive, ref, toRefs, watchEffect } from 'vue'
import type { DefineComponent, StyleValue } from 'vue'
import { tabsRootContextKey } from '../../types'
import type { TabsPaneContext } from '../../types'
import TabNav from './TabNav'
const Tabs = defineComponent({
  name: 'WlTabs',
  components: {
    TabNav,
  },
  props: {
    modelValue: {
      type: String || Number,
      default: '',
    },
    activeName: {
      type: String || Number,
      default: '',
    },
  },
  emits: [
    'tab-click',
    'update:modelValue',
  ],
  setup(props, ctx) {
    const vm = getCurrentInstance()!
    const emits = ctx.emit
    const { modelValue, activeName } = toRefs(props)
    const headerelementbounding = ref<HTMLElement | null>(null)
    const leftRef = ref(0)
    const widthRef = ref(0)

    const panes = reactive<Record<number, TabsPaneContext>>({})
    const offsetLeftValue = ref(0)
    const currentName = ref(modelValue || activeName || '0')

    async function offsetLeft() {
      await nextTick()
      const left = (vm.refs?.headerelementbounding as HTMLElement)?.getBoundingClientRect().left
      offsetLeftValue.value = Math.abs(left - leftRef.value)
    }
    {
      const registerPane = (pane: TabsPaneContext) => {
        panes[pane.uid] = pane
      }
      const unregisterPane = (uid: number) => {
        delete panes[uid]
      }

      provide(tabsRootContextKey, {
        props,
        currentName,
        registerPane,
        unregisterPane,
      })
    }
    const translates = computed<any>((): StyleValue => {
      return {
        'border-color': '#3d7fff',
        'transition': 'all .2s ease-in-out',
        'transform': `translateX(${offsetLeftValue.value}px)`,
        'width': `${widthRef.value}px`,
      }
    })
    const dataPanes = ref<Record<number, TabsPaneContext>>(panes)
    watchEffect(async() => {
      await nextTick()
      vm.update()
      dataPanes.value = panes
    })
    return () => {
      const header = h('div', {
        style: {
          position: 'relative',
        },
      },
      [
        Object.values(dataPanes.value).length !== 0
          ? h('div', {
            class: 'sssss',
            ref: headerelementbounding,
          }, [h(TabNav, {
            'current-name': currentName.value,
            'panes': Object.values(dataPanes.value),
            'onTabNavClick': (ev: Event, name: string, position: Record<string, any>) => {
              leftRef.value = position.left
              widthRef.value = position.width
              emits('tab-click', ev)
              emits('update:modelValue', name)
              // currentName.value = name
              offsetLeft()
            },
          })])
          : 'sss',
        h('div', {
          style: {
            position: 'absolute',
            ...translates.value,
          },
        }, ''),
      ],
      )
      const slotsDefault = h('div', { class: { 'tabs-content': true } }, [ctx.slots.default ? h(ctx.slots.default) : null])
      return [
        header, slotsDefault,
      ]
    }
  },
}) as DefineComponent<any>

export { Tabs }
