import {Table,Page,Button,Row,Col,Split,Menu,MenuItem,Tabs,TabPane,Dropdown,DropdownMenu,DropdownItem,Breadcrumb,BreadcrumbItem,Badge,Steps,Step,Form,FormItem,Input,Radio,Checkbox,Switch,Select,Option,AutoComplete,DatePicker,Cascader,Transfer,Upload,Message,Modal,Tree,Tooltip,Tag,Timeline,TimelineItem,Spin,Icon,Submenu,RadioGroup,Poptip,CheckboxGroup,Collapse,Panel,InputNumber,Divider,Drawer,Anchor,AnchorLink,Affix,Avatar} from 'view-design';
import Vue from 'vue'
let componentUi = [Table,Page,Button,Row,Col,Split,Menu,MenuItem,Tabs,TabPane,Dropdown,DropdownMenu,DropdownItem,Breadcrumb,BreadcrumbItem,Badge,Steps,Step,Form,FormItem,Input,Radio,Checkbox,Switch,Select,Option,AutoComplete,DatePicker,Cascader,Transfer,Upload,Message,Modal,Tree,Tooltip,Tag,Timeline,TimelineItem,Spin,Icon,Submenu,RadioGroup,Poptip,CheckboxGroup,Collapse,Panel,InputNumber,Divider,Drawer,Anchor,AnchorLink,Affix,Avatar]
componentUi.forEach(component => {
    Vue.component(component.name,component)
})
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('DatePicker', DatePicker)
Vue.component('DatePicker', DatePicker)
Vue.prototype.$Message = Message