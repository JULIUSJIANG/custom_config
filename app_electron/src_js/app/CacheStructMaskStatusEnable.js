import CacheStructMaskStatus from "./CacheStructMaskStatus.js";
/**
 * 伪装状态 - 伪装中
 */
export default class CacheStructMaskStatusEnable extends CacheStructMaskStatus {
    onMaskDisable() {
        this.rel.maskEnter(this.rel.maskStatusDisable);
    }
    onGetData() {
        return this.rel.maskTarget;
    }
}
