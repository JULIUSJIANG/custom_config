/**
 * 数据管理 - 具体记录
 */
class MgrDataItem<T> {

    /**
     * 访问该记录的键
     */
    key: string;

    /**
     * 该记录的默认值
     */
    defVal: T;

    constructor (args: {
        key: string,
        defVal: T
    })
    {
        this.key = args.key;
        this.defVal = args.defVal;

        MgrDataItem.listItem.push (this);
    }
}

/**
 * 改这个值，整个存档都会重置
 */
const VERSION = 1;

namespace MgrDataItem {
    /**
     * 所有具体记录
     */
    export const listItem: Array <MgrDataItem <unknown>> = new Array ();

    /**
     * 启动时自动打开调试工具
     */
    export const FILE_PATH = new MgrDataItem <string> ({
        key: `FILE_PATH_${VERSION}`,
        defVal: `mgr_sdk_core_electron_file.json`
    });
}

export default MgrDataItem;