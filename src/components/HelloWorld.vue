<template>
  <!-- <el-table-v2
    :columns="columns"
    :data="data"
    :width="1500"
    :height="800"
    fixed
  /> -->

  <div class="product-table">
    <el-input
      v-model="pNumber"
      clearable
      style="max-width: 300px; margin-bottom: 12px"
      placeholder="请输入货号"
      class="input-with-select"
      @clear="recover"
    >
      <template #append>
        <el-button @click="searchHandler">搜索</el-button>
      </template>
    </el-input>
    <el-table
      v-if="currMedia === 'pc'"
      border
      :data="tableList"
      height="800"
      empty-text="查无数据"
    >
      <el-table-column type="index" label="序号" width="54" />
      <el-table-column prop="productId" label="产品ID" width="200" />
      <el-table-column label="产品图片" width="180">
        <template #default="{ row }">
          <div class="img-box">
            <img
              :src="row.img"
              alt=""
              srcset=""
              style="width: 100px; height: 100px; cursor: pointer"
              @click="showImg(row.img)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="productNum" label="货号" width="180" />
      <el-table-column prop="name" label="产品名称" />
    </el-table>

    <div v-if="currMedia === 'mobile'" class="product-card-list">
      <template v-if="tableList.length">
        <template
          v-for="(product, index) in tableList"
          :key="product?.productId"
        >
          <ProductCard
            :index="index + 1"
            :title="product.name"
            :product-number="product.productNum"
            :url="product.img"
            :product-id="product.productId"
            @viewer="showImg"
          />
        </template>
      </template>
    </div>

    <el-image-viewer v-if="showImageViewer" :url-list="[urls]" @close="close" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import {
  ElTable,
  ElTableColumn,
  ElImageViewer,
  ElInput,
  ElButton
} from 'element-plus';

import { productList } from '../json/produt_list.js';

import ProductCard from './product-card.vue';

const props = defineProps({
  mediaType: {
    type: String,
    default: () => 'pc'
  }
});

const currMedia = computed({
  get: () => props.mediaType,
  set: () => {}
});

const data =
  Object.keys(productList.productList).map(
    item => productList.productList[item]
  ) || [];
// console.log("data", data);

const tableList: any = ref([]);

onMounted(() => {
  tableList.value = [...(JSON.parse(JSON.stringify(data)) || [])];
});

const pNumber = ref('');

watch(
  () => pNumber.value,
  newVal => {
    if (!newVal) {
      tableList.value = [...(JSON.parse(JSON.stringify(data)) || [])];
    }
  }
);

const searchHandler = () => {
  if (!pNumber.value) {
    tableList.value = JSON.parse(JSON.stringify(data));
    console.log('tableList', tableList.value);

    return;
  }

  const filterRes = tableList.value.filter((item: any) =>
    item?.productNum?.includes(pNumber.value)
  );

  console.log('filterRes', filterRes);

  tableList.value = JSON.parse(JSON.stringify(filterRes));
};

const recover = () => {
  tableList.value = [...(JSON.parse(JSON.stringify(data)) || [])];
};

const showImageViewer = ref(false);
const urls = ref([]);

const showImg = (url: string) => {
  //预览大图
  urls.value = [url];
  showImageViewer.value = true;
};
const close = () => {
  //必须要这个事件 不然点击右上角关闭按钮没有反应
  showImageViewer.value = false;
};
</script>

<style scoped>
.img-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 4px;
  box-sizing: border-box;
}

.product-table {
  box-sizing: border-box;
  padding: 12px 8px;

  .product-card-list {
    height: calc(100vh - 64px);
    overflow: scroll;
  }
}

@media screen and (min-width: 480px) {
  .product-table {
  }
}
</style>
