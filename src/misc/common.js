export default {
    /*表单序列化*/
    serializeObject: function (id) {
        var o = {};
        var a = $(id).serializeArray();
        $.each(a, function (i, v) {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
    guid: () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" === e ? t : (3 & t) | 8).toString(16);
        });
    },
    dateFormat: (time, e = "yyyy-MM-dd hh:mm:ss") => {
        var t = new Date(time);
        var n = {
            "M+": t.getMonth() + 1,
            "d+": t.getDate(),
            "h+": t.getHours(),
            "m+": t.getMinutes(),
            "s+": t.getSeconds(),
            "q+": Math.floor((t.getMonth() + 3) / 3),
            S: t.getMilliseconds(),
        };
        for (var a in (/(y+)/.test(e) &&
            (e = e.replace(
                RegExp.$1,
                (t.getFullYear() + "").substr(4 - RegExp.$1.length)
            )),
            n))
            new RegExp("(" + a + ")").test(e) &&
                (e = e.replace(
                    RegExp.$1,
                    1 === RegExp.$1.length ? n[a] : ("00" + n[a]).substr(("" + n[a]).length)
                ));
        return e;
    }

}