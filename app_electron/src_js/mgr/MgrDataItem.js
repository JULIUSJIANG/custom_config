/**
 * 数据管理 - 具体记录
 */
class MgrDataItem {
    constructor(args) {
        this.key = args.key;
        this.defVal = args.defVal;
        MgrDataItem.listItem.push(this);
    }
}
/**
 * 改这个值，整个存档都会重置
 */
const VERSION = 1;
(function (MgrDataItem) {
    /**
     * 所有具体记录
     */
    MgrDataItem.listItem = new Array();
    /**
     * 启动时自动打开调试工具
     */
    MgrDataItem.FILE_PATH = new MgrDataItem({
        key: `FILE_PATH_${VERSION}`,
        defVal: `mgr_sdk_core_electron_file.json`
    });
})(MgrDataItem || (MgrDataItem = {}));
export default MgrDataItem;
