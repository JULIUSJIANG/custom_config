/**
 * 左侧栏行为状态机 - 状态
 */
export default class LeftOpMachineStatus {
    constructor(rel, id, name) {
        this.relMachine = rel;
        this.id = id;
        this.name = name;
    }
    /**
     * 事件派发 - 进入状态
     */
    onEnter() {
    }
    /**
     * 事件派发 - 离开状态
     */
    onExit() {
    }
}
