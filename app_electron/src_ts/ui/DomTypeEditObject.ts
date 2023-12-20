import IndexGlobal from "../IndexGlobal.js";
import NodeModules from "../NodeModules.js";
import objectPool from "../common/ObjectPool.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import MgrDom from "../mgr/MgrDom.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import MgrFile from "../mgr/MgrFile.js";
import MgrFileItem from "../mgr/MgrFileItem.js";
import DomTypeEditObjectProperty from "./DomTypeEditObjectProperty.js";
import DomTextInput from "./DomTextInput.js";
import StructPropertyTypeObject from "../app/StructPropertyTypeObject.js";

let setChildren = new Set <StructPropertyTypeObject> ();

/**
 * 类型
 */
class DomTypeEditObject extends ReactComponentExtend <DomTypeEditObject.Args> {

    listChildrenExtend = new Array <ReactComponentExtendInstance> ();

    listChildrenProperty = new Array <ReactComponentExtendInstance> ();

    render (): ReactComponentExtendInstance {
        let data = this.props.data;
        let struct = data.struct;

        setChildren.clear ();
        data.getAllChildren (setChildren);

        this.listChildrenExtend.length = 0;
        this.listChildrenExtend.push (ReactComponentExtend.instantiateTag (
            NodeModules.antd.Select.Option,
            {
                key: 0,
                value: 0,
                style: {

                }
            },

            `无`,
        ));
        for (let i = 0; i < IndexGlobal.inst.listTypeExtendAble.length; i++) {
            let listTypeExtendAbleI = IndexGlobal.inst.listTypeExtendAble [i];
            if (setChildren.has (listTypeExtendAbleI)) {
                continue;
            };
            this.listChildrenExtend.push (ReactComponentExtend.instantiateTag (
                NodeModules.antd.Select.Option,
                {
                    key: listTypeExtendAbleI.getId (),
                    value: listTypeExtendAbleI.getId (),
                    style: {

                    }
                },

                listTypeExtendAbleI.getDemoName ()
            ));
        };

        let custormStruct = struct.dataStruct;
        this.listChildrenProperty.length = 0;
        for (let i = 0; i < struct.propertyList.length; i++) {
            let propertyListI = struct.propertyList [i];
            let args = objectPool.pop (DomTypeEditObjectProperty.Args.poolType);
            args.init (struct, propertyListI);
            this.listChildrenProperty.push (
                ReactComponentExtend.instantiateComponent (
                    DomTypeEditObjectProperty,
                    args
                )
            );
        };

        let props = {
            style: {
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.CONFIG_TXT_BG_COLOR,

                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
            }
        };

        if (this.props.idx != 0) {
            props.style [MgrDomDefine.STYLE_MARGIN_TOP] = MgrDomDefine.CONFIG_TXT_SPACING;
        };

        return ReactComponentExtend.instantiateTag (
            MgrDomDefine.TAG_DIV,
            props,

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
                        }
                    },

                    `代号`
                ),

                ReactComponentExtend.instantiateComponent (
                    DomTextInput,
                    {
                        value: custormStruct.demoName,
                        onChange: (val) => {
                            custormStruct.demoName = val;
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
                        }
                    },

                    `继承`
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
                            value: struct.dataStruct.extend,
                            style: {
                                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,

                                [MgrDomDefine.STYLE_FLEX_GROW]: 1
                            },
                            onChange: (val) => {
                                data.setParent (val);
                                MgrDom.inst.callDataChange ();
                            },
                        },

                        ...this.listChildrenExtend
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
                    MgrDomDefine.TAG_DIV,
                    {
                        style: {
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                        }
                    },

                    `备注`
                ),

                ReactComponentExtend.instantiateComponent (
                    DomTextInput,
                    {
                        value: custormStruct.info,
                        onChange: (val) => {
                            custormStruct.info = val;
                            MgrDom.inst.callDataChange ();
                        },
                        style: {
                            [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING
                        }
                    }
                ),
            ),

            ...this.listChildrenProperty,

            ReactComponentExtend.instantiateTag (
                MgrDomDefine.TAG_DIV,
                {
                    style: {
                        [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                        [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
                    }
                },

                ReactComponentExtend.instantiateTag (
                    NodeModules.antd.Button,
                    {
                        [MgrDomDefine.PROPS_SIZE]: MgrDomDefine.PROPS_SIZE_SMALL,
                        style: {
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                            [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                        },
                        onClick: () => {
                            let idSeed = MgrFile.inst.get (MgrFileItem.ID_SEED);
                            let id = ++idSeed;
                            MgrFile.inst.set (MgrFileItem.ID_SEED, idSeed);
                            struct.propertyAdd (MgrFileItem.CustomStructProperty.create (id));
                            MgrDom.inst.callDataChange ();
                        },
                    },
        
                    `添加空属性`
                ),

                ReactComponentExtend.instantiateTag (
                    NodeModules.antd.Popconfirm,
                    {
                        title: "该操作不可撤销，请谨慎操作",
                        okText: "确定",
                        cancelText: "取消",
                        onConfirm: () => {
                            IndexGlobal.inst.structDel (custormStruct);
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
            ),
        );
    }
};

namespace DomTypeEditObject {

    export class Args {

        idx: number;

        data: StructPropertyTypeObject;

        init (idx: number, data: StructPropertyTypeObject) {
            this.idx = idx;
            this.data = data;
        }

        static poolType = new ObjectPoolType <Args> ({
            instantiate: () => new Args,
            onPop: null,
            onPush: null
        });
    } 
}

export default DomTypeEditObject;