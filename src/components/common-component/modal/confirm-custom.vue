/**
 * author       : guhaiye
 * createTime   : 20200319
 * description  : 自定义弹窗
 */
<template>
    <Modal
        v-model="deleteconfirm"
        :title="bindtitle"
        :width="modalwidth"
        :mask-closable="false">
        <div class="col-md-12 pd0 fontsize14">
            <slot>您确认要删除选中的信息吗？</slot>
        </div>
        <div slot="footer">
            <slot name="footeBtn">
                <Button type="default" :loading="loading" @click="btnMethod1">{{btnTxt1}}</Button>
                <Button type="primary" :loading="loadingsd" @click="btnMethod2">{{btnTxt2}}</Button>
            </slot>
        </div>
    </Modal>
</template>

<script>
export default {
  props:['btn1Way','btn2Way'],
  data(){
      return {
          deleteconfirm:false,
          modalwidth:'300',
          bindtitle:'提示',
          loading:false,
          loadingsd:false,
          btnTxt1:'确认',
          btnTxt2:'取消'
      }
  },
  methods:{
      btnMethod1(){
         this.btn1Way()
      },
      btnMethod2(){
         this.btn2Way()
      },
      closeModal(){
         this.deleteconfirm = false
         //防止闪烁
         let timer=setTimeout(()=>{
            this.loading = false;
            this.disabled = false;
            this.modalwidth = '300';
            this.bindtitle = '提示';
            this.loadingsd = false;
            this.confirmtxt = '确认';
            this.canceltxt = '取消';
            timer=null;
            clearInterval(timer)
         },200)
      }
  },
}
</script>

<style>

</style>