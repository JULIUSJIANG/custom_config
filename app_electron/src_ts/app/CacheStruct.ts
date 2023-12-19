import MgrFileItem from "../mgr/MgrFileItem.js";
import CacheStructMaskStatus from "./CacheStructMaskStatus.js";
import CacheStructMaskStatusDisable from "./CacheStructMaskStatusDisable.js";
import CacheStructMaskStatusEnable from "./CacheStructMaskStatusEnable.js";
import CacheStructProperty from "./CacheStructProperty.js";

/**
 * 针对结构的缓存
 */
class CacheStruct {

    /**
     * 对应的数据
     */
    dataStruct: MgrFileItem.CustomStruct;

    public constructor (data: MgrFileItem.CustomStruct) {
        this.dataStruct = data;
        let clone = [...this.dataStruct.listProperty];
        this.dataStruct.listProperty.length = 0;
        for (let i = 0; i < clone.length; i++) {
            let cloneI = clone [i];
            this.propertyAdd (cloneI);
        };

        this.maskStatusDisable = new CacheStructMaskStatusDisable (this);
        this.maskStatusEnable = new CacheStructMaskStatusEnable (this);
        this.maskEnter (this.maskStatusDisable);
    }

    /**
     * 属性集合
     */
    propertyList = new Array <CacheStructProperty> ();

    /**
     * 属性映射
     */
    propertyMap = new Map <number, CacheStructProperty> ();

    /**
     * 增
     * @param dataProperty 
     */
    propertyAdd (dataProperty: MgrFileItem.CustomStructProperty) {
        let cache = new CacheStructProperty (this, dataProperty);
        this.propertyMap.set (cache.dataProperty.id, cache);
        this.propertyList.push (cache);
        this.dataStruct.listProperty.push (dataProperty);
    }

    /**
     * 删
     * @param dataProperty 
     */
    propertyDel (dataProperty: MgrFileItem.CustomStructProperty) {
        let index: number;
        for (let i = 0; i < this.propertyList.length; i++) {
            let propertyListI = this.propertyList [i];
            if (propertyListI.dataProperty.id == dataProperty.id) {
                index = i;
                break;
            };
        };
        if (index == null) {
            return;
        };
        let cache = this.propertyList [index];
        this.propertyMap.delete (cache.dataProperty.id);
        this.propertyList.splice (index, 1);
        this.dataStruct.listProperty.splice (index, 1);
    }

    /**
     * 移
     * @param idxFrom 
     * @param idxTo 
     */
    propertyMove (idxFrom: number, idxTo: number) {
        let cacheFrom = this.propertyList [idxFrom];
        this.propertyList.splice (idxFrom, 1);
        this.propertyList.splice (idxTo, 0, cacheFrom);

        let srcFrom = this.dataStruct.listProperty [idxFrom];
        this.dataStruct.listProperty.splice (idxFrom, 1);
        this.dataStruct.listProperty.splice (idxTo, 0, srcFrom);
    }

    maskStatusDisable: CacheStructMaskStatusDisable;

    maskStatusEnable: CacheStructMaskStatusEnable;

    /**
     * 当前的伪装状态
     */
    maskCurrStatus: CacheStructMaskStatus;

    /**
     * 当前的伪装状态
     */
    maskTarget: CacheStruct;

    /**
     * 切换伪装状态
     * @param status 
     */
    maskEnter (status: CacheStructMaskStatus) {
        let rec = this.maskCurrStatus;
        this.maskCurrStatus = status;
        if (rec) {
            rec.onExit ();
        };
        this.maskCurrStatus.onEnter ();
    }
}

export default CacheStruct;