import objectPool from "../common/ObjectPool.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import DomTypeEditRoot from "../ui/DomTypeEditRoot.js";
import DomTypeMoveOObject from "../ui/DomTypeMoveOObject.js";
import DomTypeMovePObject from "../ui/DomTypeMovePObject.js";
import DomTypeReadRoot from "../ui/DomTypeReadRoot.js";
import StructPropertyType from "./StructPropertyType.js";
/**
 * 属性类型 - 对象型
 */
class StructPropertyTypeRoot extends StructPropertyType {
    constructor(struct) {
        super();
        this.struct = struct;
    }
    getId() {
        return this.struct.dataStruct.id;
    }
    getDemoName() {
        return this.struct.dataStruct.demoName;
    }
    getInfo() {
        return this.struct.dataStruct.info;
    }
    renderRead(idx) {
        let args = objectPool.pop(DomTypeReadRoot.Args.poolType);
        args.init(idx, this.struct);
        return ReactComponentExtend.instantiateComponent(DomTypeReadRoot, args);
    }
    renderMoveProperty(idx) {
        let args = objectPool.pop(DomTypeMovePObject.Args.poolType);
        args.init(idx, this.struct);
        return ReactComponentExtend.instantiateComponent(DomTypeMovePObject, args);
    }
    renderMoveStruct(idx) {
        let args = objectPool.pop(DomTypeMoveOObject.Args.poolType);
        args.init(idx, this.struct);
        return ReactComponentExtend.instantiateComponent(DomTypeMoveOObject, args);
    }
    renderEdit(idx) {
        let args = objectPool.pop(DomTypeEditRoot.Args.poolType);
        args.init(idx, this.struct);
        return ReactComponentExtend.instantiateComponent(DomTypeEditRoot, args);
    }
}
export default StructPropertyTypeRoot;
