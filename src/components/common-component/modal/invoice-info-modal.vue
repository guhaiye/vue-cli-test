/**
 * author       : guhaiye
 * createTime   : 20200313
 * description  : 进项、农产品收购发票发票详情弹窗
 */
<template>
    <Modal class="detailmodal-con" v-model="detailmodalshow" title="基本信息" :mask-closable="false">
      <div class="col-md-12 pd0">
         <Row>
             <Col :span='5' class="invoice-date">
                <span>开票日期： <label for="">{{ invoicecon.billingDate | filterFormatDate('v','date') }}</label></span>    
             </Col>
             <Col :span='13' class="invoice-name">
                <h4>{{ invoicecon.invoiceType | filterInvoiceType('v') }}</h4>
                <span></span>
                <span></span>
             </Col>
             <Col :span='6' class="invoice-code">
                <span>发票代码： <label for="">{{ invoicecon.invoiceCode }}</label></span>
                <span>发票号码： <label for="">{{ invoicecon.invoiceNumeric }}</label></span>
             </Col>
         </Row>
         <Row class="mt-2  invoice-table-tit">
             <Col :span='3' class="invoice-table-tit1">
             销货单位 
             </Col>
             <Col :span="9">
                <div class="tx_over">
                    <label for="" class="font-bold">名称：</label>
                    <span :title="invoicecon.seller">{{invoicecon.seller}}</span>
                </div>
                <div class="mt-1 tx_over">
                    <label for="" class="font-bold">纳税人识别号：</label>
                    <span :title="invoicecon.sellerTaxnum">{{invoicecon.sellerTaxnum}}</span>
                </div>
             </Col>
             <Col :span="3" class="invoice-table-tit1">
             密码区 
             </Col>
             <Col :span='9'>
               {{invoicecon.ciphertext}}
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
                    <span>{{invoicecon.levyRefundOpt | levyOptFilter}}</span>
                 </div>
                 <div class="invoice-table-boxcon">
                    <label>认证结果：</label>
                    <span>{{invoicecon.approveResult | approveFilter}}</span>
                 </div>
             </Col>
             <Col :span='12'>
                 <div class="invoice-table-boxcon">
                    <label>即征即退税额：</label>
                    <span>{{invoicecon.levyRefundPrice}}</span>
                 </div>
                 <div class="invoice-table-boxcon">
                     <div class="invoice-table-boxcon-date">
                         <label for="">认证日期：</label>
                         <span>{{invoicecon.invoiceVeridate | filterFormatDate('v','date') }}</span>
                     </div>
                     <div class="invoice-table-boxcon-date">
                         <label for="">税款所属期：</label>
                         <span>{{invoicecon.reportPeriod | filterFormatDate('v','month') }}</span>
                     </div>
                 </div>
             </Col>
         </Row>
         <Row class="invoice-table-tit invoice-table-tit2">
             <Col :span='3' class="invoice-table-tit1">
             购货单位 
             </Col>
             <Col :span='9'>
                <div class="tx_over">
                    <label for="" class="font-bold">名称：</label>
                    <span :title="invoicecon.buyer">{{ invoicecon.buyer }}</span>
                </div>
                <div class="mt-1 tx_over">
                    <label for="" class="font-bold">纳税人识别号：</label>
                    <span :title="invoicecon.buyer_taxnum">{{ invoicecon.buyerTaxnum }}</span>
                </div>
             </Col>
             <Col :span='3' class="invoice-table-tit1">
             备注 
             </Col>
             <Col :span='9'>
               
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
     levyOptFilter(v){
       var levy_opt = v;
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
     approveFilter(v){
       if(v == '1'){
         return '未认证'
       }else if(v == '2'){
         return '认证通过'
       }else if(v == '3'){
         return '认证未通过'
       }else if(v == '4'){
         return '无认证资格'
       }else if(v == '5'){
         return '认证发送错误'
       }else if(v == '6'){
         return '已发送未反馈'
       }
     }
   },
   data(){
       vm = this;
       return{
        isSpecialInvoice:'1',
        invoicecon:{
          billingDate:'',
          invoiceType:'',	
          invoiceCode:'',
          invoiceNumeric:'',
          seller:'',
          sellerTaxnum:'',	
          levyRefundOpt:'',
          approveResult:'',
          invoiceVeridate:'',
          reportPeriod:'',
          buyer:'',
          buyerTaxnum:'',
          levyRefundPrice:'',
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
                title: "金额",
                width: 100,
                key: "invoiceAmount",
                align: 'right'
            },
            {
                title: "税率",
                key: "taxRate",
                width: 100,
                align:'right'
            },
            {
                title: "税额",
                key: "taxAmount",
                width: 103,
                align:'right'
            },
            {
                title: "抵扣税额",
                key: "deductionPrice",
                width: 100,
                align:'right'
            },
            {
                title: "抵扣选项",
                key: "deductibleOpt",
                width: 100,
                render:(h,params)=>{
                var deductible_opt = params.row.deductibleOpt;
                if(deductible_opt == '0'){
                    var deductible_opt_text = '抵扣'
                }else if(deductible_opt == '1'){
                    var deductible_opt_text = '部分抵扣'
                }else if(deductible_opt == '2'){
                    var deductible_opt_text = '不抵扣'
                }else{
                    var deductible_opt_text = '';
                }
                return h('span',deductible_opt_text)
                }
            },
          ],
          dataTableInvoice:[],
          invoiceArr:getApiAsync('INVOICE_TYPE').then((res)=>{this.invoiceArr = res})
       }
   },
   methods:{
      getInvoiceDetail(id){
        this.$loading.show();
        var params = {id:id}
        if(this.isSpecialInvoice == '2'){ //如果是发票勾选查看发票详情
          var service = this.$api.confirmInvoiceCheck;
        }else{
          var service = this.$api.commonApi;
        }
        service.queryCheckJxVatInfo(params).then((res)=>{
          var result = res.data.result;
          if(result == 'success'){
             const {orgJxVat,orgJxVats,sum} = res.data.data;
             this.invoicecon = orgJxVat;
             this.invoicecon.sum = regularNum(sum)
             this.invoicecon.sumDx = formatMoneyDx(sum)
             this.dataTableInvoice = orgJxVats;
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
                if (index === 1 || index === 2 || index === 5) {
                    sums[key] = {
                        key,
                        value: 'N/A'
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
      &>div{border-right:1px solid #e8eaec;padding:2px 10px 0;height:50px;
        &:last-child{border-right: none}
      }
      &.invoice-table-tit2{border:1px solid #ccc;border-top:none;}
      .invoice-table-tit1{font-weight:bold;text-align: center;line-height:46px;}
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