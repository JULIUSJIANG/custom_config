import NodeModules from "../NodeModules.js";
import objectPool from "../common/ObjectPool.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrDom from "../mgr/MgrDom.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import MgrFile from "../mgr/MgrFile.js";
import MgrFileItem from "../mgr/MgrFileItem.js";
import DomTypeEditObjectProperty from "./DomTypeEditObjectProperty.js";
import StructPropertyTypeBasic from "../app/StructPropertyTypeBasic.js";
/**
 * 类型
 */
class DomTypeEditRoot extends ReactComponentExtend {
    constructor() {
        super(...arguments);
        this.listChildren = new Array();
    }
    render() {
        let struct = this.props.data;
        let custormStruct = this.props.data.dataStruct;
        this.listChildren.length = 0;
        for (let i = 0; i < struct.propertyList.length; i++) {
            let propertyListI = struct.propertyList[i];
            let args = objectPool.pop(DomTypeEditObjectProperty.Args.poolType);
            args.init(struct, propertyListI);
            this.listChildren.push(ReactComponentExtend.instantiateComponent(DomTypeEditObjectProperty, args));
        }
        ;
        let props = {
            style: {
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.CONFIG_TXT_BG_COLOR,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
            }
        };
        if (this.props.idx != 0) {
            props.style[MgrDomDefine.STYLE_MARGIN_TOP] = MgrDomDefine.CONFIG_TXT_SPACING;
        }
        ;
        return ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, props, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
            }
        }, `代号 ${custormStruct.demoName}`), ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
            }
        }, `备注 ${custormStruct.info}`), ...this.listChildren, ReactComponentExtend.instantiateTag(NodeModules.antd.Button, {
            [MgrDomDefine.PROPS_SIZE]: MgrDomDefine.PROPS_SIZE_SMALL,
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
            },
            onClick: () => {
                let idSeed = MgrFile.inst.get(MgrFileItem.ID_SEED);
                let id = ++idSeed;
                MgrFile.inst.set(MgrFileItem.ID_SEED, idSeed);
                struct.propertyAdd({
                    id: id,
                    demoName: `Property${id}`,
                    info: `备注`,
                    isArray: false,
                    type: StructPropertyTypeBasic.typeNumber.getId()
                });
                MgrDom.inst.callDataChange();
            },
        }, `添加空属性`));
    }
}
;
(function (DomTypeEditRoot) {
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
    DomTypeEditRoot.Args = Args;
})(DomTypeEditRoot || (DomTypeEditRoot = {}));
export default DomTypeEditRoot;
