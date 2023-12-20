import StructPropertyTypeBasic from "../app/StructPropertyTypeBasic.js";
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
const VERSION = 2;
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
     * 自定义的类型
     */
    class CustomStruct {
        static create(id) {
            return {
                id: id,
                demoName: `CustomStruct${id}`,
                info: `备注`,
                extend: 0,
                listProperty: []
            };
        }
    }
    CustomStruct.rootDefault = {
        id: -4,
        demoName: `Root`,
        info: `总览`,
        extend: null,
        listProperty: []
    };
    MgrFileItem.CustomStruct = CustomStruct;
    /**
     * 自定义的类型 - 具体属性
     */
    class CustomStructProperty {
        static create(id) {
            return {
                id: id,
                demoName: `Property${id}`,
                info: `备注`,
                isArray: false,
                type: StructPropertyTypeBasic.typeNumber.getId()
            };
        }
    }
    MgrFileItem.CustomStructProperty = CustomStructProperty;
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
    /**
     * 根结构
     */
    MgrFileItem.ROOT_STRUCT = new MgrFileItem({
        key: `ROOT_STRUCT_${VERSION}`,
        defVal: CustomStruct.rootDefault
    });
    /**
     * 实例
     */
    class Inst {
    }
    MgrFileItem.Inst = Inst;
    /**
     * 实例身上的属性
     */
    class InstProperty {
    }
    MgrFileItem.InstProperty = InstProperty;
    ;
    /**
     * 根配置
     */
    MgrFileItem.CONFIG_ROOT = new MgrFileItem({
        key: `CONFIG_ROOT_${VERSION}`,
        defVal: {
            typeId: -4,
            listProperty: []
        }
    });
})(MgrFileItem || (MgrFileItem = {}));
export default MgrFileItem;
