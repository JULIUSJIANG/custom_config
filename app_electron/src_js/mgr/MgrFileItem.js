/**
 * 数据管理 - 具体记录
 */
class MgrFileItem {
    constructor(args) {
        this.key = args.key;
        this.defVal = args.defVal;
        MgrFileItem.listItem.push(this);
    }
}
/**
 * 改这个值，整个存档都会重置
 */
const VERSION = 3;
(function (MgrFileItem) {
    /**
     * 所有具体记录
     */
    MgrFileItem.listItem = new Array();
    /**
     * id 种子
     */
    MgrFileItem.ID_SEED = new MgrFileItem({
        key: `ID_SEED_${VERSION}`,
        defVal: 0
    });
    /**
     * 当前所有自定义的类型
     */
    MgrFileItem.LIST_CUSTOM_STRUCT = new MgrFileItem({
        key: `LIST_CUSTOM_STRUCT_${VERSION}`,
        defVal: []
    });
    /**
     * 左侧栏行为
     */
    MgrFileItem.LEFT_OP = new MgrFileItem({
        key: `LEFT_OP_${VERSION}`,
        defVal: 1
    });
})(MgrFileItem || (MgrFileItem = {}));
export default MgrFileItem;
