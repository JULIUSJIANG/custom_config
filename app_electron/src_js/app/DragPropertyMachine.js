import DragPropertyMachineStatusHovered from "./DragPropertyMachineStatusHovered.js";
import DragPropertyMachineStatusIdle from "./DragPropertyMachineStatusIdle.js";
import DragPropertyMachineStatusTarget from "./DragPropertyMachineStatusTarget.js";
/**
 * 类型拖拽的状态机
 */
export default class DragPropertyMachine {
    constructor() {
        this.statusIdle = new DragPropertyMachineStatusIdle(this);
        this.statusHover = new DragPropertyMachineStatusHovered(this);
        this.statusTarget = new DragPropertyMachineStatusTarget(this);
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
