<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('two')
</script>
<template>
  <main font-sans p="x-4 " text="center gray-700 dark:gray-200" relative min-w-screen-xl>
    <div>
      <WlTabs v-model="activeName">
        <WlTabPane label="标题二" name="two">
          <div>tab1</div>
        </WlTabPane>
      </WlTabs>
    </div>
  </main>
</template>
