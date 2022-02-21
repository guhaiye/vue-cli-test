<template>
  <Submenu :name="infos.id">
    <!-- 标题 -->
    <template slot="title">
      <div :class="depth == 0 && 'menu_icon_left'">
        <i v-if="depth == 1" :class="infos.icon" />
        <adornTxt :txt="infos.title" />
      </div>
    </template>
    <!-- 选项 -->
    <template v-for="item in infos.children">
      <div>
        <!-- 是否 下钻 -->
        <MenuItem
          v-if="
            !hasChildren(item) &&
            item &&
            (!item.children || item.children.length == 0)
          "
          :funccode="item.funccode"
          :data-issystem="isSystemConfig(item.path) ? 'true' : 'false'"
          :to="item.path"
          :title="item.title"
          :key="item.id"
          :name="item.path"
        >
          <i v-if="depth == 0" :class="item.icon" />
          <adornTxt :txt="item.title" />
        </MenuItem>
        <!-- 循环 -->
        <YhSubmenu v-else :depth="depths" :key="item.id" :infos="item" />
      </div>
    </template>
  </Submenu>
</template>

<script>
/**
 * @description：路由
 */
import adornTxt from './yh-menu-txt.vue';
export default {
  components: {
    YhSubmenu: () => import("./yh-submenu.vue"),
    adornTxt,
  },
  props: ["infos", "depth"],
  computed: {
    depths() {
      return this.depth + 1;
    },
  },
  methods: {
    //判断是否是权限管理
    isSystemConfig(tag) {
      if (tag != "") {
        var tagarr = tag.split("/");
        if (tagarr[2] == "systemConfig") {
          return true;
        }
        return false;
      }
    },
    hasChildren(data) {
      if (data.children) {
        if (Object.keys(data.children).length) {
          return true;
        }
      }
      return false;
    },
  },
  mounted() {
  },
};
</script>

<style>
</style>