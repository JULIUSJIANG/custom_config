import MgrSdkCtxGet from "./MgrSdkCtxGet.js";
import MgrSdkCtxSet from "./MgrSdkCtxSet.js";
import MgrSdkCtxLogToMain from "./MgrSdkCtxLogToMain.js";
import MgrSdkCtxSaveFile from "./MgrSdkCtxSaveFile.js";
import MgrSdkCtxGetFile from "./MgrSdkCtxGetFile.js";
import MgrSdkCtxFsReadString from "./MgrSdkCtxFsReadString.js";
import MgrSdkCtxFsWriteString from "./MgrSdkCtxFsWriteString.js";

/**
 * 针对不同运行环境做兼容处理 - 策略
 */
abstract class MgrSdkCore {
    /**
     * 存档
     * @param txt 
     */
    abstract set (txt: string): Promise <MgrSdkCtxSet>;
    /**
     * 取档
     */
    abstract get (): Promise <MgrSdkCtxGet>;
    /**
     * 往某个路径写入文本
     */
    abstract fsWriteString (path: string, txt: string): Promise <MgrSdkCtxFsWriteString>;
    /**
     * 读取某个路径的文本
     */
    abstract fsReadString (path: string): Promise <MgrSdkCtxFsReadString>;
    /**
     * 保存文件
     * @param fileName 
     * @param dataUrl 
     */
    abstract saveFile (fileName: string, dataUrl: string): Promise <MgrSdkCtxSaveFile>;
    /**
     * 打印日志
     */
    abstract logToMain (txt: string): Promise <MgrSdkCtxLogToMain>;
    /**
     * 打开调试工具
     */
    abstract openDebugTools ();
    /**
     * 通知服务端已被销毁
     */
    abstract callDestoried ();
}

export default MgrSdkCore;