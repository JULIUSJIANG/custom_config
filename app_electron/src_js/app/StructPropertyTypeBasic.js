import objectPool from "../common/ObjectPool.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import DomTypeEditBasic from "../ui/DomTypeEditBasic.js";
import DomTypeMoveBasic from "../ui/DomTypeMoveBasic.js";
import DomTypeReadBasic from "../ui/DomTypeReadBasic.js";
import StructPropertyType from "./StructPropertyType.js";
/**
 * 属性类型 - 基础型
 */
class StructPropertyTypeBasic extends StructPropertyType {
    constructor(args) {
        super();
        this.id = args.id;
        this.demoName = args.demoName;
        this.info = args.info;
    }
    getId() {
        return this.id;
    }
    getDemoName() {
        return this.demoName;
    }
    getInfo() {
        return this.info;
    }
    renderRead(idx) {
        let args = objectPool.pop(DomTypeEditBasic.Args.poolType);
        args.init(idx, this);
        return ReactComponentExtend.instantiateComponent(DomTypeReadBasic, args);
    }
    renderMove(idx) {
        let args = objectPool.pop(DomTypeEditBasic.Args.poolType);
        args.init(idx, this);
        return ReactComponentExtend.instantiateComponent(DomTypeMoveBasic, args);
    }
    renderEdit(idx) {
        let args = objectPool.pop(DomTypeEditBasic.Args.poolType);
        args.init(idx, this);
        return ReactComponentExtend.instantiateComponent(DomTypeEditBasic, args);
    }
}
(function (StructPropertyTypeBasic) {
    /**
     * 数字
     */
    StructPropertyTypeBasic.typeNumber = new StructPropertyTypeBasic({
        id: -1,
        demoName: `number`,
        info: `数字`
    });
    /**
     * 布尔值
     */
    StructPropertyTypeBasic.typeBoolean = new StructPropertyTypeBasic({
        id: -2,
        demoName: `boolean`,
        info: `布尔值`
    });
    /**
     * 字符串
     */
    StructPropertyTypeBasic.typeString = new StructPropertyTypeBasic({
        id: -3,
        demoName: `string`,
        info: `字符串`
    });
    /**
     * 基础类型的集合
     */
    StructPropertyTypeBasic.listType = [
        StructPropertyTypeBasic.typeNumber,
        StructPropertyTypeBasic.typeBoolean,
        StructPropertyTypeBasic.typeString
    ];
})(StructPropertyTypeBasic || (StructPropertyTypeBasic = {}));
export default StructPropertyTypeBasic;
