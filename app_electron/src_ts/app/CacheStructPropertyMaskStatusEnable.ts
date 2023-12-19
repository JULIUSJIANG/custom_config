import CacheStructProperty from "./CacheStructProperty.js";
import CacheStructPropertyMaskStatus from "./CacheStructPropertyMaskStatus.js";

/**
 * 伪装状态 - 伪装中
 */
export default class CacheStructPropertyMaskStatusEnable extends CacheStructPropertyMaskStatus {

    onMaskDisable(): void {
        this.rel.maskEnter (this.rel.maskStatusDisable);
    }

    onGetData (): CacheStructProperty {
        return this.rel.maskTarget;
    }
}