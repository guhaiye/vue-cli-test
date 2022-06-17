<template>
  <Treeselect
    v-model="value"
    :placeholder="placeholder"
    :multiple="isMultiple"
    noOptionsText="暂无数据"
    noResultsText="暂无数据"
    :normalizer="normalizer"
    :options="options"
  />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "selectTreeUi",
  watch: {
    choiceVal() {
      this.value = this.choiceVal;
    },
    value() {
      this.$emit("update:choiceVal", this.value);
    },
  },
  props: {
    id: {
      type: String,
      default: "id",
    },
    label: {
      type: String,
      default: "label",
    },
    children: {
      type: String,
      default: "children",
    },
    placeholder: {
      type: String,
      default: "",
    },
    choiceVal: {
      type: [String, Array],
      default: () => {
        return [];
      },
    },
    isMultiple: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      value: null,
      normalizer: (node) => {
        return {
          id: node[this.id],
          label: node[this.label],
          children: node[this.children],
        };
      },
    };
  },

  components: { Treeselect },

  mounted() {},

  methods: {},
};
</script>
<style lang="" scoped></style>
