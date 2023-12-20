import objectPool from "../common/ObjectPool.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
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
        let args = objectPool.pop(DomTypeReadBasic.Args.poolType);
        args.init(idx, this);
        return ReactComponentExtend.instantiateComponent(DomTypeReadBasic, args);
    }
    renderEdit(idx) {
        return null;
    }
    renderMoveProperty(idx) {
        return null;
    }
    renderMoveStruct(idx) {
        return null;
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
