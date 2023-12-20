import IndexGlobal from "../IndexGlobal.js";
import NodeModules from "../NodeModules.js";
import objectPool from "../common/ObjectPool.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrDom from "../mgr/MgrDom.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import MgrFile from "../mgr/MgrFile.js";
import MgrFileItem from "../mgr/MgrFileItem.js";
import DomTypeObjectProperty from "./DomTypeObjectProperty.js";
import DomTextInput from "./DomTextInput.js";
import StructPropertyTypeBasic from "../app/StructPropertyTypeBasic.js";
/**
 * 类型
 */
class DomTypeObject extends ReactComponentExtend {
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
            let args = objectPool.pop(DomTypeObjectProperty.Args.poolType);
            args.init(struct, propertyListI);
            this.listChildren.push(ReactComponentExtend.instantiateComponent(DomTypeObjectProperty, args));
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
                [MgrDomDefine.STYLE_ALIGN_ITEMS]: MgrDomDefine.STYLE_ALIGN_ITEMS_CENTER,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
            }
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
            }
        }, `代号`), ReactComponentExtend.instantiateComponent(DomTextInput, {
            value: custormStruct.demoName,
            onChange: (val) => {
                custormStruct.demoName = val;
                MgrDom.inst.callDataChange();
            },
            style: {
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING
            }
        })), ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_ALIGN_ITEMS]: MgrDomDefine.STYLE_ALIGN_ITEMS_CENTER,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
            }
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
            }
        }, `备注`), ReactComponentExtend.instantiateComponent(DomTextInput, {
            value: custormStruct.info,
            onChange: (val) => {
                custormStruct.info = val;
                MgrDom.inst.callDataChange();
            },
            style: {
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING
            }
        })), ...this.listChildren, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
            }
        }, ReactComponentExtend.instantiateTag(NodeModules.antd.Button, {
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
        }, `添加空属性`), ReactComponentExtend.instantiateTag(NodeModules.antd.Popconfirm, {
            title: "该操作不可撤销，请谨慎操作",
            okText: "确定",
            cancelText: "取消",
            onConfirm: () => {
                IndexGlobal.inst.structDel(custormStruct);
                MgrDom.inst.callDataChange();
            },
            onCancel: () => {
            },
        }, ReactComponentExtend.instantiateTag(NodeModules.antd.Button, {
            [MgrDomDefine.PROPS_SIZE]: MgrDomDefine.PROPS_SIZE_SMALL,
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
            },
            onClick: () => {
            },
        }, `删除`))));
    }
}
;
(function (DomTypeObject) {
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
    DomTypeObject.Args = Args;
})(DomTypeObject || (DomTypeObject = {}));
export default DomTypeObject;
