import CacheStructPropertyMaskStatusDisable from "./CacheStructPropertyMaskStatusDisable.js";
import CacheStructPropertyMaskStatusEnable from "./CacheStructPropertyMaskStatusEnable.js";
/**
 * 针对属性的缓存
 */
class CacheStructProperty {
    constructor(rel, data) {
        this.rel = rel;
        this.dataProperty = data;
        this.maskStatusDisable = new CacheStructPropertyMaskStatusDisable(this);
        this.maskStatusEnable = new CacheStructPropertyMaskStatusEnable(this);
        this.maskEnter(this.maskStatusDisable);
    }
    /**
     * 切换伪装状态
     * @param status
     */
    maskEnter(status) {
        let rec = this.maskCurrStatus;
        this.maskCurrStatus = status;
        if (rec) {
            rec.onExit();
        }
        ;
        this.maskCurrStatus.onEnter();
    }
}
export default CacheStructProperty;
