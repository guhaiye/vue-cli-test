/**
 * author       : guhaiye
 * createTime   : 20200313
 * description  : 销项，分类编码详细公用接口
 */
<template>
    <Modal class="detailmodal-con" v-model="detailmodalshow" title="基本信息" :mask-closable="false">
      <div class="col-md-12 pd0">
         <Row>
             <Col :span='5' class="invoice-date">
                <span>开票日期： <label for="">{{ invoicecon.billingDate | filterFormatDate('v','date') }}</label></span>    
             </Col>
             <Col :span='13' class="invoice-name">
                <h4>{{ invoicecon.invoiceType | filterInvoiceType }}</h4>
                <span></span>
                <span></span>
             </Col>
             <Col :span='6' class="invoice-code">
                <span class="tx_over" :title="invoicecon.invoiceCode">发票代码： <label for="">{{ invoicecon.invoiceCode }}</label></span>
                <span class="tx_over" :title="invoicecon.invoiceNumeric">发票号码： <label for="">{{ invoicecon.invoiceNumeric }}</label></span>
             </Col>
         </Row>
         <Row class="mt-2  invoice-table-tit">
             <Col :span='3' class="invoice-table-tit1">
             购货单位 
             </Col>
             <Col :span="9" class="invoice-table-tit1 text-left">
                <div class="tx_over">
                    <label for="" class="font-bold">名称：</label>
                    <span :title="invoicecon.buyer">{{invoicecon.buyer}}</span>
                </div>
             </Col>
             <Col :span="4" class="invoice-table-tit1">
             纳税人识别号 
             </Col>
             <Col :span='8'>
               {{invoicecon.buyTaxpayerNumeric}}
             </Col>
         </Row>
         <!-- <slot name='invoicecontent' /> -->
         <Table 
            class="pt-1 pb-1"
            height="143"
            border
            :columns="columnsTableInvoice"
            size="small"
            :data="dataTableInvoice"
            show-summary
            :summary-method="handleSummary"
            stripe>
        </Table>
        <Row class="invoice-table-tail">
            <Col :span='3' class="invoice-table-tit1">
            价税合计 
            </Col>
            <Col :span="9">
            {{invoicecon.sumDx}}
            </Col>
            <Col :span="3" class="invoice-table-tit1">
            小写 
            </Col>
            <Col :span='9'>
             {{invoicecon.sum}}
            </Col>
        </Row>
         <Row class="invoice-table-box">
             <Col :span='12'>
                 <div class="invoice-table-boxcon">
                    <label>即征即退选项：</label>
                    <span>{{invoicecon.levyRefund | levyOptFilter}}</span>
                 </div>
                 <div class="invoice-table-boxcon">
                    <label>计税方式：</label>
                    <span>{{invoicecon.declareOpt | declareOptFilter}}</span>
                 </div>
             </Col>
             <Col :span='12'>
                 <div class="invoice-table-boxcon">
                    <label>是否作废：</label>
                    <span>{{invoicecon.isVoided}}</span>
                 </div>
             </Col>
         </Row>
         <Row class="invoice-table-tit invoice-table-tit2">
             <Col :span='3' class="invoice-table-tit1">
             销货单位 
             </Col>
             <Col :span='9' class="invoice-table-tit1 text-left">
                <div class="tx_over">
                    <label for="" class="font-bold">名称：</label>
                    <span :title="invoicecon.seller">{{ invoicecon.seller }}</span>
                </div>
             </Col>
             <Col :span='4' class="invoice-table-tit1">
               纳税人识别号
             </Col>
             <Col :span='8'>
               {{ invoicecon.sellTaxpayerNumeric }}
             </Col>
         </Row>
      </div>
      <div slot="footer"></div>
    </Modal>
</template>

