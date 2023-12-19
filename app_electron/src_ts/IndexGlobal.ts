import CacheStruct from "./app/CacheStruct.js";
import DragPropertyMachine from "./app/DragPropertyMachine.js";
import DragStructMachine from "./app/DragStructMachine.js";
import LeftOpMachine from "./app/LeftOpMachine.js";
import StructPropertyType from "./app/StructPropertyType.js";
import StructPropertyTypeBasic from "./app/StructPropertyTypeBasic.js";
import StructPropertyTypeObject from "./app/StructPropertyTypeObject.js";
import ObjectPoolType from "./common/ObjectPoolType.js";
import ReactComponentExtendInstance from "./common/ReactComponentExtendInstance.js";
import MgrFile from "./mgr/MgrFile.js";
import MgrFileItem from "./mgr/MgrFileItem.js";
import MgrSdk from "./mgr/MgrSdk.js";

class IndexGlobal {

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
    }

    /**
     * 结构集合
     */
    structList = new Array <CacheStruct> ();

    /**
     * 结构映射
     */
    structMap = new Map <number, CacheStruct> ();

    /**
     * 增
     * @param dataStruct 
     */
    structAdd (dataStruct: MgrFileItem.CustomStruct) {
        let cache = new CacheStruct (dataStruct);
        this.structMap.set (cache.dataStruct.id, cache);
        this.structList.push (cache);
        MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT).push (dataStruct);
        let type = new StructPropertyTypeObject ();
        type.init (cache);
        this.listTypeObject.push (type);
    }

    /**
     * 删
     * @param dataStruct 
     * @returns 
     */
    structDel (dataStruct: MgrFileItem.CustomStruct) {
        let index: number;
        for (let i = 0; i < this.structList.length; i++) {
            let structListI = this.structList [i];
            if (structListI.dataStruct.id == dataStruct.id) {
                index = i;
                break;
            };
        };
        if (index == null) {
            return;
        };
        let cache = this.structList [index];
        this.structMap.delete (cache.dataStruct.id);
        this.structList.splice (index, 1);
        MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT).splice (index, 1);
        this.listTypeObject.splice (index, 1);
    }

    /**
     * 移
     * @param idxFrom 
     * @param idxTo 
     */
    structMove (idxFrom: number, idxTo: number) {
        let cacheFrom = this.structList [idxFrom];
        this.structList.splice (idxFrom, 1);
        this.structList.splice (idxTo, 0, cacheFrom);

        let srcFrom = MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT) [idxFrom];
        MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT).splice (idxFrom, 1);
        MgrFile.inst.get (MgrFileItem.LIST_CUSTOM_STRUCT).splice (idxTo, 0, srcFrom);

        let typeFrom = this.listTypeObject [idxFrom];
        this.listTypeObject.splice (idxFrom, 1);
        this.listTypeObject.splice (idxTo, 0, typeFrom);
    }


    /**
     * 当前所有类型的集合
     */
    listType = new Array <StructPropertyType> ();

    /**
     * 对象类型的集合
     */
    listTypeObject = new Array <StructPropertyTypeObject> ();

    /**
     * 标识到具体类型的映射
     */
    mapType = new Map <number, StructPropertyType> ();

    /**
     * 事件派发 - 刷新
     */
    onRender () {
        this.listType.length = 0;
        this.listType.push (...StructPropertyTypeBasic.listType);
        this.listType.push (...this.listTypeObject);

        this.mapType.clear ();
        for (let i = 0; i < this.listType.length; i++) {
            let listTypeI = this.listType [i];
            this.mapType.set (listTypeI.getId (), listTypeI);
        };
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
         * 描述
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