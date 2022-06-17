<template>
    <searchFormItem class="text-right" :labelWidth="0">
        <a href="javascript:;" title="查询" class="btn searchBtn" @click="loadTable">
            搜索
        </a>
        <a href="javascript:;" title="重置" class="btn searchresetBtn ml-2" @click="resetDataResult">
            重置
        </a>
        <a v-if="hasHigh" href="javascript:;" id="searchHigh" @click="filterSearch" class="ml-2">高级搜索 <i class="ivu-icon ml-1" :class="arrowClass"></i></a>
    </searchFormItem>
</template>

<script>
  import searchFormItem from '@/components/component/searchFormItem'
  export default {
    props:{
        isSearchHigh:{
            type:Boolean,
            default:()=>{
                return false
            }
        },
        loadTable:{
            type:Function,
            default:()=>{
              return ()=>{}
            }
        },
        resetDataResult:{
            type:Function,
            default:()=>{
              return ()=>{}
            }
        },
        hasHigh:{
            type:Boolean,
            default:false
        }
    },
    name:'searchToggleUi',
    data () {
      return {
        arrowClass:'ivu-icon-ios-arrow-down',
      };
    },

    components: {searchFormItem},

    mounted() {},

    methods: {
        filterSearch(){
            let _high = this.isSearchHigh?false:true;
            this.$emit('update:isSearchHigh',_high)
            this.arrowClass = this.isSearchHigh?'ivu-icon-ios-arrow-down':'ivu-icon-ios-arrow-up'
        }
    },


  }

</script>
<style lang='' scoped>

</style>