import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import NodeModules from "../NodeModules.js";
import IndexGlobal from "../IndexGlobal.js";
/**
 * 类型
 */
class DomTypeMoveObject extends ReactComponentExtend {
    constructor() {
        super(...arguments);
        this.ref = NodeModules.react.createRef();
    }
    reactComponentExtendOnInit() {
        let tag = this.ref.current;
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_START, (event) => {
            IndexGlobal.inst.dragMachineStruct.currStatus.onStart(this.relStruct);
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_ING, (event) => {
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_END, (event) => {
            IndexGlobal.inst.dragMachineStruct.currStatus.onEnd();
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_ENTER, (event) => {
            IndexGlobal.inst.dragMachineStruct.currStatus.onTargetEnter(this.relStruct);
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_OVER, (event) => {
            event.preventDefault();
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_LEAVE, (event) => {
            IndexGlobal.inst.dragMachineStruct.currStatus.onTargetLeave();
        });
    }
    reactComponentExtendOnDraw() {
        this.relStruct = this.props.data.struct;
    }
    render() {
        let custormStruct = this.props.data.struct.maskCurrStatus.onGetData().dataStruct;
        let props = {
            style: {
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.CONFIG_TXT_BG_COLOR,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
            },
            ref: this.ref,
            draggable: "true"
        };
        if (this.props.idx != 0) {
            props.style[MgrDomDefine.STYLE_MARGIN_TOP] = MgrDomDefine.CONFIG_TXT_SPACING;
        }
        ;
        return ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, props, `${custormStruct.demoName} / ${custormStruct.info}`);
    }
}
;
(function (DomTypeMoveObject) {
    class Args {
        init(idx, data) {
            this.idx = idx;
            this.data = data;
        }
    }
    Args.poolType2 = new ObjectPoolType({
        instantiate: () => new Args,
        onPop: null,
        onPush: null
    });
    DomTypeMoveObject.Args = Args;
})(DomTypeMoveObject || (DomTypeMoveObject = {}));
export default DomTypeMoveObject;
