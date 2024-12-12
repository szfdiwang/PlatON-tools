declare const paramsOrder: {
    readonly 1000: readonly ["typ", "benefitAddress", "nodeId", "externalId", "nodeName", "website", "details", "amount", "rewardPer", "programVersion", "programVersionSign", "blsPubKey", "blsProof"];
    readonly 1001: readonly ["benefitAddress", "nodeId", "rewardPer", "externalId", "nodeName", "website", "details"];
    readonly 1002: readonly ["nodeId", "typ", "amount"];
    readonly 1003: readonly ["nodeId"];
    readonly 1004: readonly ["typ", "nodeId", "amount"];
    readonly 1005: readonly ["stakingBlockNum", "nodeId", "amount"];
    readonly 1006: readonly [];
    readonly 1100: readonly [];
    readonly 1101: readonly [];
    readonly 1102: readonly [];
    readonly 1103: readonly ["addr"];
    readonly 1104: readonly ["stakingBlockNum", "delAddr", "nodeId"];
    readonly 1105: readonly ["nodeId"];
    readonly 1106: readonly ["delAddr"];
    readonly 1200: readonly [];
    readonly 1201: readonly [];
    readonly 1202: readonly [];
    readonly 2000: readonly ["verifier", "pIDID"];
    readonly 2001: readonly ["verifier", "pIDID", "newVersion", "endVotingRounds"];
    readonly 2002: readonly ["verifier", "pIDID", "module", "name", "newValue"];
    readonly 2005: readonly ["verifier", "pIDID", "endVotingRounds", "tobeCanceledProposalID"];
    readonly 2003: readonly ["verifier", "proposalID", "option", "programVersion", "versionSign"];
    readonly 2004: readonly ["verifier", "programVersion", "versionSign"];
    readonly 2100: readonly ["proposalID"];
    readonly 2101: readonly ["proposalID"];
    readonly 2102: readonly [];
    readonly 2103: readonly [];
    readonly 2104: readonly ["module", "name"];
    readonly 2105: readonly ["proposalID", "blockHash"];
    readonly 2106: readonly ["module"];
    readonly 3000: readonly ["typ", "data"];
    readonly 3001: readonly ["typ", "addr", "blockNumber"];
    readonly 4000: readonly ["account", "plan"];
    readonly 4100: readonly ["account"];
    readonly 5000: readonly [];
    readonly 5100: readonly ["address", "nodeIDs"];
};
type ParamsOrder = typeof paramsOrder;
type CodeType = keyof ParamsOrder;
type ParamsForCode<T extends CodeType> = ParamsOrder[T];
type MethodParams<T extends CodeType> = [
    code: T,
    params: Record<ParamsForCode<T>[number], any>
];
type ParamsForTx = {
    from: string;
    to: string | undefined;
    data: string;
};
type GetDataParams<T extends CodeType> = [
    T,
    ...{
        [K in keyof ParamsForCode<T>]: any;
    }
];
export { CodeType, GetDataParams, ParamsForCode, MethodParams, ParamsForTx };
