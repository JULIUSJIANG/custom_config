import CacheStruct from "./CacheStruct.js";
import CacheStructMaskStatus from "./CacheStructMaskStatus.js";

/**
 * 伪装状态 - 伪装中
 */
export default class CacheStructMaskStatusEnable extends CacheStructMaskStatus {

    onMaskDisable(): void {
        this.rel.maskEnter (this.rel.maskStatusDisable);
    }

    onGetData (): CacheStruct {
        return this.rel.maskTarget;
    }
}