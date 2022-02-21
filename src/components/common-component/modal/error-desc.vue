/**
 * author       : guhaiye
 * createTime   : 20200318
 * description  : 短信来源失败描述
 */
<template>
    <Modal
        v-model="descModal"
        :title="title"
        :width="modalWidth"
        class="topModal20"
        :mask-closable="false">
        <div class="modalcon fontsize14 errorContent">
            <slot name="smsDescribe" />
        </div>
        <div slot="footer">
            <Button type="default" @click="descModal = false">关闭</Button>
        </div>
    </Modal>
</template>

<script>
export default {
  data(){
      return {
          descModal:false,
          title:'失败描述',
          modalWidth:'400'
      }
  }
}
</script>

<style lang="scss" scoped>
  .modalcon{
      &>p{line-height: 30px;}
      &.errorContent{max-height:500px;overflow:auto;}
  }
</style>