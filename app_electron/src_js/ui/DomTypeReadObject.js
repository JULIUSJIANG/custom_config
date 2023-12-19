import objectPool from "../common/ObjectPool.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import DomTypeEditObjectProperty from "./DomTypeEditObjectProperty.js";
import DomTypeReadObjectProperty from "./DomTypeReadObjectProperty.js";
/**
 * 类型
 */
class DomTypeReadObject extends ReactComponentExtend {
    constructor() {
        super(...arguments);
        this.listChildren = new Array();
    }
    render() {
        let struct = this.props.data.struct;
        let custormStruct = this.props.data.struct.dataStruct;
        this.listChildren.length = 0;
        for (let i = 0; i < struct.propertyList.length; i++) {
            let propertyListI = struct.propertyList[i];
            let args = objectPool.pop(DomTypeEditObjectProperty.Args.poolType);
            args.init(struct, propertyListI);
            this.listChildren.push(ReactComponentExtend.instantiateComponent(DomTypeReadObjectProperty, args));
        }
        ;
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
        return ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, props, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_ALIGN_ITEMS]: MgrDomDefine.STYLE_ALIGN_ITEMS_CENTER,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
            }
        }, `${custormStruct.demoName} / ${custormStruct.info}`), ...this.listChildren);
    }
}
;
(function (DomTypeReadObject) {
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
    DomTypeReadObject.Args = Args;
})(DomTypeReadObject || (DomTypeReadObject = {}));
export default DomTypeReadObject;
