export default class CacheStructPropertyMaskStatus {
    constructor(rel) {
        this.rel = rel;
    }
    /**
     * 事件派发 - 进入状态
     */
    onEnter() {
    }
    /**
     * 事件派发 - 离开状态
     */
    onExit() {
    }
    /**
     * 事件派发 - 伪装开始
     */
    onMaskEnable(cacheStructProperty) {
    }
    /**
     * 事件派发 - 伪装结束
     */
    onMaskDisable() {
    }
    /**
     * 获取数据
     */
    onGetData() {
        return this.rel;
    }
}
