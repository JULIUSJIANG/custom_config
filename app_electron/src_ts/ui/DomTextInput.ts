import NodeModules from "../NodeModules.js";
import DomTextInputStatus from "./DomTextInputStatus.js";
import DomTextInputStatusIdle from "./DomTextInputStatusIdle.js";
import DomTextInputStatusEditing from "./DomTextInputStatusEditing.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";

/**
 * 文本输入框
 * （直接用 input 回传值然后刷新的话，一大堆问题）
 */
class DomTextInput extends ReactComponentExtend <DomTextInput.DomTextInputArgs> {

    constructor (state, props) {
        super (state, props);

        this.statusIdle = new DomTextInputStatusIdle (this);
        this.statusEditing = new DomTextInputStatusEditing (this);
        this.enterStatus (this.statusIdle);
    }

    /**
     * 状态 - 待机
     */
    statusIdle: DomTextInputStatusIdle;
    /**
     * 状态 - 中文智能提示中
     */
    statusEditing: DomTextInputStatusEditing;

    /**
     * 当前状态
     */
    currStatus: DomTextInputStatus;
    /**
     * 进入状态
     * @param status 
     */
    enterStatus (status: DomTextInputStatus) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec) {
            rec.onExit ();
        };
        this.currStatus.onEnter ();
    }

    /**
     * 实体的引用
     */
    inputRef = NodeModules.react.createRef();

    componentDidMount () {
        this.componentDidUpdate ();
    }

    componentDidUpdate () {
        this.currStatus.onDidUpdate ();
    }

    render() {
        const commonProps = {
            onChange: () => {
                this.currStatus.onChange ();
            },

            onCompositionStart: () => {
                this.currStatus.onCompositionStart ();
            },
            onCompositionUpdate: () => {
                this.currStatus.onCompositionUpdate ();
            },
            onCompositionEnd: () => {
                this.currStatus.onCompositionEnd ();
            },
        };
        return ReactComponentExtend.instantiateTag (
            MgrDomDefine.TAG_INPUT,
            {
                className: "ant-input css-dev-only-do-not-override-1jr9qlj",
                ref: this.inputRef,
                type: "text",
                ...commonProps,
                style: {
                    ...this.props.style
                }
            }
        );
    }
}

namespace DomTextInput {

    /**
     * 参数
     */
    export interface DomTextInputArgs {
        /**
         * 值
         */
        value: string;

        /**
         * 回调
         */
        onChange: (val) => void;

        /**
         * 样式
         */
        style: any;
    }
}

export default DomTextInput;