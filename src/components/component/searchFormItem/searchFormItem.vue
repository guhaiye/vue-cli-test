<template>
    <Col :order="order" :span="spanNum" :offset='offsetNum'>
        <FormItem :prop="name" :label="labelName" :label-width="labelWidth" :rules="rules" :class="className">
            <slot />
        </FormItem>
    </Col>
</template>

<script>

  export default {
    props:{
        name:{
          type:String,
          default:''
        },
        labelName:{
          type:String,
          default:''
        },
        className:{
          type:String,
          default:''
        },
        labelWidth:{
          type:Number,
          default:null
        },
        spanNum:{
          type:[Number,String],
          default:6
        },
        offsetNum:{
          type:[Number,String],
          default:0
        },
        order: {
          type:String,
          default:'0'
        },
        rules:{
          type:Array
        }
    },
    name:'searchFormItemUi',
    data () {
      return {

      };
    },

    components: {},

    mounted() {},

    methods: {},


  }

</script>
<style lang='' scoped>

</style>