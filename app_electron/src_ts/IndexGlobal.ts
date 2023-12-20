import CacheInst from "./app/CacheInst.js";
import CacheStruct from "./app/CacheStruct.js";
import DragPropertyMachine from "./app/DragPropertyMachine.js";
import DragStructMachine from "./app/DragStructMachine.js";
import LeftOpMachine from "./app/LeftOpMachine.js";
import StructPropertyType from "./app/StructPropertyType.js";
import StructPropertyTypeBasic from "./app/StructPropertyTypeBasic.js";
import StructPropertyTypeObject from "./app/StructPropertyTypeObject.js";
import StructPropertyTypeRoot from "./app/StructPropertyTypeRoot.js";
import ObjectPoolType from "./common/ObjectPoolType.js";
import ReactComponentExtendInstance from "./common/ReactComponentExtendInstance.js";
import MgrFile from "./mgr/MgrFile.js";
import MgrFileItem from "./mgr/MgrFileItem.js";
import MgrSdk from "./mgr/MgrSdk.js";

class IndexGlobal {

    /**
     * 根类型
     */
    typeRoot: StructPropertyTypeRoot;

    /**
     * 根缓存
     */
    instRoot: CacheInst;

    /**
     * 标识到具体类型的映射
     */
    mapTypeAll = new Map <number, StructPropertyType> ();

    /**
     * 左侧栏状态机
     */
    leftOpMachine: LeftOpMachine;

    /**
     * 类型拖拽的行为状态机
     */
    dragMachineStruct: DragStructMachine;

    /**
     * 属性拖拽的行为状态机
     */
    dragMachineProperty: DragPropertyMachine;

