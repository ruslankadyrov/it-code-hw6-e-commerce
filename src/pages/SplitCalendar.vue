<script setup lang="ts">
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");
</script>

<template>
  <h1>Split calendar</h1>
  <div class="demo-date-picker">
    <div class="block">
      <div class="demonstration">From: {{ value1 }}</div>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a Date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </div>

    <div class="block">
      <div class="demonstration">To: {{ value2 }}</div>
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="Pick a Date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-date-picker {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.demo-date-picker .block {
  padding: 20px 0;
  text-align: center;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  font-size: 16px;
}
</style>
