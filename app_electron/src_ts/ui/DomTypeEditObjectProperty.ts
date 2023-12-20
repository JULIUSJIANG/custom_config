import IndexGlobal from "../IndexGlobal.js";
import NodeModules from "../NodeModules.js";
import CacheStruct from "../app/CacheStruct.js";
import CacheStructProperty from "../app/CacheStructProperty.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import MgrDom from "../mgr/MgrDom.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import DomTextInput from "./DomTextInput.js";

class DomTypeEditObjectProperty extends ReactComponentExtend <DomTypeEditObjectProperty.Args> {

    listChildren = new Array <ReactComponentExtendInstance> ();

    render (): ReactComponentExtendInstance {
        let struct = this.props.struct;
        let property = this.props.property;
        this.listChildren.length = 0;
        for (let i = 0; i < IndexGlobal.inst.listTypeSelectAble.length; i++) {
            let listTypeI = IndexGlobal.inst.listTypeSelectAble [i];
            this.listChildren.push (ReactComponentExtend.instantiateTag (
                NodeModules.antd.Select.Option,
                {
                    key: listTypeI.getId (),
                    value: listTypeI.getId (),
                    style: {

                    }
                },

                listTypeI.getDemoName ()
            ));
        };

        let customProperty = property.dataProperty;
        let propsBtn = {
            [MgrDomDefine.PROPS_SIZE]: MgrDomDefine.PROPS_SIZE_SMALL,
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
            },
            onClick: () => {
                customProperty.isArray = !customProperty.isArray;
                MgrDom.inst.callDataChange ();
            },
        };
        if (customProperty.isArray) {
            propsBtn [MgrDomDefine.PROPS_TYPE] = MgrDomDefine.PROPS_TYPE_PRIMARY;
        };
        return ReactComponentExtend.instantiateTag (
            MgrDomDefine.TAG_DIV,
            {
                style: {
                    [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                    [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                    [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,

                    [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                    [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
                },
            },

            ReactComponentExtend.instantiateTag (
                MgrDomDefine.TAG_DIV,
                {
                    style: {
                        [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                        [MgrDomDefine.STYLE_ALIGN_ITEMS]: MgrDomDefine.STYLE_ALIGN_ITEMS_CENTER,
                        [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
                    }
                },

                ReactComponentExtend.instantiateTag (
                    MgrDomDefine.TAG_DIV,
                    {
                        style: {
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                            [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_BLACK,
                        }
                    },

                    `代号`
                ),
                ReactComponentExtend.instantiateComponent (
                    DomTextInput,
                    {
                        value: customProperty.demoName,
                        onChange: (val) => {
                            customProperty.demoName = val;
                            MgrDom.inst.callDataChange ();
                        },
                        style: {
                            [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING
                        }
                    }
                ),
            ),

            ReactComponentExtend.instantiateTag (
                MgrDomDefine.TAG_DIV,
                {
                    style: {
                        [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                        [MgrDomDefine.STYLE_ALIGN_ITEMS]: MgrDomDefine.STYLE_ALIGN_ITEMS_CENTER,
                        [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
                    }
                },

                ReactComponentExtend.instantiateTag (
                    MgrDomDefine.TAG_DIV,
                    {
                        style: {
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                            [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_BLACK,
                        }
                    },

                    `备注`
                ),

                ReactComponentExtend.instantiateComponent (
                    DomTextInput,
                    {
                        value: customProperty.info,
                        onChange: (val) => {
                            customProperty.info = val;
                            MgrDom.inst.callDataChange ();
                        },
                        style: {
                            [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING
                        }
                    }
                ),
            ),

            ReactComponentExtend.instantiateTag (
                MgrDomDefine.TAG_DIV,
                {
                    style: {
                        [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                        [MgrDomDefine.STYLE_ALIGN_ITEMS]: MgrDomDefine.STYLE_ALIGN_ITEMS_CENTER,
                        [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
                    }
                },

                ReactComponentExtend.instantiateTag (
                    MgrDomDefine.TAG_DIV,
                    {
                        style: {
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                            [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_BLACK,
                        }
                    },

                    `类型`
                ),
                ReactComponentExtend.instantiateTag (
                    MgrDomDefine.TAG_DIV,
                    {
                        style: {
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                            [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                            [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,

                            [MgrDomDefine.STYLE_FLEX_GROW]: 1
                        },
                    },
                    ReactComponentExtend.instantiateTag (
                        NodeModules.antd.Select,
                        {
                            [MgrDomDefine.PROPS_SIZE]: MgrDomDefine.PROPS_SIZE_SMALL,
                            value: customProperty.type,
                            style: {
                                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,

                                [MgrDomDefine.STYLE_FLEX_GROW]: 1
                            },
                            onChange: (val) => {
                                customProperty.type = val;
                                MgrDom.inst.callDataChange ();
                            },
                        },

                        ...this.listChildren
                    ),
                ),
            ),

            ReactComponentExtend.instantiateTag (
                MgrDomDefine.TAG_DIV,
                {
                    style: {
                        [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                        [MgrDomDefine.STYLE_ALIGN_ITEMS]: MgrDomDefine.STYLE_ALIGN_ITEMS_CENTER,
                        [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
                    }
                },

                ReactComponentExtend.instantiateTag (
                    NodeModules.antd.Button,
                    propsBtn,
        
                    `多项`
                ),

                ReactComponentExtend.instantiateTag (
                    NodeModules.antd.Popconfirm,
                    {
                        title: "该操作不可撤销，请谨慎操作",
                        okText: "确定",
                        cancelText: "取消",
                        onConfirm: () => {
                            struct.propertyDel (property.dataProperty);
                            MgrDom.inst.callDataChange ();
                        },
                        onCancel: () => {
    
                        },
                    },
                    ReactComponentExtend.instantiateTag (
                        NodeModules.antd.Button,
                        {
                            [MgrDomDefine.PROPS_SIZE]: MgrDomDefine.PROPS_SIZE_SMALL,
                            style: {
                                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                            },
                            onClick: () => {

                            },
                        },
            
                        `删除`
                    ),
                )
            )
        );
    }
}

namespace DomTypeEditObjectProperty {

    export class Args {

        struct: CacheStruct;

        property: CacheStructProperty;

        init (struct: CacheStruct, property: CacheStructProperty) {
            this.struct = struct;
            this.property = property;
        }

        static poolType = new ObjectPoolType <Args> ({
            instantiate: () => new Args,
            onPop: null,
            onPush: null
        });
    }
}

export default DomTypeEditObjectProperty;