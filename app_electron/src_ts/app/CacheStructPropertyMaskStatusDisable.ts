import CacheStructProperty from "./CacheStructProperty.js";
import CacheStructPropertyMaskStatus from "./CacheStructPropertyMaskStatus.js";

/**
 * 伪装状态 - 不伪装
 */
export default class CacheStructPropertyMaskStatusDisable extends CacheStructPropertyMaskStatus {

    /**
     * 事件派发 - 伪装
     * @param cacheStructProperty 
     */
    onMaskEnable (cacheStructProperty: CacheStructProperty) {
        this.rel.maskTarget = cacheStructProperty;
        this.rel.maskEnter (this.rel.maskStatusEnable);
    }
}