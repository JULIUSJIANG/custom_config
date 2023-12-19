import CacheStruct from "./CacheStruct.js";
import DragStructMachineStatus from "./DragStructMachineStatus.js";

/**
 * 类型拖拽的状态机 - 状态 - 正在游荡
 */
export default class DragStructMachineStatusHovered extends DragStructMachineStatus {

    onEnd (): void {
        this.relMachine.enter (this.relMachine.statusIdle);
    }

    onTargetEnter (cacheStruct: CacheStruct): void {
        if (cacheStruct == this.relMachine.dragTargetStart) {
            return;
        };
        this.relMachine.dragTargetHover = cacheStruct;
        this.relMachine.enter (this.relMachine.statusTarget);
    }
}