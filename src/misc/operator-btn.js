import {Dropdown,DropdownMenu} from 'view-design'
/**
 * @param {array} arr :重新生成html
 * @param {function} h:vue的h函数
 * description：将操作重新生成页面元素，数组有三个就直接显示数组，超过三个，生成更多下拉，显示其他的操作 
 */
export function operatorBtn(arr,h){
    let operator_arr = []
    if(arr.length > 3){
        let new_arr_before = arr.slice(0,2);
        let new_arr_after = arr.slice(2);
        operator_arr.push(new_arr_before)
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
            },[h('div',{
                attrs:{
                    class:'btnlist_content'
                }
            },new_arr_after)])
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