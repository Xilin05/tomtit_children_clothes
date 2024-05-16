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
  }
});

const emit = defineEmits(['viewer']);
const showImg = () => {
  emit('viewer', props.url);
};
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
  }
  .empty-img {
    background-color: azure;
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
      // justify-content: space-between;
      border-bottom: 1px solid rgb(194, 194, 194);

      .product-number {
        margin-left: 20px;
        padding-left: 10px;
        border-left: 1px solid rgb(194, 194, 194);
      }
    }

    .title {
      border-bottom: 1px solid rgb(194, 194, 194);
      flex: 1;
      // flex: 1;
    }
  }
}
</style>
