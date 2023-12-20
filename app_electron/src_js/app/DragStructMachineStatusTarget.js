import IndexGlobal from "../IndexGlobal.js";
import MgrDom from "../mgr/MgrDom.js";
import DragStructMachineStatus from "./DragStructMachineStatus.js";
/**
 * 类型拖拽的状态机 - 状态 - 当前悬停在合适目标上面
 */
export default class DragStructMachineStatusTarget extends DragStructMachineStatus {
    onEnter() {
        for (let i = 0; i < IndexGlobal.inst.listTypeObjectCustom.length; i++) {
            let structListI = IndexGlobal.inst.listTypeObjectCustom[i];
            if (structListI.struct == this.relMachine.dragTargetStart) {
                this.idxStart = i;
            }
            ;
            if (structListI.struct == this.relMachine.dragTargetHover) {
                this.idxHover = i;
            }
            ;
        }
        ;
        if (this.idxStart < this.idxHover) {
            for (let i = this.idxStart; i < this.idxHover; i++) {
                let dbListImgI = IndexGlobal.inst.listTypeObjectCustom[i];
                let dbListImgINext = IndexGlobal.inst.listTypeObjectCustom[i + 1];
                dbListImgI.struct.maskCurrStatus.onMaskEnable(dbListImgINext.struct);
            }
            ;
        }
        ;
        if (this.idxHover < this.idxStart) {
            for (let i = this.idxStart; this.idxHover < i; i--) {
                let dbListImgI = IndexGlobal.inst.listTypeObjectCustom[i];
                let dbListImgINext = IndexGlobal.inst.listTypeObjectCustom[i - 1];
                dbListImgI.struct.maskCurrStatus.onMaskEnable(dbListImgINext.struct);
            }
            ;
        }
        ;
        this.relMachine.dragTargetHover.maskCurrStatus.onMaskEnable(this.relMachine.dragTargetStart);
        MgrDom.inst.callDataChange();
    }
    onTargetLeave() {
        for (let i = 0; i < IndexGlobal.inst.listTypeObjectCustom.length; i++) {
            let dbImg = IndexGlobal.inst.listTypeObjectCustom[i];
            dbImg.struct.maskCurrStatus.onMaskDisable();
        }
        ;
        this.relMachine.enter(this.relMachine.statusHover);
        MgrDom.inst.callDataChange();
    }
    onEnd() {
        for (let i = 0; i < IndexGlobal.inst.listTypeObjectCustom.length; i++) {
            let dbImg = IndexGlobal.inst.listTypeObjectCustom[i];
            dbImg.struct.maskCurrStatus.onMaskDisable();
        }
        ;
        IndexGlobal.inst.structMove(this.idxStart, this.idxHover);
        this.relMachine.enter(this.relMachine.statusIdle);
        MgrDom.inst.callDataChange();
    }
}
