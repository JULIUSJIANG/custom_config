import CacheStruct from "./CacheStruct.js";
import CacheStructMaskStatus from "./CacheStructMaskStatus.js";

/**
 * 伪装状态 - 不伪装
 */
export default class CacheStructMaskStatusDisable extends CacheStructMaskStatus {

    /**
     * 事件派发 - 伪装
     * @param cacheStruct 
     */
    onMaskEnable (cacheStruct: CacheStruct) {
        this.rel.maskTarget = cacheStruct;
        this.rel.maskEnter (this.rel.maskStatusEnable);
    }
}