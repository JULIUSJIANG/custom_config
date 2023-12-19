import MgrFileItem from "../mgr/MgrFileItem.js";
import CacheStruct from "./CacheStruct.js";
import CacheStructPropertyMaskStatus from "./CacheStructPropertyMaskStatus.js";
import CacheStructPropertyMaskStatusDisable from "./CacheStructPropertyMaskStatusDisable.js";
import CacheStructPropertyMaskStatusEnable from "./CacheStructPropertyMaskStatusEnable.js";

/**
 * 针对属性的缓存
 */
class CacheStructProperty {
    /**
     * 归属的数据
     */
    rel: CacheStruct;

    /**
     * 对应的数据
     */
    dataProperty: MgrFileItem.CustomStructProperty;

    public constructor (rel: CacheStruct, data: MgrFileItem.CustomStructProperty) {
        this.rel = rel;
        this.dataProperty = data;

        this.maskStatusDisable = new CacheStructPropertyMaskStatusDisable (this);
        this.maskStatusEnable = new CacheStructPropertyMaskStatusEnable (this);
        this.maskEnter (this.maskStatusDisable);
    }
    
    maskStatusDisable: CacheStructPropertyMaskStatusDisable;

    maskStatusEnable: CacheStructPropertyMaskStatusEnable;

    /**
     * 当前的伪装状态
     */
    maskCurrStatus: CacheStructPropertyMaskStatus;

    /**
     * 切换伪装状态
     */
    maskTarget: CacheStructProperty;

    /**
     * 切换伪装状态
     * @param status 
     */
    maskEnter (status: CacheStructPropertyMaskStatus) {
        let rec = this.maskCurrStatus;
        this.maskCurrStatus = status;
        if (rec) {
            rec.onExit ();
        };
        this.maskCurrStatus.onEnter ();
    }
}

export default CacheStructProperty;