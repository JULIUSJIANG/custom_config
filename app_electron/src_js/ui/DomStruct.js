import IndexGlobal from "../IndexGlobal.js";
import NodeModules from "../NodeModules.js";
import objectPool from "../common/ObjectPool.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrDom from "../mgr/MgrDom.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import MgrFile from "../mgr/MgrFile.js";
import MgrFileItem from "../mgr/MgrFileItem.js";
import DomStructProperty from "./DomStructProperty.js";
import DomTextInput from "./DomTextInput.js";
/**
 * 类型
 */
class DomStruct extends ReactComponentExtend {
    constructor() {
        super(...arguments);
        this.listChildren = new Array();
    }
    render() {
        let customStruct = IndexGlobal.inst.mapIdToCustomStruct.get(this.props.id);
        this.listChildren.length = 0;
        for (let i = 0; i < customStruct.listProperty.length; i++) {
            let listPropertyI = customStruct.listProperty[i];
            let args = objectPool.pop(DomStructProperty.Args.poolType);
            args.init(listPropertyI.id);
            this.listChildren.push(ReactComponentExtend.instantiateComponent(DomStructProperty, args));
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
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
            }
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
            }
        }, `代号`), ReactComponentExtend.instantiateComponent(DomTextInput, {
            value: customStruct.demoName,
            onChange: (val) => {
                customStruct.demoName = val;
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
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
            }
        }, `备注`), ReactComponentExtend.instantiateComponent(DomTextInput, {
            value: customStruct.info,
            onChange: (val) => {
                customStruct.info = val;
                MgrDom.inst.callDataChange();
            },
            style: {
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING
            }
        })), ...this.listChildren, ReactComponentExtend.instantiateTag(NodeModules.antd.Button, {
            [MgrDomDefine.PROPS_SIZE]: MgrDomDefine.PROPS_SIZE_SMALL,
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
            },
            onClick: () => {
                let idSeed = MgrFile.inst.get(MgrFileItem.ID_SEED);
                let id = ++idSeed;
                MgrFile.inst.set(MgrFileItem.ID_SEED, idSeed);
                let property = {
                    id: id,
                    demoName: `Property${id}`,
                    info: `备注`,
                    isArray: false,
                    type: -1
                };
                customStruct.listProperty.push(property);
                MgrDom.inst.callDataChange();
            },
        }, `添加空属性`));
    }
}
;
(function (DomStruct) {
    class Args {
        init(idx, id) {
            this.idx = idx;
            this.id = id;
        }
    }
    Args.poolType = new ObjectPoolType({
        instantiate: () => new Args,
        onPop: null,
        onPush: null
    });
    DomStruct.Args = Args;
})(DomStruct || (DomStruct = {}));
export default DomStruct;
