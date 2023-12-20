import IndexGlobal from "../IndexGlobal.js";
import objectPool from "../common/ObjectPool.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import DomTypeEditObject from "../ui/DomTypeEditObject.js";
import DomTypeMoveOObject from "../ui/DomTypeMoveOObject.js";
import DomTypeMovePObject from "../ui/DomTypeMovePObject.js";
import DomTypeReadObject from "../ui/DomTypeReadObject.js";
import StructPropertyType from "./StructPropertyType.js";
/**
 * 解除关系
 * @param child
 * @returns
 */
function unBindPC(child) {
    if (child.parent == null) {
        return;
    }
    ;
    for (let i = child.parent.listChildren.length - 1; 0 <= i; i--) {
        let listChildrenI = child.parent.listChildren[i];
        if (listChildrenI == child) {
            child.parent.listChildren.splice(i, 1);
        }
        ;
    }
    ;
    child.parent = null;
}
/**
 * 绑定关系
 * @param parent
 * @param child
 * @returns
 */
function bindPC(parent, child) {
    if (parent == null) {
        return;
    }
    ;
    child.parent = parent;
    parent.listChildren.push(child);
}
/**
 * 属性类型 - 对象型
 */
class StructPropertyTypeObject extends StructPropertyType {
    constructor(struct) {
        super();
        /**
         * 从
         */
        this.listChildren = new Array();
        this.struct = struct;
    }
    /**
     * 新增了一个类型
     * @param typeObject
     */
    onTypeObjectAdd(typeObject) {
        if (this.struct.dataStruct.id == typeObject.struct.dataStruct.extend) {
            bindPC(this, typeObject);
        }
        ;
        if (this.struct.dataStruct.extend == typeObject.struct.dataStruct.id) {
            bindPC(typeObject, this);
        }
        ;
    }
    /**
     * 删除了一个类型
     * @param typeObject
     */
    onTypeObjectDel(typeObject) {
        if (this.struct.dataStruct.id == typeObject.struct.dataStruct.extend) {
            unBindPC(typeObject);
        }
        ;
        if (this.struct.dataStruct.extend == typeObject.struct.dataStruct.id) {
            unBindPC(this);
        }
        ;
    }
    /**
     * 当索引发生变化了的时候
     */
    onIndexModify() {
        this.listChildren.sort((a, b) => {
            return a.index - b.index;
        });
    }
    /**
     * 设置从关系
     * @param typeObject
     */
    setParent(id) {
        let typeObject = IndexGlobal.inst.mapTypeObjectCustom.get(id);
        unBindPC(this);
        bindPC(typeObject, this);
        this.struct.dataStruct.extend = id;
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
        if (this.parent != null) {
            return null;
        }
        ;
        let args = objectPool.pop(DomTypeReadObject.Args.poolType);
        args.init(idx, this);
        return ReactComponentExtend.instantiateComponent(DomTypeReadObject, args);
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
        let args = objectPool.pop(DomTypeEditObject.Args.poolType);
        args.init(idx, this);
        return ReactComponentExtend.instantiateComponent(DomTypeEditObject, args);
    }
    getAllChildren(setChildren) {
        setChildren.add(this);
        for (let i = 0; i < this.listChildren.length; i++) {
            let listChildrenI = this.listChildren[i];
            listChildrenI.getAllChildren(setChildren);
        }
        ;
    }
}
export default StructPropertyTypeObject;
