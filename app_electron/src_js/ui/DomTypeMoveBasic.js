import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import NodeModules from "../NodeModules.js";
/**
 * 类型
 */
class DomTypeMoveBasic extends ReactComponentExtend {
    constructor() {
        super(...arguments);
        this.ref = NodeModules.react.createRef();
    }
    reactComponentExtendOnDraw() {
    }
    render() {
        let props = {
            style: {
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.CONFIG_TXT_BG_COLOR,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
            }
        };
        if (this.props.idx != 0) {
            props.style[MgrDomDefine.STYLE_MARGIN_TOP] = MgrDomDefine.CONFIG_TXT_SPACING;
        }
        ;
        return ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, props, `${this.props.data.demoName} / ${this.props.data.info}`);
    }
}
;
(function (DomTypeMoveBasic) {
    class Args {
        init(idx, data) {
            this.idx = idx;
            this.data = data;
        }
    }
    Args.poolType = new ObjectPoolType({
        instantiate: () => new Args,
        onPop: null,
        onPush: null
    });
    DomTypeMoveBasic.Args = Args;
})(DomTypeMoveBasic || (DomTypeMoveBasic = {}));
export default DomTypeMoveBasic;
