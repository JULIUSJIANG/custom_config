import objectPool from "../common/ObjectPool.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";
import StructPropertyTypeObject from "../app/StructPropertyTypeObject.js";
import DomTypeReadObjectPropertyReduce from "./DomTypeReadObjectPropertyReduce.js";

/**
 * 类型
 */
class DomTypeReadObjectReduce extends ReactComponentExtend <DomTypeReadObjectReduce.Args> {

    listChildrenProperty = new Array <ReactComponentExtendInstance> ();

    listChildrenStruct = new Array <ReactComponentExtendInstance> ();

    render (): ReactComponentExtendInstance {
        let data = this.props.data;
        let struct = data.struct;
        let custormStruct = struct.dataStruct;

        this.listChildrenProperty.length = 0;
        for (let i = 0; i < struct.propertyList.length; i++) {
            let propertyListI = struct.propertyList [i];
            let args = objectPool.pop (DomTypeReadObjectPropertyReduce.Args.poolType);
            args.init (struct, propertyListI);
            this.listChildrenProperty.push (
                ReactComponentExtend.instantiateComponent (
                    DomTypeReadObjectPropertyReduce,
                    args
                )
            );
        };

        this.listChildrenStruct.length = 0;
        for (let i = 0; i < data.listChildren.length; i++) {
            let listChildrenI = data.listChildren [i];
            let args = objectPool.pop (DomTypeReadObjectReduce.Args.poolType);
            args.init (0, listChildrenI);
            this.listChildrenStruct.push (ReactComponentExtend.instantiateComponent (
                DomTypeReadObjectReduce,
                args
            ));
        };

        let props = {
            style: {
                [MgrDomDefine.STYLE_MARGIN_LEFT]: MgrDomDefine.CONFIG_TXT_DOUBLE_SPACING,
                [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.CONFIG_TXT_BG_COLOR,

                [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,
            }
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

namespace DomTypeReadObjectReduce {

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

export default DomTypeReadObjectReduce;