import ReactComponentExtendInstance from "../common/ReactComponentExtendInstance.js";

/**
 * 属性类型
 */
abstract class StructPropertyType {

    /**
     * 获取标识
     */
    abstract getId (): number;

    /**
     * 获取代号
     */
    abstract getDemoName (): string;

    /**
     * 获取备注
     */
    abstract getInfo (): string;

    /**
     * 生成可视化内容 - 只读
     */
    abstract renderRead (idx: number): ReactComponentExtendInstance;

    /**
     * 生成可视化内容 - 编辑
     */
    abstract renderEdit (idx: number): ReactComponentExtendInstance;

    /**
     * 生成可视化内容 - 调整顺序 - 属性
     * @param idx 
     */
    abstract renderMoveProperty (idx: number): ReactComponentExtendInstance;

    /**
     * 生成可视化内容 - 调整顺序 - 结构
     * @param idx 
     */
    abstract renderMoveStruct (idx: number): ReactComponentExtendInstance;

    /**
     * 对数据进行缓存
     * @param data 
     */
    abstract impCache (data: any);
}

namespace StructPropertyType {

}

export default StructPropertyType;