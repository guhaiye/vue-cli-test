/**
 * author       : yunfei
 * createTime   : 20200914
 * description  : 自定义列
 * params columnsCheckebox : 复选 元素
 * params columnsTableObj : table列（对象格式）
 * params changColumnsTable : 保存回调
 */

<template>
  <Dropdown
    trigger="custom"
    class="co_option_continer"
    :visible="visible"
    placement="bottom-end"
  >
    <div class="co_option-dropdown btn btn-outline-info">
      <a href="javascript:void(0)" @click="handleOpen" title="自定义列">
        <i class="ivu-icon ioss-Ncode"></i>
      </a>
    </div>
    <DropdownMenu slot="list" class="co_option_box">
      <Row class="co_option_body">
        <Row>
          <Col span="8" style="font-weight: 900">自定义列</Col>
          <Col span="16" align="right">
            <Button
              type="primary"
              class="co-button"
              @click="handleOk"
              size="small"
              icon="md-checkmark"
              >确定</Button
            >
            <Button
              class="co-button"
              size="small"
              @click="handleClose"
              icon="md-close"
              >取消</Button
            >
          </Col>
        </Row>
        <!-- 查询 -->
        <Row class="mt-2 mb-2">
          <Input
            clearable
            prefix="ios-search"
            @on-change="filterKey"
            size="small"
            style="width: 100%"
            placeholder="搜索"
          />
        </Row>
        <Row class="checked_head pt-1 pb-1">
          <Col span="6" align="center" style="border-right: 1px solid #d8e8fc">
            <Checkbox
              style="margin-right: -1px"
              @on-change="handleAll"
              @
              v-model="changeAll"
              >{{ "" }}</Checkbox
            >
          </Col>
          <Col spna="18" align="center">字段名称</Col>
        </Row>
        <!-- 列表 -->
        <Row class="ck_box">
          <Row
            v-for="(e, index) in columnsCheckeboxES"
            v-show="e.show"
            :key="e.id"
          >
            <Col class="co_option_border co_bor_b" span="6" align="center">
              <Checkbox
                :label="e.id"
                v-model="e.checked"
                :disabled="e.disabled"
                @on-change="(v) => changeTableColumns(v, index)"
                >{{ "" }}</Checkbox
              >
            </Col>
            <Col
              class="co_option_border co_bor_l co_bor_b"
              span="18"
              align="center"
              >{{ e.name }}</Col
            >
          </Row>
        </Row>
      </Row>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
const kong = new RegExp("", "g");
export default {
  data() {
    return {
      visible: false,
      changeAll: false,
      columnsCheckeboxES: [],
    };
  },
  props: {
    columnsCheckebox: {
      type: Array,
      default: [],
    },
    columnsTableObj: {
      type: Object,
      default: {},
    },
    changColumnsTable: {
      type: Function,
      default: function () {
        throw new Error("请填写事件回调");
      },
    },
    minSize: {
      type: Number,
      default: 3,
    },
  },
  methods: {
    // 过滤
    filterKey(v) {
      // 过滤逻辑
      v = v.target.value;
      let { columnsCheckeboxES } = this;
      this.columnsCheckeboxES = columnsCheckeboxES.map((e) => {
        if (e.name.indexOf(v) != -1) {
          e.show = true;
        } else {
          e.show = false;
        }
        return e;
      });
      //全选判断
      this.ifChecked();
    },
    // 全选
    handleAll(state) {
      let { columnsCheckeboxES } = this;
      if (state) {
        this.columnsCheckeboxES = columnsCheckeboxES.map((e) => {
          if (e.show && !e.disabled) {
            e.checked = true;
          }
          return e;
        });
      } else {
        this.columnsCheckeboxES = columnsCheckeboxES.map((e) => {
          if (e.show && !e.disabled) {
            e.checked = false;
          }
          return e;
        });
      }
    },
    // 弹出层
    handleOpen() {
      this.ifChecked();
      this.visible = true;
    },
    // 比较本地 与 服务器数据，防止新增列无法存入到服务器
    preinit(columnsCheckebox) {
      let flexCk = this.columnsCheckebox;
      let httpCk = columnsCheckebox;
      let arr = [];
      flexCk.forEach((e) => {
        let key = e.id;
        let item = httpCk.filter((e2) => e2.id == key);
        if (item.length) {
          item = item[0];
          arr.push({
            id: key,
            name: e.name,
            checked: item.checked ? true : false,
            show: item.show ? true : false,
            disabled: item.disabled ? true : false,
          });
        } else {
          arr.push(e);
        }
      });
      return arr;
    },
    init(columnsCheckebox) {
      let tgCk = this.preinit(columnsCheckebox);
      this.columnsCheckeboxES = tgCk;
      let columnsTableObj = this.columnsTableObj;
      let column = []; // client column
      tgCk.forEach((ele) => {
        if (ele.checked) {
          column.push(columnsTableObj[ele.id]);
        }
      });
      //更新列表
      this.changColumnsTable(column, false);
    },
    handleOk() {
      let columnsTableObj = this.columnsTableObj;
      let columnsCheckeboxES = this.columnsCheckeboxES;
      let postCol = []; //server Col
      let column = []; // client column
      columnsCheckeboxES.forEach((ele) => {
        if (ele.checked) {
          column.push(columnsTableObj[ele.id]);
        }
        postCol.push({ ...ele, show: true });
      });
      //更新列表
      if (column.length >= this.minSize) {
        this.changColumnsTable(column, postCol);
        this.visible = false;
      } else {
        this.$Message.warning("至少保留3列！");
      }
    },
    handleClose() {
      this.visible = false;
    },
    // 全选判断
    ifChecked() {
      let flag = true;
      this.columnsCheckeboxES.map((e) => {
        if (e.show) {
          if (e.checked != true) {
            flag = false;
          }
        }
      });
      if (flag) {
        this.changeAll = true;
      } else if (this.changeAll) {
        this.changeAll = false;
      }
    },
    // 列更改
    changeTableColumns(v, index) {
      this.ifChecked();
    },
    toggleFav(index) {
      this.tableData2[index].fav = this.tableData2[index].fav === 0 ? 1 : 0;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.co_option_continer {
  .ivu-row {
    width: 100%;
  }
  .ivu-dropdown-rel a {
    color: #515a6e;
  }
  .btn-outline-info {
    border-color: #dcdee2 !important;
  }
  .co_option-dropdown {
    min-height: 20px !important;
    line-height: 15px;
    padding: 0 3px;
  }
  .co_option-dropdown:hover {
    a {
      i {
        color: #ffffff;
      }
    }
  }
  .co_option_box {
    background: #f8f8f9;
    .co-button {
      border-radius: 5px;
      width: 55px;
      font-size: 12px;
      padding: 0;
      line-height: 18px;
      height: 20px;
    }
    .ivu-btn i {
      margin-right: 0;
    }

    .co_option_body {
      width: 210px;
      padding: 5px;
      color: #000;
    }
    //   复选框头部
    .checked_head {
      background: #e6effd;
      overflow-y: scroll;
    }
    .ck_box {
      font-size: 12px;
      max-height: 160px;
      overflow-y: scroll;
    }
    //边框
    .co_option_border {
      border: 1px solid #d8e8fc;
    }
    .co_bor_l {
      border-left: 0;
    }
    .co_bor_b {
      border-bottom: 0;
    }
    .ck_box {
      border-bottom: 1px solid #d8e8fc;
    }
    .ivu-checkbox-wrapper {
      margin-right: 0;
    }
  }
}
</style>