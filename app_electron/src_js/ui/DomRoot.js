import NodeModules from "../NodeModules.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import MgrData from "../mgr/MgrData.js";
import MgrDataItem from "../mgr/MgrDataItem.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import MgrFile from "../mgr/MgrFile.js";
import MgrFileItem from "../mgr/MgrFileItem.js";
import MgrDom from "../mgr/MgrDom.js";
import IndexGlobal from "../IndexGlobal.js";
/**
 * 根
 */
export default class DomRoot extends ReactComponentExtend {
    constructor() {
        super(...arguments);
        this.listChildrenStruct = new Array();
        this.listChildrenOp = new Array();
    }
    render() {
        this.listChildrenStruct.length = 0;
        switch (IndexGlobal.inst.leftOpMachine.currStatus) {
            case IndexGlobal.inst.leftOpMachine.statusRead:
                {
                    for (let i = 0; i < IndexGlobal.inst.listType.length; i++) {
                        let listStructI = IndexGlobal.inst.listType[i];
                        this.listChildrenStruct.push(listStructI.renderRead(i));
                    }
                    ;
                    break;
                }
                ;
            case IndexGlobal.inst.leftOpMachine.statusMove:
                {
                    for (let i = 0; i < IndexGlobal.inst.listTypeObject.length; i++) {
                        let listStructI = IndexGlobal.inst.listTypeObject[i];
                        this.listChildrenStruct.push(listStructI.renderMove(i));
                    }
                    ;
                    break;
                }
                ;
            case IndexGlobal.inst.leftOpMachine.statusEdit:
                {
                    for (let i = 0; i < IndexGlobal.inst.listTypeObject.length; i++) {
                        let listStructI = IndexGlobal.inst.listTypeObject[i];
                        this.listChildrenStruct.push(listStructI.renderEdit(i));
                    }
                    ;
                    break;
                }
                ;
        }
        ;
        this.listChildrenOp.length = 0;
        for (let i = 0; i < IndexGlobal.inst.leftOpMachine.listStatus.length; i++) {
            let listStatusI = IndexGlobal.inst.leftOpMachine.listStatus[i];
            let propsBtn = {
                style: {
                    [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                    [MgrDomDefine.STYLE_FLEX_GROW]: 1
                },
                onClick: () => {
                    IndexGlobal.inst.leftOpMachine.enter(listStatusI);
                    MgrDom.inst.callDataChange();
                }
            };
            if (listStatusI.id == MgrFile.inst.get(MgrFileItem.LEFT_OP)) {
                propsBtn[MgrDomDefine.PROPS_TYPE] = MgrDomDefine.PROPS_TYPE_PRIMARY;
            }
            ;
            this.listChildrenOp.push(ReactComponentExtend.instantiateTag(NodeModules.antd.Button, propsBtn, listStatusI.name));
        }
        ;
        // 根容器
        return ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_WIDTH]: MgrDomDefine.STYLE_WIDTH_PERCENTAGE_100,
                [MgrDomDefine.STYLE_HEIGHT]: MgrDomDefine.STYLE_HEIGHT_PERCENTAGE_100,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
            }
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN
            }
        }, 
        /**
         * 存档提示
         */
        ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.CONFIG_TXT_BG_COLOR,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN
            }
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_FLEX_GROW]: 0,
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING
            }
        }, ReactComponentExtend.instantiateTag(NodeModules.antd.Upload.Dragger, {
            showUploadList: false,
            beforeUpload: (file) => {
                console.log(file);
                return false;
            },
            onChange: (info) => {
            },
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE
            }
        }, MgrData.inst.get(MgrDataItem.FILE_PATH))))), 
        /**
         * 根容器
         */
        ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
            }
        }, 
        /**
         * 左边栏
         */
        ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                // [MgrDomDefine.STYLE_WIDTH]: `400px`,
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_FLEX_GROW]: 0,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.CONFIG_TXT_BG_COLOR,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
            }
        }, ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_HEIGHT]: MgrDomDefine.STYLE_WIDTH_PERCENTAGE_0,
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN
            }
        }, 
        // 滚动视图的遮罩
        ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_HEIGHT]: 0,
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                [MgrDomDefine.STYLE_OVERFLOW_X]: MgrDomDefine.STYLE_OVERFLOW_X_HIDDEN,
                [MgrDomDefine.STYLE_OVERFLOW_Y]: MgrDomDefine.STYLE_OVERFLOW_Y_SCROLL
            }
        }, 
        // 滚动的列表
        ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
                [MgrDomDefine.STYLE_MARGIN_RIGHT]: MgrDomDefine.CONFIG_TXT_SPACING
            }
        }, ...this.listChildrenStruct))), ReactComponentExtend.instantiateTag(NodeModules.antd.Button, {
            onClick: () => {
                let idSeed = MgrFile.inst.get(MgrFileItem.ID_SEED);
                let id = ++idSeed;
                MgrFile.inst.set(MgrFileItem.ID_SEED, idSeed);
                IndexGlobal.inst.structAdd({
                    id: id,
                    demoName: `CustomStruct${id}`,
                    info: `描述`,
                    listProperty: []
                });
                IndexGlobal.inst.leftOpMachine.enter(IndexGlobal.inst.leftOpMachine.statusEdit);
                MgrDom.inst.callDataChange();
            },
            style: {
                [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
            }
        }, `添加空类型`), ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
            }
        }, ...this.listChildrenOp)), 
        /**
         * 右边栏
         */
        ReactComponentExtend.instantiateTag(MgrDomDefine.TAG_DIV, {
            style: {
                [MgrDomDefine.STYLE_FLEX_GROW]: 1,
                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
            }
        }))));
    }
}
