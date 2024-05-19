<template>
  <div class="component-product-card">
    <div class="product-img">
      <div v-if="!url" class="empty-img">暂无图片</div>

      <img
        v-else
        :src="url"
        alt=""
        srcset=""
        style="cursor: pointer"
        @click="showImg"
      />
    </div>
    <div class="product-info">
      <div class="info-item index">
        <div><span class="label">序号：</span> {{ index }}</div>
        <div class="product-number">
          <span class="label">货号：</span>{{ productNumber || '暂无货号' }}
        </div>
      </div>
      <div class="info-item type-info">
        <div><span class="label">类型：</span> {{ typeInfo.type }}</div>
        <div class="index-number">
          <span class="label">编码：</span>{{ typeInfo.number }}
        </div>
      </div>
      <div class="info-item title">
        <span class="label">产品标题：</span> {{ title }}
      </div>
      <!-- <div class="info-item product-number">
        <span class="label">货号：</span>{{ productNumber || '暂无货号' }}
      </div> -->
      <div class="info-item product-id">
        <span class="label">产品ID：</span>{{ productId }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { PRODUCT_TYPES } from '@/constant/type';

const props = defineProps({
  index: {
    type: Number,
    default: () => 0
  },
  title: {
    type: String,
    default: () => ''
  },
  productNumber: {
    type: String,
    default: () => ''
  },
  productId: {
    type: String,
    default: () => ''
  },
  url: {
    type: String,
    default: () => ''
  },
  data: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['viewer']);
const showImg = () => {
  emit('viewer', props.url);
};

const typeInfo: Record<string, string> = {};

const formatProductNumber = () => {
  if (props.productNumber?.includes('-')) {
    typeInfo.type = '外款';
    typeInfo.number = props.productNumber;
    return;
  }

  typeInfo.type =
    PRODUCT_TYPES[props.data.format_res.type] ||
    `未编类型(${props.data.format_res.type})`;
  typeInfo.number = props.data.format_res.number;
};

formatProductNumber();
</script>

<style scoped lang="scss">
.component-product-card {
  width: 98%;
  height: auto;
  border: 1px solid rgb(194, 194, 194);
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  display: flex;
  flex-wrap: nowrap;

  .product-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: auto;
    box-sizing: border-box;
    padding: 4px 8px;

    img {
      width: 100px;
      height: auto;
      // width: 100%;
      // height: auto;
    }
    .empty-img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      color: rgb(129, 129, 129);
      background-color: rgb(228, 228, 228);
    }
  }

  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .label {
      color: rgb(114, 114, 114);
    }

    .info-item {
      box-sizing: border-box;
      padding: 4px 8px;
    }

    .index {
      display: flex;
      flex-wrap: nowrap;
      border-bottom: 1px solid rgb(194, 194, 194);

      .product-number {
        margin-left: 20px;
        padding-left: 10px;
        border-left: 1px solid rgb(194, 194, 194);
      }
    }

    .type-info {
      display: flex;
      flex-wrap: nowrap;
      border-bottom: 1px solid rgb(194, 194, 194);

      .index-number {
        margin-left: 20px;
        padding-left: 10px;
        border-left: 1px solid rgb(194, 194, 194);
      }
    }

    .type-info {
      display: flex;
      flex-wrap: nowrap;
      border-bottom: 1px solid rgb(194, 194, 194);
    }

    .title {
      border-bottom: 1px solid rgb(194, 194, 194);
      flex: 1;
    }
  }
}
</style>
