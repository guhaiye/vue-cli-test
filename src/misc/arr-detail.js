/**
 * author     : guhaiye
 * time       : 20211229
 * descript   : 对数据的处理
 */

/**
 * {params} arr        : 需要递归的数据
 * {params} code       : 对比查找的数据
 * {params} objkey     : 对json 数组的哪个属性
 * {params} compareKey : json数组需要对比的属性
 * descript      : 通过code对比递归查找，判断是否有按钮权限
 */
export function recursionArr(arr,objkey,compareKey,code){
    if(!!arr){
        var result = {}
        for(let obj of arr){
            let btn_arr =  !!obj[objkey]?JSON.parse(obj[objkey]):[];
            for (let item of btn_arr){
                if(item[compareKey] === code){
                    result = item
                    return result
                }
            }
            if(obj['children'] && obj['children'].length > 0){
                result = recursionArr(obj['children'],objkey,compareKey,code)
                if(JSON.stringify(result) !== '{}'){
                    return result
                }
            }
        }
    }
    return result
}

/**
 * {params} code  : 需要比较的编码，页面的编码
 * {params} arr   : 树结构数据
 * {params} path  : 形成的层级数组 
 * description    : json树递归，根据子code去查找所有父code，用户获取面包屑的层级
 */
export function jsonFindParent(id, arr, pathlink) {
    if (pathlink === undefined) {
        pathlink = []
    }
    for (let i = 0; i < arr.length; i++) {
        let tempPath = pathlink.concat();
        let { title, path, parentId, nodetype, component } = arr[i];
        const { isbtn } = arr[i].meta
        path = (title == '首页') ? '/' : path
        tempPath.push({ title, path, parentId, nodetype, component, isbtn })
        if (arr[i]['id'] == id) {
            return tempPath
        }
        if (arr[i].children) {
            let result = jsonFindParent(id, arr[i].children, tempPath)
            if (!!result) {
                return result
            }
        }
    }
}
