<script setup lang="ts">
import { computed, defineEmits, getCurrentInstance, nextTick, provide, reactive, ref } from 'vue'
import type { StyleValue } from 'vue'
import { tabsRootContextKey } from '../../types'
import type { TabsPaneContext } from '../../types'

import TabNav from './TabNav'
const vm = getCurrentInstance()!
const emits = defineEmits([
  'tab-click',
  'update:modelValue',
])
const props = defineProps({
  modelValue: {
    type: String || Number,
    default: '',
  },
  activeName: {
    type: String || Number,
    default: '',
  },
})
const headerelementbounding = ref(null)
const leftRef = ref(0)
const widthRef = ref(0)

const panes = reactive<Record<number, TabsPaneContext>>({})
const offsetLeftValue = ref(0)
const currentName = ref(props.modelValue || props.activeName || '0')
function animatefn(ev: Event, name: string, position: Record<string, any>) {
  leftRef.value = position.left
  widthRef.value = position.width
  emits('tab-click', ev)
  emits('update:modelValue', name)
  currentName.value = name
  offsetLeft()
}

async function offsetLeft() {
  await nextTick()
  const left = (vm.refs?.headerelementbounding as HTMLElement).getBoundingClientRect().left
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
const translates = computed((): StyleValue => {
  return {
    'border-color': '#3d7fff',
    'transition': 'all .2s ease-in-out',
    'transform': `translateX(${offsetLeftValue.value}px)`,
    'width': `${widthRef.value}px`,
  }
})
</script>
<template>
  <div relative after-content-none after-absolute after-left-0 after-bottom-0 after-w-full after-h-2px after-bg-gray-200 after-z1>
    <header v-if="Object.values(panes).length !== 0" ref="headerelementbounding" text-sm color="gray-500/90" flex="~ row gap9" items-center justify-start>
      <TabNav :current-name="currentName" :panes="Object.values(panes)" @tab-nav-click="animatefn" />
    </header>
    <div absolute left-0 bottom-0 z2 b-b-2 :style="translates" />
  </div>
  <div mt1 class="tabs-content">
    <slot />
  </div>
</template>
