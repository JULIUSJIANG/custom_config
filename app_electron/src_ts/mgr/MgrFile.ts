import MgrData from "./MgrData.js";
import MgrDataItem from "./MgrDataItem.js";
import MgrDom from "./MgrDom.js";
import MgrFileItem from "./MgrFileItem.js";
import MgrSdk from "./MgrSdk.js";
import mgrFileJsonDefault from "./MgrFileJsonDefault.js";

/**
 * 数据管理
 */
class MgrFile {
    /**
     * 真正的数据，存储在这里
     */
    private _data = {};

    /**
     * 初始化
     */
    init () {
        return Promise.resolve ()
            // 问 sdk 要存档
            .then (() => {
                return MgrSdk.inst.core.fsReadString (MgrData.inst.get (MgrDataItem.FILE_PATH));
            })
            // 初始化当前记录
            .then ((ctx) => {
                // 对象形式的存档
                let dataObject: object;
                if (ctx.isSuccessed && ctx.txt != null && ctx.txt != ``) {
                    dataObject = JSON.parse (ctx.txt);
                }
                else {
                    dataObject = mgrFileJsonDefault;
                };
                for (let i = 0; i < MgrFileItem.listItem.length; i++) {
                    let listItemI = MgrFileItem.listItem [i];
                    let storaged = dataObject [listItemI.key];
                    let val;
                    // 没有记录的话，取默认值
                    if (storaged == null) {
                        val = listItemI.defVal;
                    }
                    // 否则取记录值
                    else {
                        val = storaged;
                    };
                    this.set (listItemI, val);
                };
            });
    }

    /**
     * 存记录
     * @param item 
     * @param t 
     */
    set<T> (item: MgrFileItem <T>, t: T) {
        this._data [item.key] = t;
    }

    /**
     * 取记录
     * @param item 
     * @returns 
     */
    get<T> (item: MgrFileItem <T>): T {
        return this._data [item.key];
    }

    /**
     * 正式存档
     * @returns 
     */
    save () {
        let txtData = JSON.stringify (this._data, null, 1);
        return MgrSdk.inst.core.fsWriteString (MgrData.inst.get (MgrDataItem.FILE_PATH), txtData);
    }
}

namespace MgrFile {
    /**
     * 全局实例
     */
    export const inst = new MgrFile ();
}

export default MgrFile;