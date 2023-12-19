import CacheStructProperty from "./CacheStructProperty.js";


export default class CacheStructPropertyMaskStatus {

    /**
     * 归属的数据
     */
    rel: CacheStructProperty;

    public constructor (rel: CacheStructProperty) {
        this.rel = rel;
    }

    /**
     * 事件派发 - 进入状态
     */
    onEnter () {

    }

    /**
     * 事件派发 - 离开状态
     */
    onExit () {

    }

    /**
     * 事件派发 - 伪装开始
     */
    onMaskEnable (cacheStructProperty: CacheStructProperty) {

    }

    /**
     * 事件派发 - 伪装结束
     */
    onMaskDisable () {

    }

    /**
     * 获取数据
     */
    onGetData (): CacheStructProperty {
        return this.rel;
    }
}