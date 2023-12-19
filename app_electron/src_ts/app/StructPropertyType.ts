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
     * 获取描述
     */
    abstract getInfo (): string;

    /**
     * 生成可视化内容 - 只读
     */
    abstract renderRead (idx: number): ReactComponentExtendInstance;

    /**
     * 生成可视化内容 - 调整顺序
     * @param idx 
     */
    abstract renderMove (idx: number): ReactComponentExtendInstance;

    /**
     * 生成可视化内容 - 编辑
     */
    abstract renderEdit (idx: number): ReactComponentExtendInstance;
}

namespace StructPropertyType {

}

export default StructPropertyType;