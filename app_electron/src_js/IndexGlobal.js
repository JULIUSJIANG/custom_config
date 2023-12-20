import CacheStruct from "./app/CacheStruct.js";
import DragPropertyMachine from "./app/DragPropertyMachine.js";
import DragStructMachine from "./app/DragStructMachine.js";
import LeftOpMachine from "./app/LeftOpMachine.js";
import StructPropertyTypeBasic from "./app/StructPropertyTypeBasic.js";
import StructPropertyTypeObject from "./app/StructPropertyTypeObject.js";
import StructPropertyTypeRoot from "./app/StructPropertyTypeRoot.js";
import ObjectPoolType from "./common/ObjectPoolType.js";
import MgrFile from "./mgr/MgrFile.js";
import MgrFileItem from "./mgr/MgrFileItem.js";
import MgrSdk from "./mgr/MgrSdk.js";
class IndexGlobal {
    constructor() {
        /**
         * 用户所有自定义的类型
         */
        this.listTypeObjectCustom = new Array();
        /**
         * 结构映射
         */
        this.mapTypeObjectCustom = new Map();
        /**
         * 属性的所有可选类型
         */
        this.listTypeAll = new Array();
        /**
         * 标识到具体类型的映射
         */
        this.mapTypeAll = new Map();
        /**
         * 可选类型
         */
        this.listTypeSelectAble = new Array();
        /**
         * 可继承类型
         */
        this.listTypeExtendAble = new Array();
        /**
         * 总览列表
         */
        this.listTypeRead = new Array();
        /**
         * 编辑列表
         */
        this.listTypeEdit = new Array();
        /**
         * 属性迁移列表
         */
        this.listTypeMoveProperty = new Array();
        /**
         * 结构迁移列表
         */
        this.listTypeMoveStruct = new Array();
    }
    /**
     * 事件派发 - 初始化
     */
    onInit() {
        MgrSdk.inst.core.openDebugTools();
        let clone = [...MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT)];
        MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT).length = 0;
        for (let i = 0; i < clone.length; i++) {
            let cloneI = clone[i];
            this.structAdd(cloneI);
        }
        ;
        this.typeRoot = new StructPropertyTypeRoot(new CacheStruct(MgrFile.inst.get(MgrFileItem.ROOT_STRUCT)));
        this.leftOpMachine = new LeftOpMachine();
        this.leftOpMachine.enter(this.leftOpMachine.mapStatus.get(MgrFile.inst.get(MgrFileItem.LEFT_OP)));
        this.dragMachineStruct = new DragStructMachine();
        this.dragMachineProperty = new DragPropertyMachine();
    }
    /**
     * 增
     * @param dataStruct
     */
    structAdd(dataStruct) {
        let typeObject = new StructPropertyTypeObject(new CacheStruct(dataStruct));
        for (let i = 0; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom[i];
            listTypeObjectCustomI.onTypeObjectAdd(typeObject);
        }
        ;
        this.listTypeObjectCustom.push(typeObject);
        this.mapTypeObjectCustom.set(typeObject.struct.dataStruct.id, typeObject);
        MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT).push(dataStruct);
        typeObject.index = this.listTypeObjectCustom.length - 1;
    }
    /**
     * 删
     * @param dataStruct
     * @returns
     */
    structDel(dataStruct) {
        let index;
        for (let i = 0; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom[i];
            if (listTypeObjectCustomI.struct.dataStruct.id == dataStruct.id) {
                index = i;
                break;
            }
            ;
        }
        ;
        if (index == null) {
            return;
        }
        ;
        let typeObject = this.listTypeObjectCustom[index];
        for (let i = 0; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom[i];
            listTypeObjectCustomI.onTypeObjectDel(typeObject);
        }
        ;
        this.listTypeObjectCustom.splice(index, 1);
        this.mapTypeObjectCustom.delete(typeObject.struct.dataStruct.id);
        MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT).splice(index, 1);
        for (let i = index; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom[i];
            listTypeObjectCustomI.index = i;
        }
        ;
    }
    /**
     * 移
     * @param idxFrom
     * @param idxTo
     */
    structMove(idxFrom, idxTo) {
        let typeFrom = this.listTypeObjectCustom[idxFrom];
        this.listTypeObjectCustom.splice(idxFrom, 1);
        this.listTypeObjectCustom.splice(idxTo, 0, typeFrom);
        let srcFrom = MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT)[idxFrom];
        MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT).splice(idxFrom, 1);
        MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT).splice(idxTo, 0, srcFrom);
        let idxStart = Math.min(idxFrom, idxTo);
        let idxEnd = Math.max(idxFrom, idxTo);
        for (let i = idxStart; i <= idxEnd; i++) {
            this.listTypeObjectCustom[i].index = i;
        }
        ;
        for (let i = 0; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom[i];
            listTypeObjectCustomI.onIndexModify();
        }
        ;
    }
    /**
     * 事件派发 - 刷新
     */
    onRender() {
        this.listTypeAll.length = 0;
        this.listTypeAll.push(...StructPropertyTypeBasic.listType);
        this.listTypeAll.push(...this.listTypeObjectCustom);
        this.mapTypeAll.clear();
        for (let i = 0; i < this.listTypeAll.length; i++) {
            let listTypeI = this.listTypeAll[i];
            this.mapTypeAll.set(listTypeI.getId(), listTypeI);
        }
        ;
        this.listTypeSelectAble.length = 0;
        this.listTypeSelectAble.push(...StructPropertyTypeBasic.listType);
        this.listTypeSelectAble.push(...this.listTypeObjectCustom);
        this.listTypeExtendAble.length = 0;
        this.listTypeExtendAble.push(...this.listTypeObjectCustom);
        this.listTypeRead.length = 0;
        this.listTypeRead.push(...StructPropertyTypeBasic.listType);
        this.listTypeRead.push(this.typeRoot);
        this.listTypeRead.push(...this.listTypeObjectCustom);
        this.listTypeEdit.length = 0;
        this.listTypeEdit.push(this.typeRoot);
        this.listTypeEdit.push(...this.listTypeObjectCustom);
        this.listTypeMoveProperty.length = 0;
        this.listTypeMoveProperty.push(this.typeRoot);
        this.listTypeMoveProperty.push(...this.listTypeObjectCustom);
        this.listTypeMoveStruct.length = 0;
        this.listTypeMoveStruct.push(...this.listTypeObjectCustom);
    }
}
(function (IndexGlobal) {
    /**
     * 全局实例
     */
    IndexGlobal.inst = new IndexGlobal();
    /**
     * 下拉菜单的选项
     */
    class SelectOptions {
        init(key, label) {
            this.value = key;
            this.label = label;
        }
    }
    SelectOptions.poolType = new ObjectPoolType({
        instantiate: () => new SelectOptions(),
        onPop: null,
        onPush: null
    });
    IndexGlobal.SelectOptions = SelectOptions;
})(IndexGlobal || (IndexGlobal = {}));
window["indexGlobal"] = IndexGlobal.inst;
export default IndexGlobal;
