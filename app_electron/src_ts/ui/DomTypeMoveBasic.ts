import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import StructPropertyTypeBasic from "../app/StructPropertyTypeBasic.js";
import NodeModules from "../NodeModules.js";

/**
 * 类型
 */
class DomTypeMoveBasic extends ReactComponentExtend <DomTypeMoveBasic.Args> {

    ref = NodeModules.react.createRef ();

    reactComponentExtendOnDraw (): void {
        
    }

    render (): ReactComponentExtendInstance {
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
            props.style [MgrDomDefine.STYLE_MARGIN_TOP] = MgrDomDefine.CONFIG_TXT_SPACING;
        };

        return ReactComponentExtend.instantiateTag (
            MgrDomDefine.TAG_DIV,
            props,

            `${this.props.data.demoName} / ${this.props.data.info}`
        );
    }
};

namespace DomTypeMoveBasic {

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

export default DomTypeMoveBasic;