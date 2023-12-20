import ObjectPoolType from "../common/ObjectPoolType";
import ReactComponentExtend from "../common/ReactComponentExtend";

class DomInstRoot extends ReactComponentExtend <DomInstRoot.Args> {
    render () {
        return null;
    }
}

namespace DomInstRoot {

    export class Args {

        init () {

        }

        static poolType = new ObjectPoolType <Args> ({
            instantiate: () => new Args(),
            onPop: null,
            onPush: null
        });
    }
}

export default DomInstRoot;