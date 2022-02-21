/**
 * 公共模块接口列表
 */
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const commonApi = {    
    // 作为独立服务获取用户基本信息和菜单信息    
    memInfo() {        
        return axios.get(`${base.sq+base.version}/auth/meminfo`);
    },   
    //嵌入权限获取菜单信息 
    getDomainMenu(){
        return axios.get(`${base.sq+base.version}/auth/domain/funcnodes`);
    },
    //代理过来的
    getDomainMenu2(username){
        return axios.get(`${base.sq+base.version}/auth/domain/funcnodes?username=`+username);
    },
    //作为独立系统退出
    logoutApi(){
        return axios.get(`${base.sq+base.version}/auth/logout`);
    },
    //嵌入权限退出
    logoutCasApi(){
        return axios.get(`${base.cassq}/logout`);
    },

    //获取税区列表
    getAreaList(){
        return axios.get(`${base.sq+base.version}/business/appsms/findArea`);
    },
    //农产品收购发票获取公司数据(购方纳税人)
    getOrgList(params){
        return axios.get(`${base.sq+base.version}/findOrg?`+qs.stringify(params))
    },
    //进项、农产品收购发票详情
    queryCheckJxVatInfo(params){
        return axios.get(`${base.sq+base.version}/invoice/orgJxVat/queryCheckJxVatInfo?`+qs.stringify(params))
    },
    //销项，分类编码详细发票详情
    queryCheckXxVatInfo(params){
        return axios.get(`${base.sq+base.version}/invoice/orgXxVat/queryDetailedInfo?`+qs.stringify(params))
    },
    /**共用的查询字典 */
    getCommonDict(params){
        return axios.get(`${base.sq+base.version}/findBaseDict?`+qs.stringify(params))
    },
    /**共用的动态字段 */
    getCommonDtDict(params){
        return axios.get(`${base.sq+base.version}/findDbDict?`+qs.stringify(params))
    },
    /**查询前台用户状态 字典接口 */
    getCommonFrontDict(params){
        return axios.get(`${base.sq+base.version}/findFrontDbDict?`+qs.stringify(params))
    },
    /**列表页申报失败信息、扣款失败信息获取 */
    findErrorMsg(params){
        return axios.get(`${base.sq+base.version}/business/report/findErrorMsg?`+qs.stringify(params))
    },
    /**申报表错误信息获取 */
    findDecalreMsg(params){
        return axios.get(`${base.sq+base.version}/business/report/findDecalreMsg?`+qs.stringify(params))
    },
    /**申报税额详情获取 */
    showAmountDetail(params){
        return axios.get(`${base.sq+base.version}/business/report/showAmountDetail?`+qs.stringify(params))
    },
    /**获取审核历史 */
    getAuditHistory(params){
        return axios.get(`${base.sq+base.version}/business/report/getAuditHistory?`+qs.stringify(params)) 
    },
    /**获取审批流程 */
    getApprovalProcess(params){
        return axios.get(`${base.sq+base.version}/business/report/getApprovalProcess?`+qs.stringify(params)) 
    },
    /**自定义 查询 */
    queryCol(params){
        return axios.get(`${base.sq+base.version}/config/colJson/queryCol?`+qs.stringify(params)) 
    },
    /**自定义 保存 */
    saveCol(params){
        return axios.post(`${base.sq+base.version}/config/colJson/saveCol`,params) 
    },
    /**税种名称下拉 */
    queryTaxList(params){
        return axios.get(`${base.sq+base.version}/business/gtbt/queryTaxList?`+qs.stringify(params)) 
    },
    /**模板下载 */
    downLoadFile(id) {
        return axios.get(`${base.sq+base.version}/downLoadFile?templateUrlId=`+id)
    },
}

export default commonApi;