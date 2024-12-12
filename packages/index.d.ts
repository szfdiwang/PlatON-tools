import { ParamsForCode, ParamsForTx, CodeType } from "./types";
declare const Tools: {
    getContractAddress: (code: CodeType) => string | undefined;
    getParams: <T extends CodeType>(code: T, address: string, params: ParamsForCode<T>) => ParamsForTx | undefined;
};
export default Tools;
