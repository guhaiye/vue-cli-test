/*
 * @Author: jiewei.shan 
 * @Date: 2020-05-18 10:05:00 
 * @Last Modified by: jiewei.shan
 * @Last Modified time: 2020-05-18 16:28:02
 */
<template>
  <Modal
    v-model="showModal"
    :title="title"
    :width="width"
    :class="className"
    :styles="modalStyle"
    :mask-closable="false"
  >
    <div
      class="col-md-12 pd0 fontsize14"
      style="max-height: 300px; overflow: auto"
    >
      <slot>{{ modalText }}</slot>
    </div>
    <div slot="footer">
      <Button type="default" @click="close">关闭</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    modalText: {
      type: String,
    },
    modalStyle: {
      type: Object,
    },
    className: {
      type: String,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    width: {
      type: Number,
      default: 250,
    },
    cb: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      showModal: false,
      disabled: false,
    };
  },

  methods: {
    close() {
      this.showModal = false;
      this.cb();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>