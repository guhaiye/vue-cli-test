<template>
  <div class="page-back">
    <span class="back-btn" @click="goBack"><span class="icon">&lt;</span>返回</span>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  name: 'pageBack',
  methods: {
    goBack() {
      if (this.path) {
        this.$router.push(this.path)
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-back {
  width: 100%;
  height: 38px;
  line-height: 38px;
  padding: 0px 0px 8px 20px;
  border-bottom: 1px solid #dddddd;
  color: #333333;
  .icon {
    color: rgba(0, 0, 0, 0.25);
    font-size: 16px;
    padding-right: 5px;
  }
  .back-btn {
    padding: 0 15px 0 2px;
    position: relative;
    cursor: pointer;
  }
  .back-btn::after {
    content: '';
    height: 13px;
    display: inline-block;
    width: 1px;
    position: absolute;
    top: 2px;
    right: 0px;
    background: rgba(0, 0, 0, 0.25);
  }
  .title {
    margin-left: 12px;
  }
}
</style>
