/** 
author:guofa
time：20220511
dees：查询页面布局
*/
<template>
    <div class="table-layout">
        <!-- <h2 class="title">{{title}}</h2> -->
        <div class="search-bar">
          <slot name="search"></slot>
        </div>
        <div class="btns">
          <slot name="btns"></slot>
        </div>
        <div class="table-content">
          <slot></slot>
        </div>
    </div>
</template>
<script>

export default {
  name: 'tablePageLayout',
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {}
  }
}

</script>
<style lang='scss' scoped>
   .table-layout {
    padding: 0px 16px;
     .search-bar {
       margin-bottom: 12px;
     }
   }
</style>
