import MgrDom from "./MgrDom.js";
import MgrResAssetsStatus from "./MgrResAssetsStatus.js";
/**
 * 资源数据 - 状态 - 加载完成
 */
export default class MgrResAssetsStatusFinished extends MgrResAssetsStatus {
    onEnter() {
        this.relAssets.evterFinished.call(null);
        MgrDom.inst.callDataChange();
    }
}
