<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('two')
function handleClick(ev: Event) {
  console.log(ev)
}
</script>
<template>
  <main font-sans p="x-5" text="center gray-700 dark:gray-200" relative min-w-screen-xl>
    <div>
      <WlTabs v-model="activeName" @tab-click="handleClick">
        <WlTabPane label="标题二" name="one">
          <div>tab1</div>
        </WlTabPane>
        <WlTabPane label="标题一" name="two">
          <div>tab2</div>
        </WlTabPane>
      </WlTabs>
    </div>
  </main>
</template>
