/**
 * 伪装状态
 */
export default class CacheStructMaskStatus {
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
     * @param cacheStruct
     */
    onMaskEnable(cacheStruct) {
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
