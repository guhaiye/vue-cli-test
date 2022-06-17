<template>
     <Form
        :ref="refName"
        :model="modalName"
        :rules="ruleValidate"
        class="width-percent100"
        autocomplete="off"
        :label-width="labelWidth" 
        onsubmit="return false;"
      >
      <Row>
        <slot />
      </Row>
     </Form>
</template>

<script>

export default {
  props: {
    refName: {
      type: String,
      default: 'formValidate'
    },
    modalName: {
      type: Object,
      default: () => {
        return {}
      }
    },
    labelWidth: {
      type: Number,
      default: 70
    },
    ruleValidate: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'formUi',
  data () {
    return {

    }
  },

  components: {},

  mounted () {},

  methods: {}

}

</script>
<style lang='scss' scoped>

</style>
