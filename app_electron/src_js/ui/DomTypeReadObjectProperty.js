import IndexGlobal from "../IndexGlobal.js";
import NodeModules from "../NodeModules.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
class DomTypeReadObjectProperty extends ReactComponentExtend {
    constructor() {
        super(...arguments);
        this.ref = NodeModules.react.createRef();
    }
    reactComponentExtendOnInit() {
        let tag = this.ref.current;
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_START, (event) => {
            IndexGlobal.inst.dragMachineProperty.currStatus.onStart(this.relProperty);
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_ING, (event) => {
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_END, (event) => {
            IndexGlobal.inst.dragMachineProperty.currStatus.onEnd();
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_ENTER, (event) => {
            IndexGlobal.inst.dragMachineProperty.currStatus.onTargetEnter(this.relProperty);
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_OVER, (event) => {
            event.preventDefault();
        });
        tag.addEventListener(MgrDomDefine.EVT_NAME_DRAG_LEAVE, (event) => {
            IndexGlobal.inst.dragMachineProperty.currStatus.onTargetLeave();
        });
    }
    reactComponentExtendOnDraw() {
        this.relProperty = this.props.property;
    }
    render() {
        let struct = this.props.struct;
        let property = this.props.property.maskCurrStatus.onGetData();
        let type = IndexGlobal.inst.mapType.get(property.dataProperty.type);
        return ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_BLACK,
                [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
            },
            ref: this.ref,
            draggable: "true"
        }, `${property.dataProperty.demoName} / ${type.getDemoName()} / ${property.dataProperty.info}`);
    }
}
(function (DomTypeReadObjectProperty) {
    class Args {
        init(struct, property) {
            this.struct = struct;
            this.property = property;
        }
    }
    Args.poolType = new ObjectPoolType({
        instantiate: () => new Args,
        onPop: null,
        onPush: null
    });
    DomTypeReadObjectProperty.Args = Args;
})(DomTypeReadObjectProperty || (DomTypeReadObjectProperty = {}));
export default DomTypeReadObjectProperty;
