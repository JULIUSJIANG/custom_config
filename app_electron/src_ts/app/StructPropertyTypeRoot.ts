import objectPool from "../common/ObjectPool.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import DomTypeEditObject from "../ui/DomTypeEditObject.js";
import DomTypeEditRoot from "../ui/DomTypeEditRoot.js";
import DomTypeMoveOObject from "../ui/DomTypeMoveOObject.js";
import DomTypeMovePObject from "../ui/DomTypeMovePObject.js";
import DomTypeReadObject from "../ui/DomTypeReadObject.js";
import DomTypeReadRoot from "../ui/DomTypeReadRoot.js";
import CacheInst from "./CacheInst.js";
import CacheStruct from "./CacheStruct.js";
import StructPropertyType from "./StructPropertyType.js";

/**
 * 属性类型 - 对象型
 */
class StructPropertyTypeRoot extends StructPropertyType {
    /**
     * 对应的类型
     */
    struct: CacheStruct;

    constructor (struct: CacheStruct) {
        super ();
        this.struct = struct;
    }

    getId () {
        return this.struct.dataStruct.id;
    }

    getDemoName () {
        return this.struct.dataStruct.demoName;
    }

    getInfo () {
        return this.struct.dataStruct.info;
    }

    renderRead (idx: number): ReactComponentExtendInstance {
        let args = objectPool.pop (DomTypeReadRoot.Args.poolType);
        args.init (idx, this.struct);
        return ReactComponentExtend.instantiateComponent (
            DomTypeReadRoot,
            args
        );
    }

    renderMoveProperty (idx: number): ReactComponentExtendInstance {
        let args = objectPool.pop (DomTypeMovePObject.Args.poolType);
        args.init (idx, this.struct);
        return ReactComponentExtend.instantiateComponent (
            DomTypeMovePObject,
            args
        );
    }

    renderMoveStruct (idx: number): ReactComponentExtendInstance {
        let args = objectPool.pop (DomTypeMoveOObject.Args.poolType);
        args.init (idx, this.struct);
        return ReactComponentExtend.instantiateComponent (
            DomTypeMoveOObject,
            args
        );
    }

    renderEdit (idx: number): ReactComponentExtendInstance {
        let args = objectPool.pop (DomTypeEditRoot.Args.poolType);
        args.init (idx, this.struct);
        return ReactComponentExtend.instantiateComponent (
            DomTypeEditRoot,
            args
        );
    }

    impCache (data: any) {
        return new CacheInst (data);
    }
}

export default StructPropertyTypeRoot;