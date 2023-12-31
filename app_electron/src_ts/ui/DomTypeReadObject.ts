import objectPool from "../common/ObjectPool.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import DomTypeEditObjectProperty from "./DomTypeEditObjectProperty.js";
import DomTypeReadObjectProperty from "./DomTypeReadObjectProperty.js";
import CacheStruct from "../app/CacheStruct.js";
import StructPropertyTypeObject from "../app/StructPropertyTypeObject.js";
import DomTypeReadObjectReduce from "./DomTypeReadObjectReduce.js";

/**
 * 类型
 */
class DomTypeReadObject extends ReactComponentExtend <DomTypeReadObject.Args> {

    listChildrenProperty = new Array <ReactComponentExtendInstance> ();

    listChildrenStruct = new Array <ReactComponentExtendInstance> ();

    render (): ReactComponentExtendInstance {
        let data = this.props.data;
        let struct = data.struct;
        let custormStruct = struct.dataStruct;

        this.listChildrenProperty.length = 0;
        for (let i = 0; i < struct.propertyList.length; i++) {
            let propertyListI = struct.propertyList [i];
            let args = objectPool.pop (DomTypeEditObjectProperty.Args.poolType);
            args.init (struct, propertyListI);
            this.listChildrenProperty.push (
                ReactComponentExtend.instantiateComponent (
                    DomTypeReadObjectProperty,
                    args
                )
            );
        };

        this.listChildrenStruct.length = 0;
        for (let i = 0; i < data.listChildren.length; i++) {
            let listChildrenI = data.listChildren [i];
            let args = objectPool.pop (DomTypeReadObjectReduce.Args.poolType);
            args.init (i, listChildrenI);
            this.listChildrenStruct.push (ReactComponentExtend.instantiateComponent (
                DomTypeReadObjectReduce,
                args
            ));
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

        let tagChildren: ReactComponentExtendInstance;
        if (this.listChildrenStruct.length != 0) {
            tagChildren = ReactComponentExtend.instantiateTag (
                MgrDomDefine.TAG_DIV,
                {
                    style: {
                        
                    }
                },

                ...this.listChildrenStruct,
            );
        };

        return ReactComponentExtend.instantiateTag (
            MgrDomDefine.TAG_DIV,
            props,

            ReactComponentExtend.instantiateTag (
                MgrDomDefine.TAG_DIV,
                {
                    style: {
                        [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                        [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                        [MgrDomDefine.STYLE_ALIGN_ITEMS]: MgrDomDefine.STYLE_ALIGN_ITEMS_CENTER,
                        [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_ROW,
                    }
                },

                `${custormStruct.demoName} / ${custormStruct.info}`,
            ),

            ...this.listChildrenProperty,
            tagChildren,
        );
    }
};

namespace DomTypeReadObject {

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

export default DomTypeReadObject;