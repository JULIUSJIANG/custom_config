import NodeModules from "../NodeModules.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import DomRoot from "../ui/DomRoot.js";
/**
 * 渲染管理器
 */
class MgrDom {
    constructor() {
        /**
         * 数据版本
         */
        this.dataVersion = 0;
        /**
         * 版本
         */
        this.version = 0;
    }
    /**
     * 初始化
     * @returns
     */
    init() {
        this._root = NodeModules.reactDomClient.createRoot(document.getElementById('app'));
        return Promise.resolve();
    }
    /**
     * 通知数据发生变化
     */
    callDataChange() {
        ++this.dataVersion;
    }
    /**
     * 刷新画面
     */
    refresh() {
        this.version++;
        // 正式渲染
        this._root.render(ReactComponentExtend.instantiateComponent(DomRoot, null));
    }
}
(function (MgrDom) {
    /**
     * 全局实例
     */
    MgrDom.inst = new MgrDom();
})(MgrDom || (MgrDom = {}));
;
export default MgrDom;
