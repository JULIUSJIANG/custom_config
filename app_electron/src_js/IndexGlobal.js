import CacheStruct from "./app/CacheStruct.js";
import DragPropertyMachine from "./app/DragPropertyMachine.js";
import DragStructMachine from "./app/DragStructMachine.js";
import LeftOpMachine from "./app/LeftOpMachine.js";
import StructPropertyTypeBasic from "./app/StructPropertyTypeBasic.js";
import StructPropertyTypeObject from "./app/StructPropertyTypeObject.js";
import ObjectPoolType from "./common/ObjectPoolType.js";
import MgrFile from "./mgr/MgrFile.js";
import MgrFileItem from "./mgr/MgrFileItem.js";
import MgrSdk from "./mgr/MgrSdk.js";
class IndexGlobal {
    constructor() {
        /**
         * 结构集合
         */
        this.structList = new Array();
        /**
         * 结构映射
         */
        this.structMap = new Map();
        /**
         * 当前所有类型的集合
         */
        this.listType = new Array();
        /**
         * 对象类型的集合
         */
        this.listTypeObject = new Array();
        /**
         * 标识到具体类型的映射
         */
        this.mapType = new Map();
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
        let cache = new CacheStruct(dataStruct);
        this.structMap.set(cache.dataStruct.id, cache);
        this.structList.push(cache);
        MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT).push(dataStruct);
        let type = new StructPropertyTypeObject();
        type.init(cache);
        this.listTypeObject.push(type);
    }
    /**
     * 删
     * @param dataStruct
     * @returns
     */
    structDel(dataStruct) {
        let index;
        for (let i = 0; i < this.structList.length; i++) {
            let structListI = this.structList[i];
            if (structListI.dataStruct.id == dataStruct.id) {
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
        let cache = this.structList[index];
        this.structMap.delete(cache.dataStruct.id);
        this.structList.splice(index, 1);
        MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT).splice(index, 1);
        this.listTypeObject.splice(index, 1);
    }
    /**
     * 移
     * @param idxFrom
     * @param idxTo
     */
    structMove(idxFrom, idxTo) {
        let cacheFrom = this.structList[idxFrom];
        this.structList.splice(idxFrom, 1);
        this.structList.splice(idxTo, 0, cacheFrom);
        let srcFrom = MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT)[idxFrom];
        MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT).splice(idxFrom, 1);
        MgrFile.inst.get(MgrFileItem.LIST_CUSTOM_STRUCT).splice(idxTo, 0, srcFrom);
        let typeFrom = this.listTypeObject[idxFrom];
        this.listTypeObject.splice(idxFrom, 1);
        this.listTypeObject.splice(idxTo, 0, typeFrom);
    }
    /**
     * 事件派发 - 刷新
     */
    onRender() {
        this.listType.length = 0;
        this.listType.push(...StructPropertyTypeBasic.listType);
        this.listType.push(...this.listTypeObject);
        this.mapType.clear();
        for (let i = 0; i < this.listType.length; i++) {
            let listTypeI = this.listType[i];
            this.mapType.set(listTypeI.getId(), listTypeI);
        }
        ;
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
