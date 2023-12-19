import CacheStruct from "./CacheStruct.js";
import CacheStructProperty from "./CacheStructProperty.js";
import DragPropertyMachineStatus from "./DragPropertyMachineStatus.js";
import DragStructMachineStatus from "./DragStructMachineStatus.js";

/**
 * 类型拖拽的状态机 - 状态 - 正在游荡
 */
export default class DragPropertyMachineStatusHovered extends DragPropertyMachineStatus {

    onEnd (): void {
        this.relMachine.enter (this.relMachine.statusIdle);
    }

    onTargetEnter (cacheProperty: CacheStructProperty): void {
        if (cacheProperty == this.relMachine.dragTargetStart) {
            return;
        };
        // 不属于同一个类型的话，忽略
        if (cacheProperty.rel != this.relMachine.dragTargetStart.rel) {
            return;
        };
        this.relMachine.dragTargetHover = cacheProperty;
        this.relMachine.enter (this.relMachine.statusTarget);
    }
}