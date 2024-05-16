<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

const mediaType = ref('');

const _isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};

onMounted(() => {
  if (_isMobile()) {
    mediaType.value = 'mobile';
  } else {
    mediaType.value = 'pc';
  }
});
</script>

<template>
  <HelloWorld :media-type="mediaType" class="hello" />
</template>
