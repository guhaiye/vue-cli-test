import Vue from 'vue'
import {
  Column,
  Edit,
  Export,
  Filter,
  Footer,
  Form,
  Grid,
  Header,
  Keyboard,
  Menu,
  Table,
  Tooltip,
  Validator,
  VXETable
} from 'vxe-table'
import 'xe-utils'

// 表格模块
Vue.use(Header)
Vue.use(Footer)
Vue.use(Filter)
Vue.use(Edit)
Vue.use(Menu)
Vue.use(Tooltip)
Vue.use(Export)
Vue.use(Keyboard)
Vue.use(Validator)
Vue.use(Grid)
// 可选组件
Vue.use(Column)
Vue.use(Form)
// 安装表格
Vue.use(Table)

// 给 vue 实例挂载内部对象，例如：
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$XPrint = VXETable.print
Vue.prototype.$XSaveFile = VXETable.saveFile
Vue.prototype.$XReadFile = VXETable.readFile
