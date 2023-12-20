import IndexGlobal from "../IndexGlobal.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
class DomTypeReadObjectPropertyReduce extends ReactComponentExtend {
    render() {
        let struct = this.props.struct;
        let property = this.props.property.maskCurrStatus.onGetData();
        let type = IndexGlobal.inst.mapTypeAll.get(property.dataProperty.type);
        return ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_BLACK,
            },
        }, `${property.dataProperty.demoName} / ${type.getDemoName()} / ${property.dataProperty.info}`);
    }
}
(function (DomTypeReadObjectPropertyReduce) {
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
    DomTypeReadObjectPropertyReduce.Args = Args;
})(DomTypeReadObjectPropertyReduce || (DomTypeReadObjectPropertyReduce = {}));
export default DomTypeReadObjectPropertyReduce;
