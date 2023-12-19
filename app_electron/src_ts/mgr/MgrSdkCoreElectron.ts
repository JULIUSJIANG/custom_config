import MgrSdkCore from "./MgrSdkCore.js";
import MgrSdkCtxGet from "./MgrSdkCtxGet.js";
import MgrSdkCtxSet from "./MgrSdkCtxSet.js";
import MgrSdkCtxLogToMain from "./MgrSdkCtxLogToMain.js";
import MgrSdkCtxSaveFile from "./MgrSdkCtxSaveFile.js";
import Eventer from "../common/Eventer.js";
import MgrSdkCtxFsReadString from "./MgrSdkCtxFsReadString.js";
import MgrSdkCtxFsWriteString from "./MgrSdkCtxFsWriteString.js";

/**
 * 存档路径
 */
const STORAGE_PATH = `mgr_sdk_core_electron_storage.json`;

const _electron = require (`electron`);

/**
 * 主进程希望渲染进程做的异步事情以及渲染进程希望主进程做的异步事情都定义在里面
 * IndexMain 中定义的 ActionRequest 与该 ActionRequest 不一样，具体表现为 “非自己需要实现的 analyse，都直接是 null”
 * 简单而言 ActionRequest 作为协议，统一主进程、渲染进程对于对方的要求
 */
class MgrSdkCoreElectronRequest <TInput, TOutput> {
    /**
     * 代号
     */
    code: number;
    /**
     * 处理器
     */
    analyse: (i: TInput) => Promise <TOutput>;

    constructor (args: {
        code: number,
        analyse: (i: TInput) => Promise <TOutput>
    })
    {
        this.code = args.code;
        this.analyse = args.analyse;

        MgrSdkCoreElectronRequest.mapCodeToRequest.set (this.code, this);
    }
}

let evtResp = new Eventer ();

namespace MgrSdkCoreElectronRequest {
    /**
     * 请求体
     */
    export interface Ctx {
        /**
         * 标识
         */
        id: number;
        /**
         * 策略代号
         */
        code: number;
        /**
         * 策略需要的数据
         */
        data: any;
    };

    /**
     * 由主进程主动发起的流程上的所有事件名称
     */
    export const EVT_NAME_SERVER_ACTIVE = `EVT_NAME_SERVER_ACTIVE`;
    /**
     * 由渲染进程主动发起的流程上的所有事件名称
     */
    export const EVT_NAME_CLIENT_ACTIVE = `EVT_NAME_CLIENT_ACTIVE`;

    /**
     * 代号到具体策略的映射
     */
    export const mapCodeToRequest: Map <number, MgrSdkCoreElectronRequest <unknown, unknown>> = new Map ();

    export interface ClientFetchLogInput {
        txt: string
    };
    export interface ClientFetchLogOutput {

    };
    /**
     * 客户端通知 - 打印日志
     */
    export const CLIENT_FETCH_LOG = new MgrSdkCoreElectronRequest <ClientFetchLogInput, ClientFetchLogOutput> ({
        code: 1002,
        analyse: null
    });

    export interface ClientFetchSaveInput {
        /**
         * 文件名
         */
        fileName: string;
        /**
         * 文件数据
         */
        fileUrl: string;
    };
    export interface ClientFetchSaveOutput {

    };
    export const CLIENT_FETCH_SAVE_FILE = new MgrSdkCoreElectronRequest <ClientFetchSaveInput, ClientFetchSaveOutput> ({
        code: 1003,
        analyse: null
    });

    export interface ClientFetchSaveTxtI {
        fileName: string;
        txt: string
    };
    export interface ClientFetchSaveTxtO {

    };
    export const CLIENT_FETCH_SAVE_TXT = new MgrSdkCoreElectronRequest <ClientFetchSaveTxtI, ClientFetchSaveTxtO> ({
        code: 1005,
        analyse: null
    });

    export interface ClientFetchDebugI {

    };
    export interface ClientFetchDebugO {

    };
    export const CLIENT_FETCH_DEBUG = new MgrSdkCoreElectronRequest <ClientFetchDebugI, ClientFetchDebugO> ({
        code: 1006,
        analyse: null
    });

    export interface ClientFetchDestoriedI {

    };
    export interface ClientFetchDestoriedO {

    };
    export const CLIENT_FETCH_DESTORIED = new MgrSdkCoreElectronRequest <ClientFetchDebugI, ClientFetchDebugO> ({
        code: 1007,
        analyse: null
    });

