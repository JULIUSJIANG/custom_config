import objectPool from "../common/ObjectPool.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import DomTypeReadBasic from "../ui/DomTypeReadBasic.js";
import StructPropertyType from "./StructPropertyType.js";

/**
 * 属性类型 - 基础型
 */
class StructPropertyTypeBasic extends StructPropertyType {
    /**
     * 标识
     */
    id: number;
    /**
     * 代号
     */
    demoName: string;
    /**
     * 备注
     */
    info: string;

    constructor (args: {
        id: number,
        demoName: string,
        info: string
    })
    {
        super ();
        this.id = args.id;
        this.demoName = args.demoName;
        this.info = args.info;
    }

    getId () {
        return this.id;
    }

    getDemoName () {
        return this.demoName;
    }

    getInfo () {
        return this.info;
    }

    renderRead (idx: number): ReactComponentExtendInstance {
        let args = objectPool.pop (DomTypeReadBasic.Args.poolType);
        args.init (idx, this);
        return ReactComponentExtend.instantiateComponent (
            DomTypeReadBasic,
            args
        );
    }

    renderEdit (idx: number): ReactComponentExtendInstance {
        return null;
    }

    renderMoveProperty (idx: number): ReactComponentExtendInstance {
        return null;
    }

    renderMoveStruct (idx: number): ReactComponentExtendInstance {
        return null;
    }

    impCache (data: any) {
        return data;
    }
}

namespace StructPropertyTypeBasic {
    /**
     * 数字
     */
    export const typeNumber = new StructPropertyTypeBasic ({
        id: -1,
        demoName: `number`,
        info: `数字`
    });
    /**
     * 布尔值
     */
    export const typeBoolean = new StructPropertyTypeBasic ({
        id: -2,
        demoName: `boolean`,
        info: `布尔值`
    });
    /**
     * 字符串
     */
    export const typeString = new StructPropertyTypeBasic ({
        id: -3,
        demoName: `string`,
        info: `字符串`
    });

    /**
     * 基础类型的集合
     */
    export const listType: StructPropertyTypeBasic[] = [
        typeNumber,
        typeBoolean,
        typeString
    ];
}

export default StructPropertyTypeBasic;