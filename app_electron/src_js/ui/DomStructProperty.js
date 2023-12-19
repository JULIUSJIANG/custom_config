import IndexGlobal from "../IndexGlobal.js";
import NodeModules from "../NodeModules.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrDom from "../mgr/MgrDom.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import DomTextInput from "./DomTextInput.js";
class DomStructProperty extends ReactComponentExtend {
    render() {
        let customProperty = IndexGlobal.inst.mapIdToCustomStructProperty.get(this.props.id);
        let propsBtn = {
            [MgrDomDefine.PROPS_SIZE]: MgrDomDefine.PROPS_SIZE_SMALL,
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
            },
            onClick: () => {
                customProperty.isArray = !customProperty.isArray;
                MgrDom.inst.callDataChange();
            },
        };
        if (customProperty.isArray) {
            propsBtn[MgrDomDefine.PROPS_TYPE] = MgrDomDefine.PROPS_TYPE_PRIMARY;
        }
        ;
        return ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
            }
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
            }
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_BLACK,
                [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
            }
        }, `代号`), ReactComponentExtend.instantiateComponent(DomTextInput, {
            value: customProperty.demoName,
            onChange: (val) => {
                customProperty.demoName = val;
                MgrDom.inst.callDataChange();
            },
            style: {
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING
            }
        })), ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
            }
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_BLACK,
                [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
            }
        }, `描述`), ReactComponentExtend.instantiateComponent(DomTextInput, {
            value: customProperty.info,
            onChange: (val) => {
                customProperty.info = val;
                MgrDom.inst.callDataChange();
            },
            style: {
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING
            }
        })), ReactComponentExtend.instantiateTag(NodeModules.antd.Button, propsBtn, `多项`));
    }
}
(function (DomStructProperty) {
    class Args {
        init(id) {
            this.id = id;
        }
    }
    Args.poolType = new ObjectPoolType({
        instantiate: () => new Args,
        onPop: null,
        onPush: null
    });
    DomStructProperty.Args = Args;
})(DomStructProperty || (DomStructProperty = {}));
export default DomStructProperty;
