import type { ComputedRef, InjectionKey, Ref, Slots, UnwrapRef } from 'vue'

export type TabsPaneContext = UnwrapRef<{
  uid: number
  slots: Slots
  props: any
  paneName: ComputedRef<string | number | undefined>
  active: ComputedRef<boolean>
  index: Ref<string | undefined>
}>

export interface TabsRootContext {
  props: any
  currentName: Ref<string | number>
  registerPane: (pane: TabsPaneContext) => void
  unregisterPane: (uid: number) => void
}

export const tabsRootContextKey: InjectionKey<TabsRootContext>
  = Symbol('tabsRootContextKey')
