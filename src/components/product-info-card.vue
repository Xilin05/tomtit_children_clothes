<template>
  <div class="component-product-info-card flex align-center">
    <div class="product-img flex align-center">
      <div
        v-if="!data.img"
        class="empty-img flex justify-center align-center text-m"
      >
        暂无图片
      </div>
      <img
        v-else
        :src="data.img"
        alt=""
        srcset=""
        style="cursor: pointer"
        @click="showImg(data.img)"
      />
    </div>
    <div class="product-info flex-1 text-l">
      <div class="text-item flex">
        <div class="number">
          <span class="label">货号</span> {{ data.productNum }}
        </div>
        <div class="type">
          <span class="label">类型</span> {{ typeInfo.type }}
        </div>
      </div>
      <div class="text-item">
        <span class="label">产品ID</span> {{ data.productId }}
      </div>
      <div class="text-item">
        <span class="label">标题</span> {{ data.name }}
      </div>
      <!-- <div class="text-item">
        <span class="label">所属类目</span> {{ data.categoryPath }}
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { PRODUCT_TYPES } from '@/constant/type'

const props = defineProps({
  index: {
    type: Number,
    default: () => 0
  },
  data: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['viewer'])
const showImg = (url: string) => emit('viewer', url)

const typeInfo: Record<string, string> = {}

const formatProductNumber = () => {
  const productNum = props.data?.productNum
  if (productNum?.includes('-')) {
    const infoList = productNum.split('-')
    typeInfo.type = `外款(${infoList[1] || '-'})`
    typeInfo.number = infoList[0]
    return
  }

  typeInfo.type =
    PRODUCT_TYPES[props.data.format_res.type] ||
    `未编类型(${props.data.format_res.type || '-'})`
  typeInfo.number = props.data.format_res.number
}

formatProductNumber()
</script>

<style scoped lang="scss">
.component-product-info-card {
  width: 95%;
  color: rgb(58, 63, 99);
  background-color: white;
  // padding: 12px 8px 0px 12px;
  box-sizing: border-box;
  padding: 12px 8px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 1px rgb(235, 235, 235);
  .product-img {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 4px;
    margin-right: 10px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    .empty-img {
      width: 100px;
      height: 100px;
      color: rgb(129, 129, 129);
      background-color: rgb(228, 228, 228);
    }
  }

  .product-info {
    .text-item {
      box-sizing: border-box;
      padding: 4px 0px;
      // line-height: 24px;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(218, 226, 255, 0.7);
      }

      .number {
        width: 110px;
      }
    }
  }
}

.label {
  margin-right: 4px;
  color: #a1a1a8;
}
</style>
