import pinyin from 'pinyin-match'
import menu from './menu.vue'


// tree 删选路径 (查询tree)
export function pathFun(arr, txt, paths, path) {
    if (arr && arr.length) {
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item["title"].indexOf(txt) != -1 || pinyin.match(item["title"],txt)) {
                paths.push(path + "#" + item.id);
                pathFun(item["children"], txt, paths, path + "#" + item.id);
            } else {
                pathFun(item["children"], txt, paths, path + "#" + item.id);
            }
        }
    }
    return paths;
}
// 创建新树 (查询tree)
export function treePath(paths, treeData) {

    var newTreeData = []; //返回 new tree
    var cpTreeData = treeCreate(deepClone(treeData), {});
    paths.map(function (e) {
        var itemArr = e.split("#");
        itemArr.splice(0, 1);
        var i = 0;
        while (i < itemArr.length) {
            if (i == 0) {
                pushTree(itemArr[i], newTreeData, cpTreeData);
            } else {
                pushTree(itemArr[i], cpTreeData[itemArr[i - 1]]["children"],
                    cpTreeData);
            }
            i++;
        }
    });
    return newTreeData;
}
// tree obj 便于读取数据 (查询tree)
export function treeCreate(tag, obj) {
    if (tag instanceof Array) {
        tag = tag
    } else {
        var newTag = []
        for (var e in tag) {
            newTag.push(tag[e])
        }
        tag = newTag;
    }
    for (var i = 0; i < tag.length; i++) {
        var item = deepClone(tag[i]);
        item.children = [];
        obj[item.id] = item;
        treeCreate(tag[i].children, obj);
    }
    return obj;
}
// 循环创建 层级树 (查询tree)
export function pushTree(itemArr, newTree, obj) {
    if (!newTree.length) {
        newTree.push(obj[itemArr]);
        return;
    }
    var flag = true;
    for (var j = 0; j < newTree.length; j++) {
        if (newTree[j]["id"] == itemArr) {
            flag = false;
        }
    }
    if (flag) {
        newTree.push(obj[itemArr]);
    }
}

export function deepClone(source) {
    var targetObj = undefined;
    if (typeof source === "object") {
        targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
        for (var keys in source) {
            // 遍历目标
            if (source.hasOwnProperty(keys)) {
                if (source[keys] && typeof source[keys] === "object") {
                    // 如果值是对象，就递归一下
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = deepClone(source[keys]);
                } else {
                    // 如果不是，就直接赋值
                    targetObj[keys] = source[keys];
                }
            }
        }
    } else {
        targetObj = source;
    }
    return targetObj;
}

export default menu
