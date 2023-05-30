<script setup lang="ts">
import { ref } from "vue";

import type { Product } from "../types/products";

import makeRequest from "../services/api/httpClient";

import { useRoute } from "vue-router";

import { ElMessageBox } from "element-plus";

const products = ref<Product[]>([]);

const route = useRoute();
const paramsId = route.params.id;

makeRequest({
  method: "get",
  url: `https://financialmodelingprep.com/api/v3/profile/${paramsId}?apikey=39c41689f9fab5f0dcf71b542172366c`,
}).then(({ data }) => {
  products.value = data;
});

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<template>
  <div v-for="product in products">
    <div class="header">
      <div class="image">
        <el-image
          style="width: 45px; height: 45px"
          :src="product.image"
          class="product-image"
        />
      </div>
      <div class="companyName">
        <h2>{{ product.companyName }} shares</h2>
        <div class="companySymbol">
          {{ product.symbol }}
        </div>
      </div>
      <div class="companyPrice">{{ product.price }}$</div>
      <el-button type="success" plain @click="dialogVisible = true">
        Buy
      </el-button>
      <el-button type="primary" plain @click="$router.push({ name: 'List' })">
        Back to list
      </el-button>
    </div>
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Description" name="1">
          <div>
            {{ product.description }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="Contacts" name="2">
          <div>
            Phone:
            <address>{{ product.phone }}</address>
          </div>
          <div>
            Address:
            <address>{{ product.address }}</address>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Сapitalization" name="3">
          <div>{{ product.mktCap }}$</div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="Сonfirming the purchase"
      width="30%"
      :before-close="handleClose"
    >
      <span>Buy {{ product.companyName }} shares?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Buy
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .product-image {
    filter: drop-shadow(1px 1px 1px black);
    border-radius: 15px;
  }

  .companySymbol {
    color: darkgray;
  }
}

.el-button {
  margin: 0;
}

.demo-collapse {
  font-size: 21px;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 10px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
