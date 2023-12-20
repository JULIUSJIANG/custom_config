import StructPropertyTypeBasic from "../app/StructPropertyTypeBasic.js";

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
const VERSION = 2;

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
    export class CustomStruct {
        /**
         * 标识
         */
        id: number;
        /**
         * 导出后的类名
         */
        demoName: string;
        /**
         * 备注
         */
        info: string;
        /**
         * 继承
         */
        extend: number;
        /**
         * 类型上面的所有属性
         */
        listProperty: CustomStructProperty [];

        public static rootDefault: CustomStruct = {
            id: -4,
            demoName: `Root`,
            info: `总览`,
            extend: null,
            listProperty: []
        };

        public static create (id: number) {
            return {
                id: id,
                demoName: `CustomStruct${id}`,
                info: `备注`,
                extend: 0,
                listProperty: []
            };
        }
    }

    /**
     * 自定义的类型 - 具体属性
     */
    export class CustomStructProperty {
        /**
         * 标识
         */
        id: number;
        /**
         * 导出后的属性名
         */
        demoName: string;
        /**
         * 备注
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

        public static create (id: number) {
            return {
                id: id,
                demoName: `Property${id}`,
                info: `备注`,
                isArray: false,
                type: StructPropertyTypeBasic.typeNumber.getId ()
            };
        }
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

    /**
     * 根结构
     */
    export const ROOT_STRUCT = new MgrFileItem <CustomStruct> ({
        key: `ROOT_STRUCT_${VERSION}`,
        defVal: CustomStruct.rootDefault
    });

    /**
     * 实例
     */
    export class Inst {
        /**
         * 类型标识
         */
        typeId: number;

        /**
         * 属性集合
         */
        listProperty: Array <InstProperty>
    }

    /**
     * 实例身上的属性
     */
    export class InstProperty {
        /**
         * 属性标识
         */
        propertyId: number;

        /**
         * 属性值
         */
        propertyValue: any;
    };

    /**
     * 根配置
     */
    export const CONFIG_ROOT = new MgrFileItem <Inst> ({
        key: `CONFIG_ROOT_${VERSION}`,
        defVal: {
            typeId: -4,
            listProperty: []
        }
    });
}

export default MgrFileItem;