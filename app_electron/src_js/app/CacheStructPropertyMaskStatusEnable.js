import CacheStructPropertyMaskStatus from "./CacheStructPropertyMaskStatus.js";
/**
 * 伪装状态 - 伪装中
 */
export default class CacheStructPropertyMaskStatusEnable extends CacheStructPropertyMaskStatus {
    onMaskDisable() {
        this.rel.maskEnter(this.rel.maskStatusDisable);
    }
    onGetData() {
        return this.rel.maskTarget;
    }
}
