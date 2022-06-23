/**
 * @param {array} arr :重新生成html
 * @param {function} h:vue的h函数
 * description：将操作重新生成页面元素，数组有三个就直接显示数组，超过三个，生成更多下拉，显示其他的操作 
 */
import {Dropdown,DropdownMenu,DropdownItem} from 'view-design'
export function operatorBtn(arr,h){
    let operator_arr = []
    if(arr.length > 3){
        let new_arr_before = arr.slice(0,2);
        let new_arr_after = arr.slice(2);
        operator_arr.push(new_arr_before)
        var newAfter = []
        new_arr_after.forEach(e => {
            newAfter.push(h(DropdownItem,{
                attrs:{
                    class:'btnlist_content'
                }
            },[e]))
        })
        let dropdown_ele = h(Dropdown,{
            attrs:{
              placement:'top-end',
              transfer:true
            }
        },[
            h('a',{
                attrs:{
                    class:'table-operate-btn-more'
                }
            },['更多',
                h('i',{
                    attrs:{
                       class:'ivu-icon ivu-icon-ios-arrow-down'  
                    }
                })
            ]),
            h(DropdownMenu,{
             slot:'list'  
            },newAfter)
        ])
        operator_arr.push(dropdown_ele)
     }else{
        operator_arr = arr
     }
     return h('div',{
        attrs:{
            class:'table-operate-btn'
        }
     },operator_arr)
}
