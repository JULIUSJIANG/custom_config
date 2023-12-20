import MgrFileItem from "../mgr/MgrFileItem";
import CacheInstProperty from "./CacheInstProperty";

/**
 * 实例数据的缓存
 */
class CacheInst {

    data: MgrFileItem.Inst;

    public constructor (inst: MgrFileItem.Inst) {
        this.data = inst;
        let clone = [...inst.listProperty];
        inst.listProperty.length = 0;
        for (let i = 0; i < clone.length; i++) {
            let cloneI = clone [i];
            this.propertyAdd (cloneI);
        };
    }

    /**
     * 身上所有属性集合
     */
    propertyList = new Array <CacheInstProperty> ();

    /**
     * 属性映射
     */
    propertyMap = new Map <number, CacheInstProperty> ();

    /**
     * 增
     * @param instProperty 
     */
    propertyAdd (instProperty: MgrFileItem.InstProperty) {
        let cache = new CacheInstProperty (this, instProperty);
        this.propertyMap.set (cache.data.propertyId, cache);
        this.propertyList.push (cache);
        this.data.listProperty.push (instProperty);
    }

    /**
     * 删
     * @param instProperty 
     */
    propertyDel (instProperty: MgrFileItem.InstProperty) {
        let index: number;
        for (let i = 0; i < this.propertyList.length; i++) {
            let propertyListI = this.propertyList [i];
            if (propertyListI.data.propertyId == instProperty.propertyId) {
                index = i;
                break;
            };
        };
        if (index == null) {
            return;
        };
        let cache = this.propertyList [index];
        this.propertyMap.delete (cache.data.propertyId);
        this.propertyList.splice (index, 1);
        this.data.listProperty.splice (index, 1);
    }
}

export default CacheInst;