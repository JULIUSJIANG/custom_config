import MgrDom from "../mgr/MgrDom.js";
import DragPropertyMachineStatus from "./DragPropertyMachineStatus.js";
/**
 * 类型拖拽的状态机 - 状态 - 当前悬停在合适目标上面
 */
export default class DragPropertyMachineStatusTarget extends DragPropertyMachineStatus {
    onEnter() {
        let relList = this.relMachine.dragTargetStart.rel.propertyList;
        for (let i = 0; i < relList.length; i++) {
            let structListI = relList[i];
            if (structListI == this.relMachine.dragTargetStart) {
                this.idxStart = i;
            }
            ;
            if (structListI == this.relMachine.dragTargetHover) {
                this.idxHover = i;
            }
            ;
        }
        ;
        if (this.idxStart < this.idxHover) {
            for (let i = this.idxStart; i < this.idxHover; i++) {
                let dbListImgI = relList[i];
                let dbListImgINext = relList[i + 1];
                dbListImgI.maskCurrStatus.onMaskEnable(dbListImgINext);
            }
            ;
        }
        ;
        if (this.idxHover < this.idxStart) {
            for (let i = this.idxStart; this.idxHover < i; i--) {
                let dbListImgI = relList[i];
                let dbListImgINext = relList[i - 1];
                dbListImgI.maskCurrStatus.onMaskEnable(dbListImgINext);
            }
            ;
        }
        ;
        this.relMachine.dragTargetHover.maskCurrStatus.onMaskEnable(this.relMachine.dragTargetStart);
        MgrDom.inst.callDataChange();
    }
    onTargetLeave() {
        let relList = this.relMachine.dragTargetStart.rel.propertyList;
        for (let i = 0; i < relList.length; i++) {
            let dbImg = relList[i];
            dbImg.maskCurrStatus.onMaskDisable();
        }
        ;
        this.relMachine.enter(this.relMachine.statusHover);
        MgrDom.inst.callDataChange();
    }
    onEnd() {
        let relList = this.relMachine.dragTargetStart.rel.propertyList;
        for (let i = 0; i < relList.length; i++) {
            let dbImg = relList[i];
            dbImg.maskCurrStatus.onMaskDisable();
        }
        ;
        this.relMachine.dragTargetStart.rel.propertyMove(this.idxStart, this.idxHover);
        this.relMachine.enter(this.relMachine.statusIdle);
        MgrDom.inst.callDataChange();
    }
}
