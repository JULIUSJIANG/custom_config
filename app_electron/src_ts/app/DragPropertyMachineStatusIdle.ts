import CacheStruct from "./CacheStruct.js";
import CacheStructProperty from "./CacheStructProperty.js";
import DragPropertyMachineStatus from "./DragPropertyMachineStatus.js";
import DragStructMachineStatus from "./DragStructMachineStatus.js";

/**
 * 类型拖拽的状态机 - 状态 - 还没开始拖拽
 */
export default class DragPropertyMachineStatusIdle extends DragPropertyMachineStatus {

    onStart (cacheStruct: CacheStructProperty): void {
        this.relMachine.dragTargetStart = cacheStruct;
        this.relMachine.enter (this.relMachine.statusHover);
    }
}