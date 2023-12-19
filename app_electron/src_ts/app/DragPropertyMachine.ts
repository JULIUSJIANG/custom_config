import CacheStruct from "./CacheStruct.js";
import CacheStructProperty from "./CacheStructProperty.js";
import DragPropertyMachineStatus from "./DragPropertyMachineStatus.js";
import DragPropertyMachineStatusHovered from "./DragPropertyMachineStatusHovered.js";
import DragPropertyMachineStatusIdle from "./DragPropertyMachineStatusIdle.js";
import DragPropertyMachineStatusTarget from "./DragPropertyMachineStatusTarget.js";
import DragStructMachineStatus from "./DragStructMachineStatus.js";
import DragStructMachineStatusHovered from "./DragStructMachineStatusHovered.js";
import DragStructMachineStatusIdle from "./DragStructMachineStatusIdle.js";
import DragStructMachineStatusTarget from "./DragStructMachineStatusTarget.js";

/**
 * 类型拖拽的状态机
 */
export default class DragPropertyMachine {

    /**
     * 拖拽的目标
     */
    dragTargetStart: CacheStructProperty;

    /**
     * 当前悬停的目标
     */
    dragTargetHover: CacheStructProperty;

    constructor () {    

        this.statusIdle = new DragPropertyMachineStatusIdle (this);
        this.statusHover = new DragPropertyMachineStatusHovered (this);
        this.statusTarget = new DragPropertyMachineStatusTarget (this);

        this.enter (this.statusIdle);
    }

    statusIdle: DragPropertyMachineStatusIdle;

    statusHover: DragPropertyMachineStatusHovered;

    statusTarget: DragPropertyMachineStatusTarget;

    /**
     * 当前状态
     */
    currStatus: DragPropertyMachineStatus;

    /**
     * 切换状态
     * @param status 
     */
    enter (status: DragPropertyMachineStatus) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec) {
            rec.onExit ();
        };
        this.currStatus.onEnter ();
    }
}