<template>
    <RadioGroup @on-change="inputChange" v-model="inputValue" >
        <Radio v-for="item in optionArr" :key="item.value" :label="item.value">
           {{item.name}}
        </Radio>
    </RadioGroup>
</template>

<script>

  export default {
    watch:{
      value:{
        handler(n){
          this.inputValue = n
        },
        immediate:true
      },
    },
    props:{
       value:{
         type:String,
         default:''
       },
       optionArr:{
           type:Array,
           default:()=>{
               return []
           }
       }
    },
    name:'radioGroupUi',
    data () {
      return {
        inputValue:this.value,
      };
    },

    components: {},

    mounted() {

    },

    methods: {
      inputChange(v){
        console.log(v)
        this.$emit('update:value', v)
      }
    },


  }

</script>
<style lang='' scoped>

</style>