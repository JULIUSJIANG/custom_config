import objectPool from "../common/ObjectPool.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import DomTypeEditObject from "../ui/DomTypeEditObject.js";
import DomTypeMoveObject from "../ui/DomTypeMoveObject.js";
import DomTypeReadObject from "../ui/DomTypeReadObject.js";
import StructPropertyType from "./StructPropertyType.js";
/**
 * 属性类型 - 对象型
 */
class StructPropertyTypeObject extends StructPropertyType {
    init(struct) {
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
        let args = objectPool.pop(DomTypeEditObject.Args.poolType);
        args.init(idx, this);
        return ReactComponentExtend.instantiateComponent(DomTypeReadObject, args);
    }
    renderMove(idx) {
        let args = objectPool.pop(DomTypeEditObject.Args.poolType);
        args.init(idx, this);
        return ReactComponentExtend.instantiateComponent(DomTypeMoveObject, args);
    }
    renderEdit(idx) {
        let args = objectPool.pop(DomTypeEditObject.Args.poolType);
        args.init(idx, this);
        return ReactComponentExtend.instantiateComponent(DomTypeEditObject, args);
    }
}
StructPropertyTypeObject.poolType = new ObjectPoolType({
    instantiate: () => new StructPropertyTypeObject(),
    onPop: null,
    onPush: null
});
export default StructPropertyTypeObject;
