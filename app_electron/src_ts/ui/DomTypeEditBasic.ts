import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import StructPropertyTypeBasic from "../app/StructPropertyTypeBasic.js";

/**
 * 类型
 */
class DomTypeEditBasic extends ReactComponentExtend <DomTypeEditBasic.Args> {

    render (): ReactComponentExtendInstance {
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
                            [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                            [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
                        }
                    },

                    `代号`
                ),
                ReactComponentExtend.instantiateTag (
                    MgrDomDefine.TAG_DIV,
                    {
                        style: {
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                            [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                            [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
                        }
                    },

                    this.props.data.demoName
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
                            [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                            [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
                        }
                    },

                    `描述`
                ),
                ReactComponentExtend.instantiateTag (
                    MgrDomDefine.TAG_DIV,
                    {
                        style: {
                            [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                            [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,
                            [MgrDomDefine.STYLE_FONT_SIZE]: MgrDomDefine.STYLE_FONT_SIZE_14,
                        }
                    },

                    this.props.data.info
                ),
            ),
        );
    }
};

namespace DomTypeEditBasic {

    export class Args {

        idx: number;

        data: StructPropertyTypeBasic;

        init (idx: number, data: StructPropertyTypeBasic) {
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

export default DomTypeEditBasic;