import IndexGlobal from "../IndexGlobal.js";
import NodeModules from "../NodeModules.js";
import CacheStruct from "../app/CacheStruct.js";
import CacheStructProperty from "../app/CacheStructProperty.js";
import ObjectPoolType from "../common/ObjectPoolType.js";
import ReactComponentExtend from "../common/ReactComponentExtend.js";
import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";
import MgrDomDefine from "../mgr/MgrDomDefine.js";

class DomTypeMovePObjectProperty extends ReactComponentExtend <DomTypeMovePObjectProperty.Args> {

    ref = NodeModules.react.createRef ();

    reactComponentExtendOnInit (): void {
        let tag = this.ref.current as HTMLDivElement;
        tag.addEventListener (
            MgrDomDefine.EVT_NAME_DRAG_START, 
            (event) => {
                IndexGlobal.inst.dragMachineProperty.currStatus.onStart (this.relProperty);
            }
        );
        tag.addEventListener (
            MgrDomDefine.EVT_NAME_DRAG_ING, 
            (event) => {
            }
        );
        tag.addEventListener (
            MgrDomDefine.EVT_NAME_DRAG_END, 
            (event) => {
                IndexGlobal.inst.dragMachineProperty.currStatus.onEnd ();
            }
        );
        
        tag.addEventListener (
            MgrDomDefine.EVT_NAME_DRAG_ENTER, 
            (event) => {
                IndexGlobal.inst.dragMachineProperty.currStatus.onTargetEnter (this.relProperty);
            }
        );
        tag.addEventListener (
            MgrDomDefine.EVT_NAME_DRAG_OVER, 
            (event) => {
                event.preventDefault();
            }
        );
        tag.addEventListener (
            MgrDomDefine.EVT_NAME_DRAG_LEAVE, 
            (event) => {
                IndexGlobal.inst.dragMachineProperty.currStatus.onTargetLeave ();
            }
        );
    }

    relProperty: CacheStructProperty;

    reactComponentExtendOnDraw (): void {
        this.relProperty = this.props.property;
    }

    render (): ReactComponentExtendInstance {
        let struct = this.props.struct;
        let property = this.props.property.maskCurrStatus.onGetData ();
        let type = IndexGlobal.inst.mapTypeAll.get (property.dataProperty.type);
        return ReactComponentExtend.instantiateTag (
            MgrDomDefine.TAG_DIV,
            {
                style: {
                    [MgrDomDefine.STYLE_MARGIN]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                    [MgrDomDefine.STYLE_PADDING]: MgrDomDefine.CONFIG_TXT_HALF_SPACING,
                    [MgrDomDefine.STYLE_BACKGROUND_COLOR]: MgrDomDefine.STYLE_COLOR_WHITE,

                    [MgrDomDefine.STYLE_DISPLAY]: MgrDomDefine.STYLE_DISPLAY_FLEX,
                    [MgrDomDefine.STYLE_FLEX_DIRECTION]: MgrDomDefine.STYLE_FLEX_DIRECTION_COLUMN,

                    [MgrDomDefine.STYLE_COLOR]: MgrDomDefine.STYLE_COLOR_BLACK,
                },
                ref: this.ref,
                draggable: "true"
            },

            `${property.dataProperty.demoName} / ${type.getDemoName ()} / ${property.dataProperty.info}`
        );
    }
}

namespace DomTypeMovePObjectProperty {

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

export default DomTypeMovePObjectProperty;