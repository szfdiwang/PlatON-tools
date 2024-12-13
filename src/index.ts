import { RLP, utils } from "@ethereumjs/rlp";
import { ParamsForTx, CodeType } from "./types";
/**
 * @param code number function type E.g. 1004 委托, 1005 解委托
 * @returns build-in contract address
 */
const getContractAddress = (code: CodeType): string | undefined => {
  try {
    if (!code || isNaN(code)) throw new Error("Please check the parameters");

    if (code >= 1000 && code < 2000)
      return "0x1000000000000000000000000000000000000002";
    if (code >= 2000 && code < 3000)
      return "0x1000000000000000000000000000000000000005";
    if (code >= 3000 && code < 4000)
      return "0x1000000000000000000000000000000000000004";
    if (code >= 4000 && code < 5000)
      return "0x1000000000000000000000000000000000000001";
    if (code >= 5000 && code < 6000)
      return "0x1000000000000000000000000000000000000006";
    else throw new Error("The contract corresponding to code cannot be found");
  } catch (error) {
    console.error("error:", error);
  }
};

const _getData = (params: any[]): string => {
  const arr = [];
  for (const param of params) {
    arr.push("0x" + utils.bytesToHex(RLP.encode(param)));
  }
  const rlpedData = "0x" + utils.bytesToHex(RLP.encode(arr));
  return rlpedData;
};

/**
 *
 * @param code string function type
 * @param address string user wallet address
 * @param params array E.g. [type, nodeId, amount]
 * type uint16(2bytes)	表示使用账户自由金额还是账户的锁仓金额做委托，0: 自由金额； 1: 锁仓金额；2: 优先使用锁仓余额，锁仓余额不足则剩下的部分使用自由金额
 * nodeId nodeId	64bytes	被质押的节点的 NodeId
 * amount big.Int(bytes)	委托的金额(按照最小单位算，1LAT = 10^18 von)
 * @returns ParamsForTx | undefined
 */

const getParams = <T extends CodeType>(
  code: T,
  address: string,
  params: any[]
): ParamsForTx | undefined => {
  try {
    if (!address || !params) throw new Error("Function params error");
    return {
      from: address,
      to: getContractAddress(code),
      data: _getData([code, ...params]),
    };
  } catch (error) {
    console.error("error:", error);
  }
};

const Tools = {
  getContractAddress,
  getParams,
};

export { getContractAddress, getParams };

export default Tools;
