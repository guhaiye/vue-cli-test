/** 
author:haiye
time：20220511
dees：锚点
*/
<template>
   <div  class="anchor-con">
      <div class="ivu-anchor-link" v-for="(item,index) in anchorArr" :key="index">
          <a href="#auchor1" :id="'link-anchor'+index" @click="jumpToAuchor(index)" class="ivu-anchor-link-title">
              <slot name="anchorcon" :anchorItem="item"></slot>  
          </a> 
      </div>
   </div>
</template>

<script>

  export default {
    name:'auchorUi',
    data () {
      return {
        anchorArr:[{name:'ssss',num:'23'}]
      };
    },

    components: {},

    mounted() {
    },

    methods: {
        jumpToAuchor(id){
          let _arr = document.querySelectorAll(".ivu-anchor-link")
          _arr.forEach(v=>{
            v.className = 'ivu-anchor-link'
          })
          if(window.document.querySelector("#auchor"+id)){
           window.document.querySelector("#auchor"+id).scrollIntoView(true)
          }
          window.document.querySelector("#link-anchor"+id).parentNode.classList.add('ivu-anchor-link-active')
        }
    },


  }

</script>
<style lang='scss' scoped>
@import './index.scss';
</style>