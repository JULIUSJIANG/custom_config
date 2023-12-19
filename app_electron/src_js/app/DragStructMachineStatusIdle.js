import DragStructMachineStatus from "./DragStructMachineStatus.js";
/**
 * 类型拖拽的状态机 - 状态 - 还没开始拖拽
 */
export default class DragStructMachineStatusIdle extends DragStructMachineStatus {
    onStart(cacheStruct) {
        this.relMachine.dragTargetStart = cacheStruct;
        this.relMachine.enter(this.relMachine.statusHover);
    }
}
