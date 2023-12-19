import CacheStruct from "./CacheStruct.js";
import DragStructMachineStatus from "./DragStructMachineStatus.js";
import DragStructMachineStatusHovered from "./DragStructMachineStatusHovered.js";
import DragStructMachineStatusIdle from "./DragStructMachineStatusIdle.js";
import DragStructMachineStatusTarget from "./DragStructMachineStatusTarget.js";

/**
 * 类型拖拽的状态机
 */
export default class DragStructMachine {

    /**
     * 拖拽的目标
     */
    dragTargetStart: CacheStruct;

    /**
     * 当前悬停的目标
     */
    dragTargetHover: CacheStruct;

    constructor () {    

        this.statusIdle = new DragStructMachineStatusIdle (this);
        this.statusHover = new DragStructMachineStatusHovered (this);
        this.statusTarget = new DragStructMachineStatusTarget (this);

        this.enter (this.statusIdle);
    }

    statusIdle: DragStructMachineStatusIdle;

    statusHover: DragStructMachineStatusHovered;

    statusTarget: DragStructMachineStatusTarget;

    /**
     * 当前状态
     */
    currStatus: DragStructMachineStatus;

    /**
     * 切换状态
     * @param status 
     */
    enter (status: DragStructMachineStatus) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec) {
            rec.onExit ();
        };
        this.currStatus.onEnter ();
    }
}