import IndexGlobal from "../IndexGlobal";
import MgrFileItem from "../mgr/MgrFileItem";
import CacheInst from "./CacheInst";
import StructPropertyType from "./StructPropertyType";
import StructPropertyTypeObject from "./StructPropertyTypeObject";

/**
 * 实例数据的缓存 - 属性
 */
class CacheInstProperty {

    inst: CacheInst;

    data: MgrFileItem.InstProperty;

    imp: StructPropertyType;

    cache: any;

    public constructor (inst: CacheInst, instProperty: MgrFileItem.InstProperty) {
        this.inst = inst;
        this.data = instProperty;
        let relTypeObject = (IndexGlobal.inst.mapTypeAll.get (this.inst.data.typeId) as StructPropertyTypeObject);
        let relProperty = relTypeObject.struct.propertyMap.get (instProperty.propertyId);
        this.imp = IndexGlobal.inst.mapTypeAll.get (relProperty.dataProperty.type);
        if (relProperty.dataProperty.isArray) {
            this.cache = this.data.propertyValue.map ((val) => {
                return this.imp.impCache (val);
            });
        }
        else {
            this.cache = this.imp.impCache (this.data.propertyValue);
        };
    }
}

export default CacheInstProperty;