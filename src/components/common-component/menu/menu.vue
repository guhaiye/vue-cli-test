<template>
  <div class="scroll_menu_box1">
    <div class="scroll_menu_box2">
      <!-- 菜单 -->
      <Menu
        width="208px"
        ref="menuEle"
        :accordion="accordion"
        :active-name="activeName"
        :open-names="openNames"
      >
        <!-- 默认展示首页 -->
        <MenuItem
          v-if="index"
          title="首页"
          funccode="0"
          :data-issystem="true"
          to="/index"
          name="/index"
          ><i class="ioss-line_index"></i>首页</MenuItem
        >
        <!-- 子项 -->
        <template v-for="item in data">
          <YhSubmenu :depth="0" :key="item.id" :infos="item" />
        </template>
      </Menu>
      <!-- 暂无数据 -->
      <div align="center" v-show="data.length == 0">未搜索到...</div>
    </div>
  </div>
</template>

<script>
import menuBus from "./eventBus";
import YhSubmenu from "./yh-submenu.vue";

let Timer;
export default {
  components: { YhSubmenu },
  props: {
    // 首页
    index: {
      default: true,
    },
    // 搜索默认值
    value: {
      default: "",
    },
    // 列表
    data: {
      default: [],
    },
    // 展开集合
    openNames: {
      default: [],
    },
    // 手风琴
    accordion: {
      default: false,
    },
    // 主题 废了
    theme: {
      default: "",
    },
    // // 默认展示
    // activeName: {
    //   default: "",
    // },
    // 高亮颜色
    color: {
      default: "#3E98F1",
    },
  },
  data() {
    return {
      kw: { key: "", color: this.color },
      activeName: "",
    };
  },
  provide() {
    return { kws: this.kw };
  },
  watch: {
    value() {
      // 监听 value
      this.kw.key = this.value;
      menuBus.$emit("upload");
    },
    data() {
      this.ck();
    },
    "$route.path"() {
      this.ck();
    },
  },
  methods: {
    ck() {
      Timer && clearTimeout(Timer);
      Timer = setTimeout(() => {
        let path = this.$route.path;
        this.activeName = path;
          this.$refs.menuEle && this.$refs.menuEle.updateOpened();
      }, 300);
    },
  },
  mounted() {
    this.ck();
  },
};
</script>

<style>
</style>