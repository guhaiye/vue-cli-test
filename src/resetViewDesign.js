import formUi from '@/components/component/form'
import searchFormItemUi from '@/components/component/searchFormItem'
import inputUi from '@/components/component/input'
import selectUi from '@/components/component/select'
import datePickerUi from '@/components/component/datePicker'
import searchToggleUi from '@/components/component/searchToggle'
import VxeGridUi from '@/components/component/vxe-table/index-vuegrid'
import buttonConUi from '@/components/component/buttonCon'
import uploadUi from '@/components/component/upload'
import searchBar from '@/components/component/searchBar'
import exportBtnUi from '@/components/component/exportBtn'
import tablePageLayout from '@/components/component/layout/tablePageLayout.vue'
import selectTreeUi from '@/components/component/selectTree'
import radioGroupUi from '@/components/component/radioGroup'

export default {
  install: (Vue) => {
    let componentUi = [formUi, searchFormItemUi, inputUi, selectUi, datePickerUi, searchToggleUi, VxeGridUi, buttonConUi, exportBtnUi, uploadUi, searchBar, tablePageLayout, selectTreeUi, radioGroupUi]
    componentUi.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}