/**
 * 数据管理 - 具体记录
 */
class MgrFileItem<T> {

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

        MgrFileItem.listItem.push (this);
    }
}

/**
 * 改这个值，整个存档都会重置
 */
const VERSION = 3;

namespace MgrFileItem {
    /**
     * 所有具体记录
     */
    export const listItem: Array <MgrFileItem <unknown>> = new Array ();

    /**
     * id 种子
     */
    export const ID_SEED = new MgrFileItem <number> ({
        key: `ID_SEED_${VERSION}`,
        defVal: 0
    });

    /**
     * 自定义的类型
     */
    export interface CustomStruct {
        /**
         * 标识
         */
        id: number;
        /**
         * 导出后的类名
         */
        demoName: string;
        /**
         * 描述
         */
        info: string;
        /**
         * 类型上面的所有属性
         */
        listProperty: CustomStructProperty [];
    }
    /**
     * 自定义的类型 - 具体属性
     */
    export interface CustomStructProperty {
        /**
         * 标识
         */
        id: number;
        /**
         * 导出后的属性名
         */
        demoName: string;
        /**
         * 描述
         */
        info: string;
        /**
         * 是集合
         */
        isArray: boolean;
        /**
         * 类型
         */
        type: number;
    }

    /**
     * 当前所有自定义的类型
     */
    export const LIST_CUSTOM_STRUCT = new MgrFileItem <CustomStruct[]> ({
        key: `LIST_CUSTOM_STRUCT_${VERSION}`,
        defVal: []
    });

    /**
     * 左侧栏行为
     */
    export const LEFT_OP = new MgrFileItem <number> ({
        key: `LEFT_OP_${VERSION}`,
        defVal: 1
    });
}

export default MgrFileItem;