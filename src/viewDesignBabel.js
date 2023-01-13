import { Table, Page, Button, Row, Col, Split, Menu, MenuItem, Tabs, TabPane, Dropdown, DropdownMenu, DropdownItem, Breadcrumb, BreadcrumbItem, Badge, Steps, Step, Form, FormItem, Input, Radio, Checkbox, Switch, Select, Option, AutoComplete, DatePicker, Cascader, Transfer, Upload, Message, Modal, Tree, Tooltip, Tag, Timeline, TimelineItem, Spin, Icon, Submenu, RadioGroup, Poptip, CheckboxGroup, Collapse, Panel, InputNumber, Divider, Drawer, Anchor, AnchorLink, Affix, Avatar, Circle, ButtonGroup, TimePicker, Search, WarpVxeTable, TitleLine, uploadYh, TransferTree, ColumnSet } from 'szyh-view-ui'
import Vue from 'vue'

// import warpVxeTable1 from '@/components/component/warp-vxe-table/index'
let componentUi = [Table, Page, Button, Row, Col, Split, Menu, MenuItem, Tabs, TabPane, Dropdown, DropdownMenu, DropdownItem, Breadcrumb, BreadcrumbItem, Badge, Steps, Step, Form, FormItem, Input, Radio, Checkbox, Switch, Select, Option, AutoComplete, DatePicker, Cascader, Transfer, Upload, Message, Modal, Tree, Tooltip, Tag, Timeline, TimelineItem, Spin, Icon, Submenu, RadioGroup, Poptip, CheckboxGroup, Collapse, Panel, InputNumber, Divider, Drawer, Anchor, AnchorLink, Affix, Avatar, Circle, ButtonGroup, Search, TitleLine, uploadYh, TransferTree, ColumnSet]
componentUi.forEach(component => {
  Vue.component(component.name, component)
})
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
Vue.component('WarpVxeTable', WarpVxeTable)
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