    export interface ClientFetchFsReadFileStringI {
        path: string;
    };
    export interface ClientFetchFsReadFileStringO {
        isSuccessed: boolean;
        data: string;
    };
    export const CLIENT_FETCH_FS_READ_FILE_STRING = new MgrSdkCoreElectronRequest <ClientFetchFsReadFileStringI, ClientFetchFsReadFileStringO> ({
        code: 1008,
        analyse: null
    });
}

_electron.ipcRenderer.on (
    MgrSdkCoreElectronRequest.EVT_NAME_SERVER_ACTIVE,
    (
        evt,
        args: any
    ) => 
    {
        // 解析得到具体策略
        let action = MgrSdkCoreElectronRequest.mapCodeToRequest.get (args.code);
        // 让策略处理
        action.analyse (args.data)
            .then ((resp) => {
                // 返回最终结果
                _electron.ipcRenderer.send (MgrSdkCoreElectronRequest.EVT_NAME_SERVER_ACTIVE, resp);
            });
    }
);

/**
 * 针对不同运行环境做兼容处理 - 策略 - electron
 */
class MgrSdkCoreElectron extends MgrSdkCore {

    set (txt: string): Promise<MgrSdkCtxSet> {
        return this.fetch (
            MgrSdkCoreElectronRequest.CLIENT_FETCH_SAVE_TXT,
            {
                fileName: STORAGE_PATH,
                txt: txt
            }
        )
            .then (() => {
                return {
                    isSuccessed: true
                }
            });
    }

    get (): Promise<MgrSdkCtxGet> {
        return this.fetch (
            MgrSdkCoreElectronRequest.CLIENT_FETCH_FS_READ_FILE_STRING,
            {
                path: STORAGE_PATH
            }
        )
            .then ((resp) => {
                return {
                    isSuccessed: true,
                    txt: resp.data
                }
            });
    }

    fsWriteString (path: string, txt: string): Promise<MgrSdkCtxFsWriteString> {
        return this.fetch (
            MgrSdkCoreElectronRequest.CLIENT_FETCH_SAVE_TXT,
            {
                fileName: path,
                txt: txt
            }
        )
            .then (() => {
                return {
                    isSuccessed: true
                }
            });
    }

    fsReadString (path: string): Promise<MgrSdkCtxFsReadString> {
        return this.fetch (
            MgrSdkCoreElectronRequest.CLIENT_FETCH_FS_READ_FILE_STRING,
            {
                path: path
            }
        )
            .then ((resp) => {
                return {
                    isSuccessed: true,
                    txt: resp.data
                }
            });
    }

    saveFile (fileName: string, dataUrl: string): Promise<MgrSdkCtxSaveFile> {
        return this.fetch (
            MgrSdkCoreElectronRequest.CLIENT_FETCH_SAVE_FILE,
            {
                fileName: fileName,
                fileUrl: dataUrl
            }
        )
            .then (() => {
                return {
                    isSuccessed: true
                }
            });
    }

    logToMain(txt: string): Promise<MgrSdkCtxLogToMain> {
        return this.fetch (
            MgrSdkCoreElectronRequest.CLIENT_FETCH_LOG,
            {
                txt
            }
        )
            .then (() => {
                return {
                    isSuccessed: true
                }
            });
    }

    openDebugTools () {
        this.fetch (
            MgrSdkCoreElectronRequest.CLIENT_FETCH_DEBUG,
            {

            }
        );
    }

    callDestoried () {
        this.fetch (
            MgrSdkCoreElectronRequest.CLIENT_FETCH_DESTORIED,
            {

            }
        );
    }

    seed = 0;

    /**
     * 告知服务端
     * @param action 
     * @param i 
     */
    fetch <TInput, TOutput> (
        action: MgrSdkCoreElectronRequest <TInput, TOutput>,
        i: TInput
    ) 
    {
        let id = ++this.seed;
        let msg: MgrSdkCoreElectronRequest.Ctx = {
            id: id,
            code: action.code,
            data: i
        };
        _electron.ipcRenderer.send (MgrSdkCoreElectronRequest.EVT_NAME_CLIENT_ACTIVE, msg);
        return new Promise <TOutput> ((resolve) => {
            let listenId = evtResp.on ((resp: any) => {
                if (resp.id != msg.id) {
                    return;
                };
                evtResp.off (listenId);
                resolve (resp.resp);
            });
        });
    }
}

_electron.ipcRenderer.on (
    MgrSdkCoreElectronRequest.EVT_NAME_CLIENT_ACTIVE,
    (
        evt,
        resp
    ) =>
    {
        evtResp.call (resp);
    }
);

export default MgrSdkCoreElectron;