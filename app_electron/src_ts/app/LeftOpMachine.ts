import MgrFile from "../mgr/MgrFile.js";
import MgrFileItem from "../mgr/MgrFileItem.js";
import LeftOpMachineStatus from "./LeftOpMachineStatus.js";
import LeftOPMachineStatusEdit from "./LeftOpMachineStatusEdit.js";
import LeftOpMachineStatusMoveProperty from "./LeftOpMachineStatusMoveProperty.js";
import LeftOpMachineStatusMoveStruct from "./LeftOpMachineStatusMoveStruct.js";
import LeftOPMachineStatusRead from "./LeftOpMachineStatusRead.js";

/**
 * 左侧栏行为状态机
 */
export default class LeftOpMachine {

    /**
     * 当前所有状态的集合
     */
    listStatus = new Array <LeftOpMachineStatus> ();

    /**
     * 标识到状态的映射
     */
    mapStatus = new Map <number, LeftOpMachineStatus> ();

    constructor () {
        this.statusRead = new LeftOPMachineStatusRead (this, 1, `总览`);
        this.statusEdit = new LeftOPMachineStatusEdit (this, 2, `编辑`);
        this.statusMoveProperty = new LeftOpMachineStatusMoveProperty (this, 3, `迁移属性`);
        this.statusMoveStruct = new LeftOpMachineStatusMoveStruct (this, 4, `迁移类型`);
        

        this.listStatus.push (this.statusRead, this.statusEdit, this.statusMoveProperty, this.statusMoveStruct);
        for (let i = 0; i < this.listStatus.length; i++) {
            let listStatusI = this.listStatus [i];
            this.mapStatus.set (listStatusI.id, listStatusI);
        };
    }

    statusRead: LeftOPMachineStatusRead;

    statusEdit: LeftOPMachineStatusEdit;

    statusMoveProperty: LeftOpMachineStatusMoveProperty;

    statusMoveStruct: LeftOpMachineStatusMoveStruct;

    /**
     * 当前状态
     */
    currStatus: LeftOpMachineStatus;

    /**
     * 切换状态
     * @param status 
     */
    enter (status: LeftOpMachineStatus) {
        MgrFile.inst.set (MgrFileItem.LEFT_OP, status.id);
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec) {
            rec.onExit ();
        };
        this.currStatus.onEnter ();
    }
}