<script>
import { formatDate,formatMonthDate,formatMoneyDx,regularNum } from '@/misc/root-common'
import { getApiAsync,dataTransferText} from '@/misc/baseDict'
let vm = {};
export default {
   filters:{
     filterFormatDate(v,...args){
       if(args[1] == 'date'){
          return formatDate(v)
       }else if(args[1] == 'month'){
          return formatMonthDate(v)
       }
     },
     levyOptFilter(){
       var levy_opt = vm.invoicecon.levyRefund;
       if(levy_opt == '1'){
         return '一般项目'
       }else if(levy_opt == '2'){
         return '即征即退'
       }else if(levy_opt == '3'){
         return '共同分担'
       }else{
         return ''
       }
     },
     filterInvoiceType(v){
      return dataTransferText(vm.invoiceArr,v,'INVOICE_TYPE')
     },
     declareOptFilter(v){
       if(v == '1'){
         return '一般计税'
       }else if(v == '2'){
         return '简易征收'
       }else if(v == '3'){
         return '免抵退税'
       }else if(v == '4'){
         return '免税'
       }
     }
   },
   data(){
       vm = this;
       return{
        invoicecon:{
          billingDate:'',
          invoiceType:'',	
          invoiceCode:'',
          invoiceNumeric:'',
          seller:'',
          sellTaxpayerNumeric:'',	
          levyRefund:'',
          buyer:'',
          buyerTaxnum:'',
          isVoided:'',
          declareOpt:'',
          sum:'',
          sumDx:'',
        },
        detailmodalshow:false,
        columnsTableInvoice:[
            {
                title: "货物或应税劳务名称",
                key: "detailName",
                ellipsis: true,
                minWidth: 300,
                tooltip: true
            },
            {
                title: "征税项目",
                width: 100,
                key: "parentCode",
                ellipsis: true,
                tooltip:true,
                render:(h,params)=>{
                  var parentCode = params.row.parentCode;
                  var parentCode_text = '';
                  if(parentCode == '1'){
                    parentCode_text = '应税货物'
                  }else if(parentCode == '2'){
                    parentCode_text = '应税劳务'
                  }else if(parentCode == '3'){
                    parentCode_text = '应税服务、不动产、无形资产'
                  }else{
                    parentCode_text = parentCode
                  }
                  return h('span',parentCode_text)
                }
            },
            {
                title: "数量",
                width: 100,
                key: "num",
            },
            {
                title: "税率",
                key: "taxRate",
                width: 100,
                align:'right'
            },
            {
                title: "不含税金额",
                key: "invoiceAmount",
                width: 103,
                align:'right'
            },
            {
                title: "税额",
                key: "taxAmount",
                width: 100,
                align:'right'
            }
          ],
          dataTableInvoice:[],
          invoiceArr:getApiAsync('INVOICE_TYPE').then((res)=>{this.invoiceArr = res})
       }
   },
   methods:{
      getInvoiceDetail(id){
        var params = {id:id}
        this.$loading.show();
        this.$api.commonApi.queryCheckXxVatInfo(params).then((res)=>{
          var result = res.data.result;
          if(result == 'success'){
             const {orgXxVat,orgXxVats,sum} = res.data.data;
             this.invoicecon = orgXxVat;
             this.dataTableInvoice = orgXxVats;
             this.invoicecon.sum = regularNum(sum)
             this.invoicecon.sumDx = formatMoneyDx(sum)
          }
          this.$loading.hide();
        }).catch(err=>{
          this.$loading.hide();
        })
      },
      handleSummary ({ columns, data }) {
            const sums = {};
            columns.forEach((column, index) => {
                const key = column.key;
                if (index === 0) {
                    sums[key] = {
                        key,
                        value: '合计'
                    };
                    return;
                }
                if (index === 1 || index === 3) {
                    sums[key] = {
                        key,
                        value: ''
                    };
                    return;
                }
                const values = data.map(item => Number(item[key]));
                if (!values.every(value => isNaN(value))) {
                    const v = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[key] = {
                        key,
                        value: v.toFixed(2)
                    };
                } else {
                    sums[key] = {
                        key,
                        value: 'N/A'
                    };
                }
            });
            return sums;
        }
   }
}
</script>

<style lang="scss" scoped>
  .detailmodal-con{width:850px !important;
    /deep/ .ivu-table-with-summary .ivu-table-tbody tr:last-child td{border-bottom:1px solid #e8eaec;}
    /deep/ .ivu-modal{width:850px !important;top:20px;}
    /deep/ .ivu-modal-footer{border-top:none;}
    .invoice-date{font-size:14px;line-height:60px;
       span{font-weight:bold;
         label{font-weight:normal}
       }
    }
    .invoice-name{text-align:center;
        span{width:60%;border:1px #287bcc solid;margin:10px auto;display:block;}
    }
    .invoice-code{
        span{font-weight:bold;display:block;width:100%;font-size:14px;padding-left:30px;line-height:30px;
         label{font-weight:normal}
        }
    }
    .invoice-table-tit{border:1px solid #ccc;border-bottom:none;font-size:14px;width:100%;
      &>div{border-right:1px solid #e8eaec;padding:2px 10px 0;height:30px;
        &:last-child{border-right: none}
      }
      &.invoice-table-tit2{border:1px solid #ccc;border-top:none;}
      .invoice-table-tit1{font-weight:bold;text-align: center;line-height:28px;}
    }
    .detailmodal-table{
        /deep/ table{width:100% !important;}
    }
    .invoice-table-box{border:1px solid #ccc;border-top:none;padding:5px 10px 0;font-size:14px;
      .invoice-table-boxcon{padding:0 10px 0 0;margin-bottom:5px;
        label{width:100px;text-align: right;font-weight:bold;}
        // /deep/ .ivu-select, /deep/ .ivu-input-type{width:200px;}
      }
      .invoice-table-boxcon-date{width:50%;display: inline;padding-right:20px;}
    }
    .invoice-table-tail{border:1px solid #ccc;border-top:none;font-size:14px;
      &>div{border-right:1px solid #e8eaec;height:35px;padding:5px 10px; 
        &:last-child{border-right: none}
      }
    }
  }
</style>