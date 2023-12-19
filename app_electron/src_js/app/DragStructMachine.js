import DragStructMachineStatusHovered from "./DragStructMachineStatusHovered.js";
import DragStructMachineStatusIdle from "./DragStructMachineStatusIdle.js";
import DragStructMachineStatusTarget from "./DragStructMachineStatusTarget.js";
/**
 * 类型拖拽的状态机
 */
export default class DragStructMachine {
    constructor() {
        this.statusIdle = new DragStructMachineStatusIdle(this);
        this.statusHover = new DragStructMachineStatusHovered(this);
        this.statusTarget = new DragStructMachineStatusTarget(this);
        this.enter(this.statusIdle);
    }
    /**
     * 切换状态
     * @param status
     */
    enter(status) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec) {
            rec.onExit();
        }
        ;
        this.currStatus.onEnter();
    }
}
