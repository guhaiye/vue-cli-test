<template>
  <div class="s-card">
    <div class="s-card-header">{{ title }}</div>
    <div class="s-card-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardUi',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    }
  },

  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.s-card {
  &-header {
    font-size: 14px;
    font-weight: 500;
    color: #596778;
    margin-bottom: 12px;
    line-height: 22px;
    position: relative;
    padding-left: 12px;
    &::before {
      content: "";
      display: inline-block;
      margin-right: 5px;
      width: 4px;
      height: 12px;
      background: #3e98f1;
      position: absolute;
      top: 6px;
      left: 0px;
    }
  }
}
</style>
