import IndexGlobal from "../IndexGlobal.js";
import MgrDom from "../mgr/MgrDom.js";
import DragStructMachineStatus from "./DragStructMachineStatus.js";

/**
 * 类型拖拽的状态机 - 状态 - 当前悬停在合适目标上面
 */
export default class DragStructMachineStatusTarget extends DragStructMachineStatus {

    /**
     * 拖拽的起始索引
     */
    idxStart: number;

    /**
     * 拖拽的悬停索引
     */
    idxHover: number;

    onEnter () {
        for (let i = 0; i < IndexGlobal.inst.structList.length; i++) {
            let structListI = IndexGlobal.inst.structList [i];
            if (structListI == this.relMachine.dragTargetStart) {
                this.idxStart = i;
            };
            if (structListI == this.relMachine.dragTargetHover) {
                this.idxHover = i;
            };
        };
        if (this.idxStart < this.idxHover) {
            for (let i = this.idxStart; i < this.idxHover; i++) {
                let dbListImgI = IndexGlobal.inst.structList [i];
                let dbListImgINext = IndexGlobal.inst.structList [i + 1];
                dbListImgI.maskCurrStatus.onMaskEnable (dbListImgINext);
            }; 
        };
        if (this.idxHover < this.idxStart) {
            for (let i = this.idxStart; this.idxHover < i; i--) {
                let dbListImgI = IndexGlobal.inst.structList [i];
                let dbListImgINext = IndexGlobal.inst.structList [i - 1];
                dbListImgI.maskCurrStatus.onMaskEnable (dbListImgINext);
            };
        };
        this.relMachine.dragTargetHover.maskCurrStatus.onMaskEnable (this.relMachine.dragTargetStart);
        MgrDom.inst.callDataChange ();
    }

    onTargetLeave (): void {
        for (let i = 0; i < IndexGlobal.inst.structList.length; i++) {
            let dbImg = IndexGlobal.inst.structList [i];
            dbImg.maskCurrStatus.onMaskDisable ();
        };
        this.relMachine.enter (this.relMachine.statusHover);
        MgrDom.inst.callDataChange ();
    }

    onEnd (): void {
        for (let i = 0; i < IndexGlobal.inst.structList.length; i++) {
            let dbImg = IndexGlobal.inst.structList [i];
            dbImg.maskCurrStatus.onMaskDisable ();
        };
        IndexGlobal.inst.structMove (this.idxStart, this.idxHover);
        this.relMachine.enter (this.relMachine.statusIdle);
        MgrDom.inst.callDataChange ();
    }
}