import LeftOpMachine from "./LeftOpMachine.js";

/**
 * 左侧栏行为状态机 - 状态
 */
export default class LeftOpMachineStatus {

    /**
     * 归属的状态机
     */
    relMachine: LeftOpMachine;

    /**
     * 标识
     */
    id: number;

    /**
     * 别名
     */
    name: string;

    constructor (rel: LeftOpMachine, id: number, name: string) {
        this.relMachine = rel;
        this.id = id;
        this.name = name;
    }

    /**
     * 事件派发 - 进入状态
     */
    onEnter () {

    }

    /**
     * 事件派发 - 离开状态
     */
    onExit () {

    }
}