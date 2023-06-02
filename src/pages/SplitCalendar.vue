<script setup lang="ts">
import { ref } from "vue";
import makeRequest from "../services/api/httpClient";
import type { StockSplit } from "../types/stocksSplit";

const datePickerFrom = ref("");
const datePickerTo = ref("");

const stocksSplit = ref<StockSplit[]>([]);

function makeDateRequest(dateFrom: string, dateTo: string) {
  makeRequest({
    method: "get",
    url: `https://financialmodelingprep.com/api/v3/stock_split_calendar?from=${dateFrom}&to=${dateTo}&apikey=39c41689f9fab5f0dcf71b542172366c`,
  }).then(({ data }) => {
    stocksSplit.value = data;
  });
}
</script>

<template>
  <div class="wrapper">
    <h1>Split calendar</h1>
    <div class="demo-date-picker">
      <div class="block">
        <div class="demonstration">From: {{ datePickerFrom }}</div>
        <el-date-picker
          v-model="datePickerFrom"
          type="date"
          placeholder="Pick a Date"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </div>

      <div class="block">
        <div class="demonstration">To: {{ datePickerTo }}</div>
        <el-date-picker
          v-model="datePickerTo"
          type="date"
          placeholder="Pick a Date"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </div>
    </div>

    <el-button
      type="primary"
      plain
      @click="makeDateRequest(datePickerFrom, datePickerTo)"
      class="searchButton"
    >
      Search
    </el-button>
  </div>
  <el-scrollbar>
    <p v-for="split in stocksSplit" class="scrollbar-demo-item" @click="$router.push('/product/' + split.symbol)">
        <div class="dateSplit">
        Date: {{ split.label }}
        </div>
        <div class="tickerSplit">
        Ticker: {{ split.symbol }}
        </div> 
        <div class="ratioSplit">
        Split ratio:{{ split.numerator }}:{{ split.denominator }}
        </div>
    </p>
  </el-scrollbar>
  <el-backtop :right="100" :bottom="100" />
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

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.scrollbar-demo-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);

  .dateSplit {
    flex-basis: 150px;
  }

  .tickerSplit {
    flex-basis: 200px;
  }

  .ratioSplit {
    flex-basis: 150px;
    color: black;
  }
}
</style>
