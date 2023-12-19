import MgrFile from "../mgr/MgrFile.js";
import MgrFileItem from "../mgr/MgrFileItem.js";
import LeftOPMachineStatusEdit from "./LeftOpMachineStatusEdit.js";
import LeftOPMachineStatusMove from "./LeftOpMachineStatusMove.js";
import LeftOPMachineStatusRead from "./LeftOpMachineStatusRead.js";
/**
 * 左侧栏行为状态机
 */
export default class LeftOpMachine {
    constructor() {
        /**
         * 当前所有状态的集合
         */
        this.listStatus = new Array();
        /**
         * 标识到状态的映射
         */
        this.mapStatus = new Map();
        this.statusRead = new LeftOPMachineStatusRead(this, 1, `迁移属性`);
        this.statusMove = new LeftOPMachineStatusMove(this, 2, `迁移类型`);
        this.statusEdit = new LeftOPMachineStatusEdit(this, 3, `编辑`);
        this.listStatus.push(this.statusRead, this.statusMove, this.statusEdit);
        for (let i = 0; i < this.listStatus.length; i++) {
            let listStatusI = this.listStatus[i];
            this.mapStatus.set(listStatusI.id, listStatusI);
        }
        ;
    }
    /**
     * 切换状态
     * @param status
     */
    enter(status) {
        MgrFile.inst.set(MgrFileItem.LEFT_OP, status.id);
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec) {
            rec.onExit();
        }
        ;
        this.currStatus.onEnter();
    }
}
