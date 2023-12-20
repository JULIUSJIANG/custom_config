import objectPool from "../common/ObjectPool.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import DomTypeEditObjectProperty from "./DomTypeEditObjectProperty.js";
import StructPropertyTypeObject from "../app/StructPropertyTypeObject.js";
import DomTypeReadObjectProperty from "./DomTypeReadObjectProperty.js";
import DomTypeMovePObjectProperty from "./DomTypeMovePObjectProperty.js";
import CacheStruct from "../app/CacheStruct.js";

/**
 * 类型
 */
class DomTypeMovePObject extends ReactComponentExtend <DomTypeMovePObject.Args> {

    listChildren = new Array <ReactComponentExtendInstance> ();

    render (): ReactComponentExtendInstance {
        let struct = this.props.data;
        let custormStruct = this.props.data.dataStruct;
        this.listChildren.length = 0;
        for (let i = 0; i < struct.propertyList.length; i++) {
            let propertyListI = struct.propertyList [i];
            let args = objectPool.pop (DomTypeMovePObjectProperty.Args.poolType);
            args.init (struct, propertyListI);
            this.listChildren.push (
                ReactComponentExtend.instantiateComponent (
                    DomTypeMovePObjectProperty,
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

                `${custormStruct.demoName} / ${custormStruct.info}`,
            ),

            ...this.listChildren,
        );
    }
};

namespace DomTypeMovePObject {

    export class Args {

        idx: number;

        data: CacheStruct;

        init (idx: number, data: CacheStruct) {
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

export default DomTypeMovePObject;