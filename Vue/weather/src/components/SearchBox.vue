<template>
    <div class="flex gap-4">
        <el-autocomplete
          v-model="state2"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          clearable
          class="inline-input w-50"
          placeholder="Please Input"
          @select="handleSelect"
        />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  
  interface RestaurantItem {
    value: string
    link: string
  }
  
  const state2 = ref('')
  
  const restaurants = ref<RestaurantItem[]>([])
  const querySearch = (queryString: string, cb: any) => {
    const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value
    // call callback function to return suggestions
    cb(results)
  }
  const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
      return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    }
  }
  const loadAll = () => {
    return [
      { value: 'vue', link: 'https://github.com/vuejs/vue' },
      { value: 'element', link: 'https://github.com/ElemeFE/element' },
      { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
      { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
      { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
      { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
      { value: 'babel', link: 'https://github.com/babel/babel' },
    ]
  }
  
  const handleSelect = (item: RestaurantItem) => {
    console.log(item)
  }
  
  onMounted(() => {
    restaurants.value = loadAll()
  })
  </script>
  