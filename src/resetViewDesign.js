import buttonConUi from '@/components/component/buttonCon'
import datePickerUi from '@/components/component/datePicker'
import exportBtnUi from '@/components/component/exportBtn'
import formUi from '@/components/component/form'
import inputUi from '@/components/component/input'
import tablePageLayout from '@/components/component/layout/tablePageLayout.vue'
import radioGroupUi from '@/components/component/radioGroup'
import searchBar from '@/components/component/searchBar'
import searchFormItemUi from '@/components/component/searchFormItem'
import searchToggleUi from '@/components/component/searchToggle'
import selectUi from '@/components/component/select'
import selectTreeUi from '@/components/component/selectTree'
import uploadUi from '@/components/component/upload'
import VxeGridUi from '@/components/component/vxe-table/index-vuegrid'

import pageSearchList from '@/components/component/pageSearchList/index'
import pageTable from '@/components/component/pageTable/index'
import pageBack from '@/components/component/pageBack/index'

export default {
  install: Vue => {
    let componentUi = [
      formUi,
      searchFormItemUi,
      inputUi,
      selectUi,
      datePickerUi,
      searchToggleUi,
      VxeGridUi,
      buttonConUi,
      exportBtnUi,
      uploadUi,
      searchBar,
      tablePageLayout,
      selectTreeUi,
      radioGroupUi,
      pageSearchList,
      pageTable,
      pageBack
    ]
    componentUi.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}