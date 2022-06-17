<template>
  <DatePicker :type="type" v-model="selectValue" :options="options" :placeholder="placeholder" @on-change="handlechange" class="width-percent100"></DatePicker>
</template>

<script>

export default {
  watch:{
    value(){
      this.selectValue = this.value
    }
  },
  props: {
    type: {
      type: String,
      default: 'date'
    },
    value:{
      type: null,
      default: null
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    placeholder: {
      type: String,
      default: '请选择日期'
    }
  },
  name: 'datePickerUi',
  data () {
    return {
      selectValue:this.value
    }
  },

  components: {},

  mounted () {},

  methods: {
    handlechange (v) {
      this.$emit('update:value', v)
    }
  }

}

</script>
<style lang='' scoped>

</style>
