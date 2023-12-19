/**
 * 类型拖拽的状态机 - 状态
 */
export default class DragStructMachineStatus {
    constructor(relMachine) {
        this.relMachine = relMachine;
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
    /**
     * 事件派发 - 拖拽开始
     * @param cacheStruct
     */
    onStart(cacheStruct) {
    }
    /**
     * 事件派发 - 拖拽结束
     */
    onEnd() {
    }
    /**
     * 事件派发 - 悬停合适目标
     */
    onTargetEnter(cacheStruct) {
    }
    /**
     * 事件派发 - 离开合适目标
     * @param cacheStruct
     */
    onTargetLeave() {
    }
}
