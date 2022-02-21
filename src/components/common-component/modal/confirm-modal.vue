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
        :mask-closable="false">
        <div class="col-md-12 pd0 fontsize14">
            <Icon :type="icon" v-if="showIcon"/>   <slot>{{modalText}}</slot>
        </div>
        <div slot="footer">
            <Button type="default" @click="showModal=false">取消</Button>
            <Button type="primary" :loading="disabled" @click="createReportSure">确定</Button>
        </div>
    </Modal>
</template>

<script>
export default {
  props:{
       modalSure:{
          type:Function,
          required:true,
      },
      modalText:{
          type:String,
          required:true
      },
      modalStyle:{
          type:Object,
      },
      className:{
          type:String,
      },
      showIcon:{
          type:Boolean,
          default:false
      },
      icon:{
          type:String
      },
      title:{
         type:String, 
      },
      width:{
         type:Number,
         default:300
      },
  },
  data(){
      return {
          showModal:false,
          disabled: false,
      }
  },

  methods:{
      createReportSure(){
         this.modalSure();
      },
  }
}
</script>

<style lang="scss" scoped>
  
</style>