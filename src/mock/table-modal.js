 function createData  () {
    const obj = {
        "result": "success",
        "code": 200,
        "infos": "成功",
        "data": {
            "plainPageNum": 1,
            "pageNum": 1,
            "numPerPage": 15,
            "orderField": "",
            "orderDirection": "",
            "totalPage": 20,
            "prePage": 1,
            "nextPage": 1,
            "totalCount": 300,
            "autoCount": true,
            "result": [],
            "sEcho": null,
            "startIndex": 0,
            "first": 1
        }
    }
    const item = {
        "id": 3,
        "openId": "pro_755315283453739008",
        "indicatorNo": "VATZB20221123164006010",
        'name': '测试',
        "indicatorName": "测试1",
        "indicatorDesc": "测试666",
        "indicatorTypeOpenId": "1",
        "indicatorTypeName": "税负类",
        "indicatorLabel": null,
        "indicatorDataOrigin": 4,
        "indicatorFormula": [{
            "type": "cpt",
            "value": "PN02005",
            "name": "合计_应纳税额##本期数##6=1x4+2x5",
            "gtbtId": 124,
            "gtbtReportId": 102
        }]
    }
    for (let index = 0; index < 15; index++) {
        obj.data.result.push({...item, ...{ title: item.name + index, name: item.name + index, id: index}})
    }
    return obj
}
