<template>
  <div class="page-table">
    <warpVxeTable
      ref="wrapVxeTable"
      :tableData="tableData"
      v-bind="$props"
      v-on="$listeners"
      :loadTable="loadTable"
    ></warpVxeTable>
    <ColumnSet
      v-if="IS_COLUMNS"
      class="column-set"
      :value="columnsTable"
      :langRangeData="arr1"
      @overCallback="overCallback"
    />
  </div>
</template>

<script>
import { getSearchField } from '@/misc/root-common'

export default {
  components: {},

  props: {
    columnsTable: {
      default: () => [],
      type: Array,
      required: true
    },
    rowConfig: {
      type: Object, //是否分页
      default: () => ({})
    },
    treeConfig: {
      type: Object, //是否分页
      default: () => ({})
    },
    IS_COLUMNS: {
      type: Boolean,
      default: false
    },
    IS_PAGE: {
      type: Boolean, //是否分页
      default: true
    },
    maxHeight: {
      type: Number
    },
    ellipsisAble: {
      default: 'tooltip' //是否单元格溢出(...)
    },
    resizAble: {
      type: Boolean, //是否允许拖动列
      default: true
    },
    alignCell: {
      default: 'left',
      type: String //表格对齐方式 可选 -left -center -right
    },
    remoteAble: {
      default: true //是否服务端排序
    },
    tableOptions: {
      type: Object, //额外props
      default: () => ({})
    },
    refName: {
      type: String, //额外props
      default: 'tableModal'
    },
    rowId: {
      type: String,
      default: 'id'
    },
    CheckboxConfig: {
      type: Object, //checkbox配置项
      default: () => ({})
    },
    border: {
      type: [String, Boolean],
      default: 'inner'
    },
    batchText: {
      type: String,
      default: '批量移除'
    },
    batchFn: {
      type: Function,
      default: () => function () {}
    },
    openBatch: {
      type: Boolean,
      default: true
    }
  },
  computed: {},
  name: 'pageTable',
  data() {
    return {
      tableData: [],
      params: {},
      tablePage: {
        total: 0,
        current: 1,
        pageSize: 15,
        pageSizeOpt: [15, 25, 40, 50, 100]
      },
      arr1: {
        arr1: [{ disabled: false, show: true, title: 'wo' }],
        arr2: [{ disabled: false, show: true, title: 'ni' }],
        arr3: [{ disabled: false, show: true, title: 'xx' }]
      }
    }
  },
  created() {
    // 测试数据
    // const timer = setTimeout(() => {
    //   this.loadColumns(timer)
    // }, 3000)
  },
  methods: {
    tabelTotal(total) {
      this.tablePage.total = total
      this.$refs.wrapVxeTable.tablePage.total = total
    },
    //获取数据
    /*数据f返回重组
    module: 接口属于哪个模块
    api: 接口地址
    condition: restful放到condition里面的条件 如[{"f":"sellerName","v":"销方公司","op":"eq"}]
    params: 除page,per_page,condition外的其他的条件
    formValid: 查询条件的form  如：this.formValidate
    rest[0]是一个json，内部包含api，condition，params，formValid
    */
    loadTable(...rest) {
      this.$loading.show()
      this.tableData = []
      const { module, api, condition, params, formValid, pagejump } = this.params
      const tablePage = this.$refs.wrapVxeTable.tablePage
      pagejump == undefined || (rest.indexOf('pagejump') && (tablePage.current = 1))
      this.$refs.wrapVxeTable.selectdata = []
      const { current, pageSize } = tablePage
      let _module = !!module ? module : ''
      let _api = !!api ? api : ''
      let _condition = !!condition ? condition : []
      let _params = !!params ? params : {}
      let _form = !!formValid ? formValid : []
      var conarr = getSearchField(_condition, _form)
      let paramsObj = {
        page: current,
        per_page: pageSize,
        condition: JSON.stringify(conarr)
      }
      if (Object.keys(_params).length > 0) {
        for (let k in _params) {
          paramsObj[k] = _params[k]
        }
      }
      this.$api[_module][_api](paramsObj)
        .then(res => {
          const { data, page, result } = res.data
          if (result == 'success') {
            this.tableData = Array.isArray(data) ? data : data.result
            this.tabelTotal(page ? page.total : data.totalCount)
            // this.checkedData()
          }
          this.$loading.hide()
        })
        .catch(err => {
          this.$loading.hide()
        })
    },
    overCallback(data) {
      this.$refs.wrapVxeTable.$refs[this.refName || 'tablecon'].reloadColumn(data)
      const saveData = data.concat().map(item => {
        return item.slots ? { ...item, ...{ slots: {} } } : item
      })
      this.saveColumns(saveData)
    },
    saveColumns() {},
    loadColumns() {
      // 测试数据
      // const resData = [{
      //   field: 'title',
      //   title: '项目名称',
      //   width: 360,
      //   fixed: 'left',
      // },
      // {
      //   field: 'documentNumber',
      //   title: '对应企业数',
      //   width: 200
      // }]
      let loadData = []
      resData.forEach(resItem => {
        let find = false
        this.columnsTable.concat().forEach(item => {
          if (resItem.field == item.field) {
            find = true
            loadData.push(item.slots ? { ...item, ...{ slots: item.slots } } : resItem)
          }
        })
        if (!find) loadData.push(resItem)
      })
      this.$refs.wrapVxeTable.$refs[this.$props.refName || 'tablecon'].reloadColumn(loadData)
    }
  }
}
</script>

<style lang="scss">
.page-table {
  position: relative;
  .column-set {
    position: absolute;
    right: 10px;
    top: -30px;
  }
}
</style>