    /**
     * 事件派发 - 初始化
     */
    onInit () {
        MgrSdk.inst.core.openDebugTools ();
        let clone = [...MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT)];
        MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT).length = 0;
        for (let i = 0; i < clone.length; i++) {
            let cloneI = clone [i];
            this.structAdd (cloneI);
        };

        this.leftOpMachine = new LeftOpMachine ();
        this.leftOpMachine.enter (this.leftOpMachine.mapStatus.get (MgrFile.inst.get (MgrFileItem.LEFT_OP)));

        this.dragMachineStruct = new DragStructMachine ();
        this.dragMachineProperty = new DragPropertyMachine ();

        // 补全静态的类型记录
        this.typeRoot = new StructPropertyTypeRoot (new CacheStruct (MgrFile.inst.get (MgrFileItem.ROOT_STRUCT)));
        this.mapTypeAll.set (this.typeRoot.getId (), this.typeRoot);
        for (let i = 0; i < StructPropertyTypeBasic.listType.length; i++) {
            let listTypeI = StructPropertyTypeBasic.listType [i];
            this.mapTypeAll.set (listTypeI.id, listTypeI);
        };

        // 全局的配置实例
        this.instRoot = new CacheInst (MgrFile.inst.get (MgrFileItem.CONFIG_ROOT));
    }

    /**
     * 用户所有自定义的类型
     */
    listTypeObjectCustom = new Array <StructPropertyTypeObject> ();

    /**
     * 结构映射
     */
    mapTypeObjectCustom = new Map <number, StructPropertyTypeObject> ();

    /**
     * 增
     * @param dataStruct 
     */
    structAdd (dataStruct: MgrFileItem.CustomStruct) {
        let typeObject = new StructPropertyTypeObject (new CacheStruct (dataStruct));
        for (let i = 0; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom [i];
            listTypeObjectCustomI.onTypeObjectAdd (typeObject);
        };
        this.listTypeObjectCustom.push (typeObject);
        this.mapTypeObjectCustom.set (typeObject.struct.dataStruct.id, typeObject);
        this.mapTypeAll.set (typeObject.struct.dataStruct.id, typeObject);
        MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT).push (dataStruct);
        typeObject.index = this.listTypeObjectCustom.length - 1;
    }

    /**
     * 删
     * @param dataStruct 
     * @returns 
     */
    structDel (dataStruct: MgrFileItem.CustomStruct) {
        let index: number;
        for (let i = 0; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom [i];
            if (listTypeObjectCustomI.struct.dataStruct.id == dataStruct.id) {
                index = i;
                break;
            };
        };
        if (index == null) {
            return;
        };
        let typeObject = this.listTypeObjectCustom [index];
        for (let i = 0; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom [i];
            listTypeObjectCustomI.onTypeObjectDel (typeObject);
        };
        this.listTypeObjectCustom.splice (index, 1);
        this.mapTypeObjectCustom.delete (typeObject.struct.dataStruct.id);
        this.mapTypeAll.delete (typeObject.struct.dataStruct.id);
        MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT).splice (index, 1);

        for (let i = index; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom [i];
            listTypeObjectCustomI.index = i;
        };
    }

    /**
     * 移
     * @param idxFrom 
     * @param idxTo 
     */
    structMove (idxFrom: number, idxTo: number) {
        let typeFrom = this.listTypeObjectCustom [idxFrom];
        this.listTypeObjectCustom.splice (idxFrom, 1);
        this.listTypeObjectCustom.splice (idxTo, 0, typeFrom);

        let srcFrom = MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT) [idxFrom];
        MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT).splice (idxFrom, 1);
        MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT).splice (idxTo, 0, srcFrom);

        let idxStart = Math.min (idxFrom, idxTo);
        let idxEnd = Math.max (idxFrom, idxTo);
        for (let i = idxStart; i <= idxEnd; i++) {
            this.listTypeObjectCustom [i].index = i;
        };
        for (let i = 0; i < this.listTypeObjectCustom.length; i++) {
            let listTypeObjectCustomI = this.listTypeObjectCustom [i];
            listTypeObjectCustomI.onIndexModify ();
        };
    }

    /**
     * 可选类型
     */
    listTypeSelectAble = new Array <StructPropertyType> ();

    /**
     * 可继承类型
     */
    listTypeExtendAble = new Array <StructPropertyTypeObject> ();

    /**
     * 总览列表
     */
    listTypeRead = new Array <StructPropertyType> ();
    /**
     * 编辑列表
     */
    listTypeEdit = new Array <StructPropertyType> ();
    /**
     * 属性迁移列表
     */
    listTypeMoveProperty = new Array <StructPropertyType> ();
    /**
     * 结构迁移列表
     */
    listTypeMoveStruct = new Array <StructPropertyType> ();

    /**
     * 事件派发 - 刷新
     */
    onRender () {
        this.listTypeSelectAble.length = 0;
        this.listTypeSelectAble.push (...StructPropertyTypeBasic.listType);
        this.listTypeSelectAble.push (...this.listTypeObjectCustom);

        this.listTypeExtendAble.length = 0;
        this.listTypeExtendAble.push (...this.listTypeObjectCustom);

        this.listTypeRead.length = 0;
        this.listTypeRead.push (...StructPropertyTypeBasic.listType);
        this.listTypeRead.push (this.typeRoot);
        this.listTypeRead.push (...this.listTypeObjectCustom);

        this.listTypeEdit.length = 0;
        this.listTypeEdit.push (this.typeRoot);
        this.listTypeEdit.push (...this.listTypeObjectCustom);

        this.listTypeMoveProperty.length = 0;
        this.listTypeMoveProperty.push (this.typeRoot);
        this.listTypeMoveProperty.push (...this.listTypeObjectCustom);

        this.listTypeMoveStruct.length = 0;
        this.listTypeMoveStruct.push (...this.listTypeObjectCustom);
    }
}

namespace IndexGlobal {
    /**
     * 全局实例
     */
    export const inst = new IndexGlobal ();

    /**
     * 下拉菜单的选项
     */
    export class SelectOptions {
        /**
         * 标识
         */
        value: number;

        /**
         * 备注
         */
        label: ReactComponentExtendInstance;

        init (key: number, label: ReactComponentExtendInstance) {
            this.value = key;
            this.label = label;
        }

        static poolType = new ObjectPoolType <SelectOptions> ({
            instantiate: () => new SelectOptions (),
            onPop: null,
            onPush: null
        });
    }
}
window ["indexGlobal"] = IndexGlobal.inst;
export default IndexGlobal;