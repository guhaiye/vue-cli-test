import {operatorBtn} from '@/misc/operator-btn'
import {styleVisible} from "@/misc/root-common";
export const tableColumn = (vm) =>{
  return [{
      type:'seq',
      title:'序号',
      width:80
  },{
      field:"title",
      title:'标题',
      width:360
  },{
      field:"documentNumber",
      title:'文号',
      width:200
  },{
    field:"timeLiness",
    title:'时效性',
    width:100
  },{
    field:"publishUnit",
    title:'发文单位',
    width:200
  },{
    field:"dispatchDate",
    title:'发文日期',
    width:150
  },{
    field:"status",
    title:'状态',
    width:100,
  },{
    field:"source",
    title:'来源',
    width:110
  },{
    field:"createBy",
    title:'录入人',
    width:100
  },{
    field:"createDate",
    title:'录入日期',
    minWidth:150
  },{
    width: 120,
    title:'操作',
    fixed:'right',
    slots: {
      default: ({ row, column },h) => {
        const {id,statusCode} = row;
        var arr = [];
        //草稿0：编辑和删除  审核中1：预览和审批  已发布2：预览  已撤回3：编辑和删除
        arr.push(h('a',{
          attrs:{
          'title':'编辑',
            class:'vouchericon'
          },
          on:{
            click:()=>{
              vm.$router.push('./edit/'+id)
            }
          }
        },'编辑'))
        arr.push(h('a',{
          attrs:{ 
          'title':'删除',
            class:'vouchericon'
          },
          on:{
            click:()=>{
              vm.$refs.confirmdel.deleteconfirm = true;
              vm.delids = id;
            }
          }
        },'删除'))
        arr.push(h('a',{
          attrs:{
          'title':'审批',
            class:'vouchericon'
          },
          on:{
            click:()=>{
              vm.$router.push('./audit/'+id)
            }
          }
        },'审批'))
        arr.push(h('a',{
          attrs:{
          'title':'预览',
            class:'vouchericon'
          },
          on:{
            click:()=>{
              vm.$router.push('./preview/'+id)
            }
          }
        },'预览'))
        return [operatorBtn(arr,h)]
    }
    }
  }]
} 